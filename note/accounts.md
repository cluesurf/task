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
| `cluesurf/deck`                     | apt + rpm + apk repos under `docs/` (Pages)    | §2      |
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
| `APT_REPO_DIR`       | `<deck-checkout>/docs/task/apt` (in `cluesurf/deck` clone)              | §2      |
| `RPM_REPO_DIR`       | `<deck-checkout>/docs/task/rpm` (same clone)                           | §2      |
| `ALPINE_REPO_DIR`    | `<deck-checkout>/docs/task/apk` (same clone)                           | §2      |
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

## 2. `cluesurf/deck` repo (apt + rpm + apk hosting, one place)

A single dedicated repo, `cluesurf/deck`, holds every Linux package
mirror. The repo's `docs/` folder is the GitHub Pages root —
served natively by Pages branch hosting (no workflow required).

Layout:

```
cluesurf/deck
  docs/
    task/
      apt/      ← Debian / Ubuntu repo
      rpm/      ← RHEL / Fedora / openSUSE repo
      apk/      ← Alpine repo
    index.html  ← optional landing page for browsers
```

Final URLs (no custom domain):

- `https://deck.clue.surf/task/apt`
- `https://deck.clue.surf/task/rpm`
- `https://deck.clue.surf/task/apk`

### One-time setup

The repo already exists — clone it locally next to `task/`:

```sh
gh repo clone cluesurf/deck deck
```

In `cluesurf/deck` *Settings → Pages*, set:

- **Source:** *Deploy from a branch*
- **Branch:** `main` (or whatever the default is)
- **Folder:** `/docs`

That's it — Pages serves `docs/` natively. No workflow file, no
artifact upload step. Future pushes to `main` republish in ~30s.

### Local checkout for publishing

Every export below lives in `deck/task/.env` (gitignored). Two
ways to load it:

```sh
# A) load into the current shell — `pnpm dotenv` prints `export` lines
eval "$(pnpm dotenv)"

# B) wrap a single command — runs ./publish.sh with .env loaded
pnpm with-env -- ./publish.sh
```

Both go through `make/deck/with-env.sh`, so the .env stays as
plain `KEY=value` lines (no `export` prefix needed). Every
`pnpm host:pkg*` script already wraps itself with `with-env.sh`,
so day-to-day publishing doesn't need either pattern.

The `.env` should contain at minimum:

```sh
APT_REPO_DIR=deck
RPM_REPO_DIR=deck
ALPINE_REPO_DIR=deck
```

For an always-on per-directory loader, drop a `.envrc` containing
`dotenv` next to `.env`, then `direnv allow` once.

After `pnpm host:pkg` writes the repo trees, `pnpm host:site`
commits and pushes — Pages republishes automatically.

## 3. AUR account (Arch)

The Arch User Repository is an SSH-accessed git server.

1. Register at <https://aur.archlinux.org/register>.

2. *My Account → SSH Public Key* — paste your `pbcopy < ~/.ssh/id_ed25519.pub`.

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

## At-a-glance: `deck/task/.env`

Keep all of these in `deck/task/.env` (gitignored) so secrets stay
off your shell rc and out of git history. Plain `KEY=value` lines —
no `export` prefix needed because we source with `set -a`:

```sh
APT_SIGNING_KEY=ABCD1234EF567890
APT_REPO_DIR=deck
RPM_REPO_DIR=deck
ALPINE_REPO_DIR=deck
ABUILD_KEY=~/.abuild/lp@elk.fm-1234abcd.rsa
AUR_REMOTE=ssh://aur@aur.archlinux.org/cluesurf-task.git
OBS_PROJECT=home:cluesurf
GENTOO_OVERLAY_DIR=~/cluesurf-overlay
SCOOP_BUCKET_DIR=~/cluesurf-scoop
WINGET_PKGS_DIR=~/winget-pkgs
CHOCO_API_KEY=...
# NPM_TOKEN + GITHUB_TOKEN come from `npm login` / `gh auth login`
```

Load it into the current shell:

```sh
cd deck/task
set -a; source .env; set +a
```

Or, if you prefer it always-on, drop a `.envrc` next to `.env`:

```sh
# deck/task/.envrc
dotenv
```

…then `direnv allow` once. Every future `cd deck/task` re-loads.

After this, `cd deck/task/make/deck && ./publish.sh` Just Works
because `publish.sh` already reads from the environment — it
doesn't care whether the values came from `.env`, direnv, or a
manually-exported shell.
