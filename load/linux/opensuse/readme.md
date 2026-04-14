# openSUSE (OBS)

openSUSE uses the same RPM spec as Fedora/RHEL. Reuse everything in
[`../rpm`](../rpm). The difference is the publishing path: instead
of shipping a `.repo` file you register the package with the Open
Build Service (OBS), which then produces RPMs for every openSUSE
release.

## Build locally (Leap / Tumbleweed)

```sh
../rpm/make.sh
sudo zypper install ../rpm/dist/cluesurf-task-*.rpm
```

## Setup (one-time)

1. Register an account at <https://build.opensuse.org/>. Verify
   email.

2. Install the OBS client:

    ```sh
    sudo zypper install osc        # openSUSE
    sudo dnf install osc           # Fedora
    pip install osc                # macOS / generic
    ```

3. First-run setup writes credentials to `~/.config/osc/oscrc`:

    ```sh
    osc whoami     # prompts for username + password the first time
    ```

4. Create your home project + the package skeleton (one time):

    ```sh
    osc meta prj home:<your-username> --create
    osc meta pkg home:<your-username> cluesurf-task --create

    export OBS_PROJECT=home:<your-username>
    export OBS_PACKAGE=cluesurf-task        # default; set only to override
    ```

5. Configure the project's enabled targets in the OBS web UI:
   *Repositories* → add openSUSE_Tumbleweed, Leap_15.6, Fedora
   rawhide, etc.

## Publish

```sh
OBS_PROJECT=home:<your-username> \
./publish.sh
```

`publish.sh` checks out the OBS package, copies in the rendered
spec from `../rpm/dist/`, and commits. OBS rebuilds for every
enabled target.

Resulting repos surface at
`https://download.opensuse.org/repositories/home:/<your-username>/`.

## Install (end user)

```sh
sudo zypper ar https://download.opensuse.org/repositories/home:/cluesurf/openSUSE_Tumbleweed/ cluesurf
sudo zypper refresh
sudo zypper install cluesurf-task
```

## What ships to OBS

- The rendered `cluesurf-task.spec` (same as the `rpm/` build).
  OBS rebuilds the `.rpm` per target — you don't upload binaries.

## Notes

- A few `Requires:` names differ on openSUSE (`ImageMagick` →
  `ImageMagick`, but `texlive-scheme-medium` is bundled differently
  on SUSE). Override per-target in OBS when the build fails to
  resolve.
