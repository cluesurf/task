# Native dependencies

`@cluesurf/task` is a thin TypeScript layer over native binaries
(ffmpeg, ImageMagick, pandoc, fontTools, qpdf, HarfBuzz,
duckdb, openssl, gitleaks, …). The CLI itself is a Node module
distributed via npm; the binaries it shells out to are installed
per-OS through the package manager you already use.

The tables below list every dependency by OS in a single flat
table. **Install only the categories you need** — if you never
run `task convert audio`, you don't need ffmpeg. The kitchen-sink
container at `ghcr.io/cluesurf/task:latest` pre-installs all of
them so you can skip the per-tool dance entirely.

The `Channel` column shows how each tool installs (`brew`,
`apt`, `choco`, `scoop`, `winget`, `pip`, `gem`, `cargo`, `go`,
or `manual`).

## macOS (Homebrew)

The cask `cluesurf/code/task` installs everything below in one
shot. See [`@cluesurf/homebrew-code`](https://github.com/cluesurf/homebrew-code)
for the cask source.

```bash
brew tap cluesurf/code
brew install cluesurf/code/task
pnpm add -g @cluesurf/task
```

| category | lib | channel | purpose |
| --- | --- | --- | --- |
| toolchain | `git`, `curl`, `wget`, `gnupg`, `pkg-config`, `coreutils`, `gnu-sed` | brew | Core toolchain |
| toolchain | `llvm`, `clang-format` | brew | LLVM toolchain + C/C++ formatter |
| language | `node` | brew | Node.js runtime |
| language | `python`, `pyenv` | brew | Python runtime + version manager |
| language | `go`, `rust`, `ruby` | brew | Language toolchains |
| language | `openjdk`, `maven`, `antlr` | brew | JVM toolchain |
| language | `php`, `php-cs-fixer`, `swift`, `swift-format` | brew | More languages |
| language | `julia` | brew (cask) | Julia runtime |
| format | `google-java-format`, `shfmt`, `ormolu`, `ocamlformat`, `prettier`, `sql-formatter`, `perltidy` | brew | Code formatters |
| format | `black` | pip | Python formatter |
| compile | `kotlin`, `zig`, `ghc`, `ocaml`, `dart-sdk`, `nim`, `crystal`, `vlang`, `typescript`, `emscripten`, `wasm-pack`, `coq` | brew | Compile targets |
| compile | `bend-lang` | cargo | Bend / HVM language |
| media | `imagemagick`, `ffmpeg`, `inkscape`, `gifsicle` | brew | Media conversion |
| media | `pandoc`, `qpdf`, `poppler`, `mupdf`, `ghostscript` | brew | Document conversion |
| media | `libreoffice`, `mactex-no-gui`, `calibre`, `darktable`, `rawtherapee` | brew (cask) | Document / RAW renderers |
| font | `fontforge`, `woff2`, `harfbuzz` | brew | Font tools |
| archive | `p7zip`, `unar`, `atool` | brew | Archive tools |
| image | `potrace`, `autotrace`, `pstoedit`, `librsvg`, `dcraw`, `openexr`, `pfstools`, `apngasm`, `webp` | brew | Extended image conversion |
| data | `libpq`, `duckdb`, `jupyter` | brew | Data tools |
| binary | `radare2`, `rizin`, `objconv`, `wabt`, `exiftool`, `id3v2`, `eye-d3` | brew | Binary / metadata analysis |
| search | `ripgrep`, `fd` | brew | Fast search tools |
| slides | `marp-cli` | brew | Markdown → slides |
| cloud | `kubernetes-cli`, `stern`, `doctl` | brew | Cloud / k8s |
| profile | `samply` | cargo | Cross-platform CPU sampling profiler |
| scan-secret | `gitleaks`, `trufflehog` | brew | Secret-leak scanners |
| pentest-port | `nmap`, `masscan` | brew | Port scanners |
| pentest-web | `subfinder`, `katana`, `httpx`, `ffuf`, `gobuster`, `amass` | brew | Crawlers / discovery |
| pentest-web | `nikto`, `sqlmap` | brew | Web vuln + SQLi |
| pentest-web | `wpscan`, `whatweb`, `cewl`, `zsteg` | gem | Pentest / OSINT (Ruby) |
| pentest-web | `wapiti3` | pip | Web app vuln scanner |
| pentest-cred | `hydra`, `john-jumbo`, `hashcat`, `crunch` | brew | Bruteforce |
| pentest-wifi | `aircrack-ng` | brew | WEP/WPA suite |
| pentest-pcap | `wireshark`, `tcpreplay` | brew | Capture + replay |
| pentest-osint | `theHarvester`, `maigret`, `sherlock-project`, `recon-ng`, `bbot`, `volatility3` | pip | OSINT / forensics |
| pentest-forensics | `binwalk`, `foremost`, `sleuthkit`, `yara`, `outguess` | brew | Forensics |
| pentest-mitm | `bettercap`, `ettercap`, `proxychains-ng`, `tor`, `mitmproxy` | brew | MITM / proxies |
| pentest-audit | `lynis`, `ssh-audit` | brew | Posture / SSH audit |
| pentest-cve | `trivy`, `grype`, `syft`, `osv-scanner` | brew | CVE / SBOM |
| pentest-framework | `metasploit-framework` | manual | `brew tap rapid7/metasploit` (not in core) |
| pentest-steg | `steghide` | manual | Removed from core; build from source or Docker |

## Linux (Debian / Ubuntu — apt)

The Docker image at `make/deck/docker/Dockerfile` is the source
of truth for the Linux dependency set. Inside the container the
tools below are pre-installed.

| category | lib | channel | purpose |
| --- | --- | --- | --- |
| toolchain | `build-essential`, `curl`, `wget`, `gnupg`, `pkg-config`, `git` | apt | Core toolchain |
| toolchain | `llvm-17`, `clang-17`, `clang-format-17` | apt | LLVM toolchain |
| language | `nodejs (NodeSource)` | manual | Node.js runtime |
| language | `python3`, `python3-pip`, `python3-venv` | apt | Python |
| language | `golang-go`, `rustc`, `cargo`, `ruby-full` | apt | Language toolchains |
| language | `openjdk-21-jdk`, `maven` | apt | JVM toolchain |
| language | `php-cli`, `composer` | apt + manual | PHP |
| language | `dart` | manual (dart_stable repo) | Dart SDK |
| media | `imagemagick`, `ffmpeg`, `inkscape`, `gifsicle`, `libreoffice` | apt | Media + docs |
| media | `pandoc`, `texlive`, `texlive-xetex`, `texlive-luatex`, `texlive-extra-utils` | apt | Document conversion |
| media | `ghostscript`, `mupdf`, `poppler-utils`, `qpdf` | apt | PDF tooling |
| media | `google-chrome-stable` | manual | Headless Chrome (puppeteer / marp) |
| font | `fontforge`, `fonttools`, `woff2`, `libharfbuzz-bin` | apt | Font tools |
| archive | `libarchive-tools` | apt | bsdtar |
| image | `potrace`, `autotrace (built from source)` | apt + manual | Vector tooling |
| binary | `id3v2`, `exiftool`, `ripgrep`, `fd-find` | apt | Metadata + search |
| data | `duckdb (manual download)` | manual | DuckDB CLI |
| data | `huggingface_hub` | pip | HF dataset / model CLI |
| profile | `samply` | cargo | CPU sampling profiler |
| trace | `strace`, `dnsutils`, `bind9-host` | apt | Trace + DNS diagnostics |
| scan-secret | `gitleaks`, `trufflehog` | manual | Release tarballs |
| pentest-port | `nmap`, `masscan`, `whatweb` | apt | Port scanners + fingerprint |
| pentest-web | `dirb`, `wfuzz`, `nikto`, `wapiti`, `sqlmap` | apt | Web vuln + SQLi |
| pentest-web | `wpscan` | gem | WordPress scanner |
| pentest-web | `subfinder`, `katana`, `httpx`, `gospider`, `ffuf`, `gobuster` | go | Crawlers / discovery |
| pentest-cred | `hydra`, `john`, `hashcat`, `crunch`, `cewl` | apt | Bruteforce / wordlists |
| pentest-wifi | `aircrack-ng`, `reaver`, `pixiewps` | apt | Wireless |
| pentest-pcap | `tshark`, `tcpdump`, `tcpreplay` | apt | Capture + replay |
| pentest-osint | `theHarvester`, `maigret`, `sherlock-project`, `photon-py`, `recon-ng`, `bbot` | pip | OSINT / recon |
| pentest-forensics | `binwalk`, `foremost`, `bulk-extractor`, `sleuthkit`, `yara` | apt | Forensics |
| pentest-steg | `steghide`, `stegseek`, `outguess` | apt | Steganography |
| pentest-steg | `zsteg` | gem | PNG/BMP steg |
| pentest-forensics | `volatility3` | pip | Memory forensics |
| pentest-mitm | `bettercap`, `ettercap-text-only`, `proxychains4`, `tor`, `mitmproxy` | apt | MITM / proxies |
| pentest-audit | `lynis`, `chkrootkit`, `rkhunter` | apt | Posture / hardening |
| pentest-audit | `ssh-audit` | pip | SSH config audit |
| pentest-cve | `trivy`, `grype`, `syft`, `osv-scanner` | manual | CVE + SBOM (release scripts) |
| pentest-framework | `metasploit-framework` | apt | Pentest framework |

## Windows

Two viable paths: WSL2 with the Linux table above, or native
Windows via Chocolatey + Scoop + winget. For most Task verbs the
WSL2 path is simpler — every Linux apt package above is one
`apt install` away inside WSL.

```powershell
# 1. Enable WSL2 + Ubuntu (one time)
wsl --install

# 2. Inside WSL2, follow the Linux table above

# 3. Outside WSL2, install only the Windows-specific bits
winget install OpenJS.NodeJS.LTS
winget install Microsoft.Sysinternals.ProcessMonitor
choco install ffmpeg pandoc imagemagick qpdf wireshark nmap

# 4. Install the Node CLI
pnpm add -g @cluesurf/task

# 5. Wire shell completion
task autocomplete >> $PROFILE   # PowerShell
```

| category | lib | channel | purpose |
| --- | --- | --- | --- |
| language | `Node.js LTS` | winget / scoop | `winget install OpenJS.NodeJS.LTS` |
| language | `Python` | winget / scoop | Python runtime |
| language | `Go`, `Rust`, `Ruby` | winget / scoop | Language toolchains |
| media | `ffmpeg`, `imagemagick`, `pandoc`, `qpdf`, `ghostscript`, `poppler` | choco | Media + docs |
| font | `exiftool`, `fontforge`, `fonttools`, `woff2`, `harfbuzz` | choco | Font + metadata |
| data | `duckdb` | manual | Release zip from duckdb.org |
| trace | `Sysinternals Process Monitor (`procmon.exe`)` | winget | Used by `task trace process` |
| scan-secret | `gitleaks`, `trufflehog` | choco / scoop | Secret scanners |
| pentest-port | `nmap`, `masscan` | choco | Port scanners |
| pentest-pcap | `wireshark` | choco | Network analyzer (ships `tshark`) |
| pentest-web | `sqlmap` | pip | SQLi tester |
| pentest-web | `subfinder`, `katana`, `ffuf`, `gobuster`, `amass` | scoop | Crawlers / discovery |
| pentest-web | `wpscan`, `whatweb`, `cewl`, `zsteg` | gem | Pentest / OSINT (Ruby) |
| pentest-osint | `theHarvester`, `maigret`, `sherlock`, `recon-ng`, `bbot`, `ssh-audit`, `volatility3`, `wapiti3` | pip | OSINT / recon |
| profile | `samply` | cargo | `cargo install samply` |
| pentest-cve | `trivy`, `grype`, `syft`, `osv-scanner` | scoop | CVE + SBOM |
| pentest-forensics | `binwalk`, `foremost`, `yara`, `lynis` | manual / WSL | Linux-only or via WSL |
| pentest-wifi | `aircrack-ng` | manual | Native Windows binaries available; better via WSL |
| pentest-framework | `metasploit-framework` | manual | Use the Rapid7 installer or Docker |

## Cross-OS notes

- **DuckDB**: Linux uses a manual zip; macOS uses `brew install
  duckdb`; Windows uses a manual zip. All three resolve to the
  same binary on PATH.
- **openssl, dig**: built-in on Linux + macOS; Windows users get
  them via `choco install openssl bind-toolsonly` or via WSL.
- **`samply`** is the cross-platform CPU profiler; Linux + macOS
  install via `cargo install samply`, Windows via cargo or the
  release `.exe`.
- **`task trace process`** dispatches to `strace` on Linux,
  `dtruss` on macOS (built-in, requires `sudo`), and `procmon`
  on Windows.
- **Steganography (`steghide`)**: removed from Homebrew core;
  Linux + Windows have an apt / choco package, macOS users build
  from source or run via Docker.
- **`metasploit-framework`**: Linux apt has it natively; macOS
  needs the `rapid7/metasploit` tap; Windows uses the Rapid7
  installer or Docker. Heavy and slow to install — skip it
  unless a `task generate payload` workflow needs it.

## Container fallback

Don't want to install any of this? Skip the catalog entirely and
run inside the prebuilt container, which has every dep above
preinstalled:

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/cluesurf/task:latest
```

Smaller per-workload images are published alongside the kitchen
sink — `image`, `font`, `pdf`, `document`, `tex`, `video`,
`embed`, `email`, `mutate`, `binary`, `cloud`, `code` — for when
you only need one slice. See `make/deck/docker/readme.md`.
