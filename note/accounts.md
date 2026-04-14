# Accounts & keys

Every credential the release pipeline needs, in one place. Set up
once; persist the env vars in your shell profile (or your CI secret
store).

After everything below is set, [releasing.md](./releasing.md) walks
the actual release flow.

**All of this works from macOS.** The few Linux-only tools
(`abuild-keygen`, `osc`) are run inside Docker where noted. You
need: `brew install gnupg gh git docker`, plus an `npm login` /
`gh auth login`. Nothing else.

## At a glance

### Repos to create

Everything you'd otherwise put in a side repo lives on a branch of
`cluesurf/task` itself. The new GitHub repos are short.

| repo                                | what it's for                                  | section |
| ----------------------------------- | ---------------------------------------------- | ------- |
| `cluesurf/task` branch `site`       | apt + rpm + apk repos under `site/` (Pages)    | §2      |
| AUR `cluesurf-task.git`             | Arch publishing (created via AUR submit form)  | §3      |
| `cluesurf/gentoo-overlay`           | Gentoo ebuild overlay                          | §6      |
| `cluesurf/scoop-bucket`             | Scoop manifest bucket                          | §7      |
| `<you>/winget-pkgs` (fork)          | local fork of `microsoft/winget-pkgs`          | §8      |
| `cluesurf/choco-code` *(optional)*  | self-hosted choco feed (only if community rejects again) | §9 |

Already existing: `cluesurf/task` (this one), `cluesurf/homebrew-code`.

### Env vars to set

| var                  | source                                                  | section |
| -------------------- | ------------------------------------------------------- | ------- |
| `APT_SIGNING_KEY`    | GPG key id (`gpg --full-generate-key`)                  | §1      |
| `APT_REPO_DIR`       | `~/cluesurf-task-site/site/apt` (worktree of `site`)    | §2      |
| `RPM_REPO_DIR`       | `~/cluesurf-task-site/site/rpm` (same worktree)         | §2      |
| `ALPINE_REPO_DIR`    | `~/cluesurf-task-site/site/apk` (same worktree)         | §2      |
| `ABUILD_KEY`         | `~/.abuild/<email>-<n>.rsa` (`abuild-keygen`)           | §4      |
| `AUR_REMOTE`         | `ssh://aur@aur.archlinux.org/cluesurf-task.git`         | §3      |
| `OBS_PROJECT`        | `home:<your-username>` on build.opensuse.org            | §5      |
| `GENTOO_OVERLAY_DIR` | local clone of `cluesurf/gentoo-overlay`                | §6      |
| `SCOOP_BUCKET_DIR`   | local clone of `cluesurf/scoop-bucket`                  | §7      |
| `WINGET_PKGS_DIR`    | local fork of `microsoft/winget-pkgs`                   | §8      |
| `CHOCO_API_KEY`      | community.chocolatey.org → My Account → API Key         | §9      |
| `CHOCO_SOURCE`       | (optional) self-hosted feed url                         | §9      |
| `NPM_TOKEN`          | `npm login` (or `npm token create` for CI)              | §10     |
| `GITHUB_TOKEN`       | `gh auth login` (also used by Docker → ghcr.io)         | §11     |

Total: **4 new GitHub repos** (one optional) + **1 branch** on
`cluesurf/task` + **14 env vars**.

---

## 1. GPG signing key (apt + rpm + alpine)

One key signs three repos.

```sh
gpg --full-generate-key
# RSA, 4096, no expiry, "ClueSurf APT" / lp@elk.fm

gpg --list-secret-keys --keyid-format=long
# copy the long key id (e.g. ABCD1234EF567890)

export APT_SIGNING_KEY=ABCD1234EF567890
```

Back up the secret key:

```sh
gpg --export-secret-keys --armor "$APT_SIGNING_KEY" > ~/cluesurf-apt.key.asc
# stash this offline / in 1Password
```

Used by: `apt`, `rpm`. The Alpine repo uses a separate scheme — see §4.

## 2. The `site` branch (apt + rpm + apk hosting, one place)

One branch on `cluesurf/task` hosts every Linux package repo. The
branch is called `site`. Inside it lives a `site/` folder with one
subdir per format. GitHub Pages serves that folder via a workflow.

Layout:

```
cluesurf/task  (branch: site)
  site/
    apt/      ← Debian / Ubuntu repo
    rpm/      ← RHEL / Fedora / openSUSE repo
    apk/      ← Alpine repo
    pubkey.asc  ← exported once, shared across all three
```

Final URLs (no custom domain):

- `https://cluesurf.github.io/task/apt`
- `https://cluesurf.github.io/task/rpm`
- `https://cluesurf.github.io/task/apk`

### One-time setup

```sh
# Create the orphan branch + folder.
git checkout --orphan site
git rm -rf .
mkdir -p site/{apt,rpm,apk}
echo '# cluesurf/task package repositories' > site/index.md
git add site
git commit -m "init site branch"
git push -u origin site
git checkout make    # or whatever your default branch is
```

Then add a Pages-deploy workflow on the default branch at
`.github/workflows/pages.yml`:

```yaml
name: pages
on:
  push:
    branches: [site]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with: { ref: site }
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: site }
      - id: deploy
        uses: actions/deploy-pages@v4
```

In *Settings → Pages*, set *Source: GitHub Actions*. After the
first push to `site`, every Linux repo lives at the URLs above.

### Local checkout for publishing

Clone the `site` branch into its own working tree (so you can edit
it without juggling branches in your main checkout):

```sh
git worktree add ~/cluesurf-task-site site

export APT_REPO_DIR=~/cluesurf-task-site/site/apt
export RPM_REPO_DIR=~/cluesurf-task-site/site/rpm
export ALPINE_REPO_DIR=~/cluesurf-task-site/site/apk
```

After running `pnpm host:pkg`, commit and push from
`~/cluesurf-task-site` — the Pages workflow re-deploys
automatically.

## 3. AUR account (Arch)

The Arch User Repository is an SSH-accessed git server.

1. Register at <https://aur.archlinux.org/register>.

2. *My Account → SSH Public Key* — paste your `~/.ssh/id_ed25519.pub`.

3. *Submit* a placeholder (the AUR refuses pushes to a name that
   doesn't exist yet). Click *Submit*, paste the rendered
   `PKGBUILD` from `load/linux/arch/dist/build/PKGBUILD` once.

4. ```sh
   export AUR_REMOTE=ssh://aur@aur.archlinux.org/cluesurf-task.git
   ```

5. Add to `~/.ssh/config` so `ssh` finds the right key:

   ```
   Host aur.archlinux.org
     User aur
     IdentityFile ~/.ssh/id_ed25519
   ```

## 4. Alpine signing key

Alpine doesn't use GPG. Generate a separate RSA key with `abuild`:

```sh
sudo apk add abuild        # on Alpine; or run inside docker:
docker run --rm -it -v ~/.abuild:/root/.abuild alpine:latest \
  sh -c 'apk add abuild && abuild-keygen -a -i -n'

# Inside the host (where the key landed):
export ABUILD_KEY=~/.abuild/lp@elk.fm-1234abcd.rsa
```

Back up `~/.abuild/*.rsa` — losing it means rotating the key on every
end-user machine.

## 5. OBS account (openSUSE)

1. Register at <https://build.opensuse.org/>. Verify email.

2. Install the OBS client + log in:

   ```sh
   sudo zypper install osc        # openSUSE
   sudo dnf install osc           # Fedora
   pip install osc                # macOS / generic
   osc whoami                     # prompts for username/password the first time
   ```

3. Create your home project (one time):

   ```sh
   osc meta prj home:cluesurf --create
   osc meta pkg home:cluesurf cluesurf-task --create

   export OBS_PROJECT=home:cluesurf
   ```

4. Configure target distros in the OBS web UI: *Repositories → Add*
   → openSUSE_Tumbleweed, Leap_15.6, Fedora rawhide, etc.

## 6. Gentoo overlay repo

Portage consumes ebuilds straight from a git repo.

```sh
gh repo create cluesurf/gentoo-overlay --public
git clone git@github.com:cluesurf/gentoo-overlay ~/cluesurf-overlay
cd ~/cluesurf-overlay
mkdir -p metadata profiles app-misc/cluesurf-task
echo 'cluesurf' > profiles/repo_name
echo 'masters = gentoo' > metadata/layout.conf
git add . && git commit -m "init overlay" && git push

export GENTOO_OVERLAY_DIR=~/cluesurf-overlay
```

## 7. Scoop bucket repo (Windows)

Same idea: a git repo of JSON manifests under `bucket/`.

```sh
gh repo create cluesurf/scoop-bucket --public
git clone git@github.com:cluesurf/scoop-bucket ~/cluesurf-scoop
cd ~/cluesurf-scoop
mkdir bucket
git add . && git commit --allow-empty -m "init bucket" && git push

export SCOOP_BUCKET_DIR=~/cluesurf-scoop
```

No signing — scoop trusts the bucket by URL.

## 8. winget-pkgs fork (Windows)

```sh
gh repo fork microsoft/winget-pkgs --clone
cd winget-pkgs
git remote add upstream https://github.com/microsoft/winget-pkgs

export WINGET_PKGS_DIR=$PWD
```

`gh` is what `publish.sh` uses to open the PR after pushing the
branch. Make sure `gh auth login` has been run.

## 9. Chocolatey API key (Windows)

1. Register at <https://community.chocolatey.org/account/Register>.
   Verify email.

2. Open <https://community.chocolatey.org/account>. Copy the value
   under *My API Key*.

   ```sh
   export CHOCO_API_KEY=<long token>
   ```

3. (Optional) Self-host a feed instead, since the community
   moderators historically rejected the `task` submission:

   ```sh
   gh repo create cluesurf/choco-code --public
   export CHOCO_SOURCE=https://cluesurf.github.io/choco-code
   ```

## 10. npm token (the Node CLI itself)

```sh
npm login          # writes ~/.npmrc
# or, for CI:
npm token create   # use the printed token as $NPM_TOKEN
```

Used by `pnpm publish --access=public`.

## 11. GitHub token

Used for `gh release create`, the winget-pkgs PR, and for cloning
private cluesurf repos.

```sh
gh auth login        # interactive, the easy path
# or, for CI:
gh auth login --with-token < github-pat.txt
```

The PAT needs scopes: `repo`, `read:org`, `write:packages`
(for ghcr.io Docker pushes).

## 12. ghcr.io (Docker)

Same GitHub PAT — log Docker into ghcr:

```sh
echo "$GITHUB_TOKEN" | docker login ghcr.io -u <gh-username> --password-stdin
```

Used for `docker push ghcr.io/cluesurf/task:<version>`.

## At-a-glance shell profile

Drop everything into `~/.zshrc` (or wherever) once it's all set up:

```sh
export APT_SIGNING_KEY=ABCD1234EF567890
export APT_REPO_DIR=~/cluesurf-task-site/site/apt
export RPM_REPO_DIR=~/cluesurf-task-site/site/rpm
export ALPINE_REPO_DIR=~/cluesurf-task-site/site/apk
export ABUILD_KEY=~/.abuild/lp@elk.fm-1234abcd.rsa
export AUR_REMOTE=ssh://aur@aur.archlinux.org/cluesurf-task.git
export OBS_PROJECT=home:cluesurf
export GENTOO_OVERLAY_DIR=~/cluesurf-overlay
export SCOOP_BUCKET_DIR=~/cluesurf-scoop
export WINGET_PKGS_DIR=~/winget-pkgs
export CHOCO_API_KEY=...
# NPM_TOKEN + GITHUB_TOKEN come from `npm login` / `gh auth login`
```

After this, `cd deck/task/load && ./publish.sh` Just Works.
