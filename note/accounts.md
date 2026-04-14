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
```

Answer the prompts:

| prompt | answer | why |
| --- | --- | --- |
| Key kind | **`1` — RSA and RSA** | `dpkg-sig` / `apt-secure` / `rpmsign` accept RSA universally; ECC (the default) breaks older distros |
| Key size | **`4096`** | 2048 works but 4096 is cheap insurance |
| Expiry  | **`0`** (never) | or 5y and rotate — either is fine |
| Name / email | `ClueSurf APT` / `lp@elk.fm` | purely cosmetic |
| Passphrase | set one | cached by `gpg-agent` so you only type it occasionally |

Then grab the key id and stash it in `.env`:

```sh
gpg --list-secret-keys --keyid-format=long
# copy the long key id, e.g. ABCD1234EF567890

# deck/task/.env
APT_SIGNING_KEY=ABCD1234EF567890
```

### Back up the private key

Pick one. All three get the key off-machine without leaving it in
`~/` forever.

**A. Pipe into macOS keychain** — no disk write. Use bare `-w`
(no `$(cat)` argument, that form hangs because the shell
evaluates the substitution before wiring up the pipe):

```sh
gpg --export-secret-keys --armor "$APT_SIGNING_KEY" \
  | security add-generic-password \
      -a "$(whoami)" -s cluesurf-apt-signing -w
```

**B. Two-step via `/tmp`** — more verbose but each step is easy
to verify, and it's the pattern that actually works with
`security`'s `-w "$(...)"` form:

```sh
umask 077    # so the file isn't world-readable
gpg --export-secret-keys --armor "$APT_SIGNING_KEY" > /tmp/key.asc

security add-generic-password \
  -a "$(whoami)" -s cluesurf-apt-signing \
  -w "$(cat /tmp/key.asc)"

rm -P /tmp/key.asc    # -P = overwrite before unlinking (macOS)
```

**C. Paste into 1Password manually** — simplest, no CLI deps:

```sh
gpg --export-secret-keys --armor "$APT_SIGNING_KEY" | pbcopy
# paste into a new 1Password Secure Note called "cluesurf-apt-signing"
pbcopy < /dev/null     # wipe clipboard when done
```

Do **not** commit any of these files, leave them in `~/Downloads`,
or let them sync via Dropbox / iCloud — a backup file in a
syncing folder is a data leak. The key already lives at mode 600
in `~/.gnupg/`; the backup only needs to survive your laptop
dying, not live next to the original.

Do **not** commit the file, leave it in `~/Downloads`, or let it
sync via Dropbox / iCloud. Avoid `~/cluesurf-apt.key.asc` unless
you're certain your home directory isn't being backed up to a
cloud service.

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

## 6. Gentoo overlay — nested in `cluesurf/deck`

Portage consumes ebuilds straight from a git repo. Rather than
maintain a dedicated `cluesurf/gentoo-overlay`, nest the overlay
as a subdirectory of the existing `cluesurf/deck` Pages repo —
same pattern as apt / rpm / alpine.

Layout inside `cluesurf/deck`:

```
docs/
  task/
    apt/   rpm/   apk/   gentoo/   ← overlay root
                           profiles/repo_name    → cluesurf
                           metadata/layout.conf  → masters = gentoo
                           app-misc/cluesurf-task/*.ebuild
```

### One-time setup

Point `.env` at the overlay subdir, then run the init script:

```sh
# deck/task/.env
GENTOO_OVERLAY_DIR=/Users/you/base/crew/cluesurf/deck/docs/task/gentoo
```

```sh
pnpm gentoo:init
```

`gentoo:init` is idempotent — it creates `profiles/repo_name` and
`metadata/layout.conf` if they don't exist and stages a single
commit in the parent `cluesurf/deck` clone. No separate repo, no
second clone.

Afterwards every `pnpm host:pkg:gentoo` writes a fresh ebuild
into the overlay alongside the rest of the Pages publish cycle.

### User install

Because the overlay root is a subdirectory, Gentoo users can't
rely on `eselect repository enable cluesurf` (which assumes the
git root == overlay root). They add it manually via
`repos.conf`:

```ini
# /etc/portage/repos.conf/cluesurf.conf
[cluesurf]
location = /var/db/repos/cluesurf
sync-type = git
sync-uri = https://github.com/cluesurf/deck.git
masters = gentoo
```

Then `emerge --sync cluesurf && emerge cluesurf-task`.

## 7. Scoop bucket — nested in `cluesurf/deck`

Same nesting pattern as apt / rpm / apk / gentoo. A scoop
"bucket" is just a directory of manifest JSONs served over HTTPS;
Pages hosts them at `https://deck.clue.surf/task/scoop/<name>.json`.

Layout inside `cluesurf/deck`:

```
docs/task/scoop/
  cluesurf-task.json   ← scoop manifest
```

Publish config:

```sh
# deck/task/.env
SCOOP_BUCKET_DIR=/Users/you/base/crew/cluesurf/deck/docs/task/scoop
```

`pnpm host:pkg:scoop` renders the manifest, copies it into that
path, and commits along with the rest of the Pages publish cycle.
No init script needed — a scoop bucket doesn't require any bootstrap
metadata (unlike a gentoo overlay).

### User install

Because the bucket is nested inside a larger repo, `scoop bucket
add cluesurf <url>` doesn't work (it assumes `bucket/` at repo
root). Users install via the manifest URL directly — scoop
supports this natively and will auto-update on `scoop update`:

```powershell
scoop install https://deck.clue.surf/task/scoop/cluesurf-task.json
```

No signing — scoop trusts the manifest by URL + hash.

## 8. winget-pkgs fork — under `cluesurf` org

Fork into the org with a distinct name so it's clearly a
vendor-tracked fork rather than a fresh project. Skip `--clone`
on the fork command and do a shallow clone manually — the full
winget-pkgs history is several GB and you don't need it just to
open a PR.

```sh
# 1. fork on github, no local clone yet
gh repo fork microsoft/winget-pkgs \
  --org cluesurf \
  --fork-name fork-winget-pkgs

# 2. shallow clone — ~50 MB instead of ~6 GB
gh repo clone cluesurf/fork-winget-pkgs fork-winget-pkgs -- \
  --depth 1 --filter=blob:none --no-tags --single-branch

cd fork-winget-pkgs
git remote add upstream https://github.com/microsoft/winget-pkgs
```

What each flag does:

| flag | effect |
| --- | --- |
| `--depth 1` | only the tip commit, no history |
| `--filter=blob:none` | skip file contents; git lazy-fetches them on demand |
| `--no-tags` | winget-pkgs has hundreds of release tags you don't need |
| `--single-branch` | only the default branch, no extra remotes |

Then point `.env` at the clone:

```sh
# deck/task/.env
WINGET_PKGS_DIR=/Users/you/base/crew/cluesurf/fork-winget-pkgs
```

`gh` is what `publish.sh` uses to open the PR after pushing the
branch. Make sure `gh auth login` has run and the authenticated
account has push rights on `cluesurf/fork-winget-pkgs`.

If you ever need the full history (`git log` on old commits,
bisect, etc.), run `git fetch --unshallow && git fetch --refetch`
— converts the shallow + partial clone into a full one.

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
