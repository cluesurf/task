# `task` command reference

Every command is verb-first: `task <verb> [thing] [path-or-args]`.

**Global flags** on every verb:

| flag              | meaning                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `-f, --format`    | `pretty` (default), `text`, `plain`, `json`, `json:pretty`          |
| `--help`          | Tinted help layout for the current path                             |
| `-v, --version`   | Print the installed `@cluesurf/task` version                        |
| `--explain`       | Print the native commands the verb would run, without executing     |
| `--log [pattern]` | Stream subprocess output. Pass a glob to filter (`"*"` = all)       |

**Invocation shorthands:**

- `task <verb> <file>` — positional fills the input; the subcommand
  is inferred from the file extension. For edit verbs the same path
  also fills output (in-place edit) unless `-o <out>` is given.
- `task <verb> <in> <out>` — convert-only two-positional form.
  `task convert a.png a.jpg` lifts the second path into `-o`.
- `task <verb> -i <in> -o <out>` — explicit; pass the same path to
  both for in-place edits.

## Add

```sh
task add ssh prod --host 1.2.3.4 --user ubuntu --key ~/.ssh/prod
```

## Aggregate

```sh
task aggregate log app.log --key status         # tally by status
task aggregate log app.log --key level --top 10
```

## Archive

```sh
task archive ./src -o dist/src.tar.gz           # two-positional shorthand
task archive --tool tar -i ./src -O tar.gz -o dist/src.tar.gz
```

Absolute / nested input paths are stored flat: `task archive /Users/x/Desktop/foo -o foo.tar.gz` produces `foo/...` inside the archive, not the full path tree.

## Check

```sh
task check report.pdf
```

## Combine

```sh
task combine a.pdf b.pdf -o merged.pdf          # two-positional shorthand
task combine -i a.pdf -i b.pdf -o merged.pdf
```

## Compile

```sh
# extension-inferred
task compile hello.c     -o hello
task compile hello.cpp   -o hello
task compile main.rs     -o main
task compile main.swift  -o main
task compile mod.wat     -o mod.wasm

# or explicit language
task compile c     -i hello.c -o hello

# every other compile target (full list: `task compile --help`)
task compile go            main.go        -o app
task compile kotlin-jvm    Main.kt        -o app.jar
task compile kotlin-native Main.kt        -o app
task compile zig           main.zig       -o app
task compile haskell       Main.hs        -o app
task compile ocaml         main.ml        -o app
task compile dart          bin/main.dart  -o app
task compile nim           main.nim       -o app
task compile crystal       main.cr        -o app
task compile v             main.v         -o app
task compile tsc           src/index.ts                       # type-check only

# wasm targets
task compile wasm-emcc     main.c         -o main.wasm        # emscripten
task compile wasm-wasi     main.c         -o main.wasm        # clang + WASI
task compile wasm-pack     ./crate                            # rust → wasm-pack

# llvm pipeline (c / cpp / rust / swift accept --emit ir|asm|object|exe)
task compile c             main.c         --emit ir           # → main.ll
task compile llvm-opt      main.ll        -O 3                # optimized IR
task compile llvm-llc      main.ll        -o main.s           # lowered to asm
```

## Compress

```sh
task compress etch.ttf                  # → font, writes sibling .woff2
task compress photo.jpg -o small.jpg -q 50
task compress song.wav  -o song.mp3  -b 128k
task compress clip.mov  -o clip.mp4  --crf 28
```

## Container

```sh
# build — auto picks docker build (Dockerfile present) or buildpacks
task container build -t myapp:latest
task container build -t myapp:1.0 --buildpacks --builder paketobuildpacks/builder-jammy-base
task container build -t myapp:1.0 --platform linux/amd64,linux/arm64 --push

# scan — trivy by default, grype available
task container scan myapp:latest
task container scan myapp:latest --severity critical
task container scan myapp:1.0 --format sarif -o trivy.sarif
task container scan myapp:latest --tool grype

# size — layer-by-layer breakdown via dive
task container size myapp:latest                          # interactive TUI
task container size myapp:1.0 --ci --highest-wasted 5     # CI gate

# shell — throwaway container
task container shell alpine:latest                        # auto bash → sh
task container shell node:24 --mount-cwd /work -w /work
task container shell debian:stable --shell bash --user root

# clean — prune with disk-reclaim report
task container clean                                      # gentle
task container clean --all                                # also tagged unused
task container clean --all --volumes                      # nuclear
```

## Convert

```sh
# two-positional shorthand
task convert a.png a.jpg
task convert audio.wav audio.mp3

# explicit
task convert image    -I png  -O webp -i icon.png   -o icon.webp
task convert audio    -i in.wav -o out.mp3 -b 192k
task convert document -I docx -O pdf  -i memo.docx  -o memo.pdf
task convert document -I tex  -O pdf  -i paper.tex  -o paper.pdf --engine xelatex
task convert document -I tex  -O html -i paper.tex  --tool make4ht
task convert archive  -I zip  -O tar.gz -i in.zip   -o out.tar.gz
task convert font     -I ttf  -O woff  -i etch.ttf  -o etch.woff
task convert time     --input 2026-04-14T12:00:00Z --output-format unix
task convert unit     --value 100 --from kg --to lb
```

## Compare

```sh
task compare a.json b.json                       # semantic JSON diff
task compare a.yaml b.yaml -f yaml
task compare old.txt new.txt -f text             # LCS line diff
```

## Copy

```sh
task copy ssh-key     prod                      # → clipboard
task copy environment API_KEY                   # env var → clipboard
task copy environment API_KEY --file .env.prod
```

## Crop

```sh
task crop paper.pdf -o paper.trimmed.pdf --margin 20
```

## Detect

```sh
task detect bidi source.ts                       # Trojan Source scan
```

## Disassemble

```sh
task disassemble binary -i a.out                          # objdump
task disassemble binary -i a.out --tool llvm-objdump       # llvm variant
task disassemble wasm   mod.wasm                          # wasm2wat
task disassemble jvm    Main.class --verbose              # javap
task disassemble dotnet app.dll -o app.il                 # ildasm
task disassemble radare ./hello --profile functions       # radare2
task disassemble radare ./hello --tool rizin --profile calls -o graph.dot
```

## Download

```sh
task download hugging-face --repo bert-base-uncased -o models/bert

# cloud / storage
task download s3      s3://bucket/key.bin ./key.bin
task download s3      s3://bucket/key      ./key --endpoint https://<acct>.r2.cloudflarestorage.com
task download gcs     gs://bucket/dir/ ./dir/ -r
task download azure   myblob ./file --account acct --container data

# wire
task download ftp     ftp://host/file ./file --user me --password secret
task download sftp    user@host:/path/file ./file -i ~/.ssh/prod
task download webdav  https://cloud.example.com/remote.php/dav/files/me/a.txt ./a.txt --user me --password pat
task download ipfs    bafy... ./out
task download torrent "magnet:?xt=urn:btih:..." ./downloads
```

## Upload

```sh
task upload s3      ./key.bin s3://bucket/key.bin
task upload s3      ./key      s3://bucket/key --endpoint https://<acct>.r2.cloudflarestorage.com
task upload gcs     ./dir/     gs://bucket/dir/ -r
task upload azure   ./file.bin myblob --account acct --container data
task upload ftp     ./file.zip ftp://host/incoming/file.zip --user me --password secret
task upload sftp    ./file     user@host:/path/file
task upload webdav  ./a.txt    https://cloud.example.com/remote.php/dav/files/me/a.txt --user me --password pat
task upload ipfs    ./dir -r --cid-version 1
```

## Dump

```sh
task dump etch.ttf -o etch.ttx                   # font → TTX
task dump etch.ttf -o etch.name.ttx -t name,OS/2 # selected tables
task dump etch.ttx -o etch.ttf                   # TTX → font
```

## Edit

```sh
task edit ssh        # opens ~/.ssh/config in $EDITOR / vi
```

## Unpack

Replaces `extract` as the standard verb for pulling content out of a container.

```sh
task unpack src.tar.gz -o src/
task unpack doc.pdf    -o pages.pdf --pages 1-3
task unpack etch.ttf   -O ttx
task unpack etch.ttf   -O fea -o etch.features.ttx
```

## Flip

```sh
task flip photo.png -o mirrored.png --horizontal
task flip photo.png -o flipped.png  --vertical
```

## Format

```sh
# extension-inferred (any language listed below works as a positional too)
task format main.s
task format main.c
task format main.py
task format main.rs
task format Main.swift

# explicit language (full list: `task format --help`)
task format go        main.go                                # gofmt -s -w
task format java      Main.java                              # google-java-format
task format shell     deploy.sh                              # shfmt
task format sql       query.sql                              # sql-formatter
task format dart      bin/main.dart                          # dart format
task format haskell   Main.hs                                # ormolu
task format ocaml     main.ml                                # ocamlformat
task format zig       main.zig                               # zig fmt
task format clang-tidy main.cpp                              # apply clang-tidy fixes

# markup formatters (prettier-fronted)
task format html      index.html
task format css       styles.css
task format js        src/index.js
task format ts        src/index.ts
task format yaml      ci.yml
task format json      package.json
task format markdown  README.md

# stdout / check mode (don't write back; non-zero exit on diff)
task format ts src/index.ts --check
```

## Generate

```sh
task generate hash   -i file.bin --algorithm sha256
task generate qrcode -t "https://example.com" -o qr.png
task generate string --length 32 --format base32
```

## Get

```sh
task get duration    song.mp3
task get environment HOME
task get environment API_KEY --file .env.prod
task get ssh         prod
task get ssh-key     prod   # prints the .pub
```

## Halt

```sh
task halt process 1234
task halt process --text node
task halt process 1234 --signal SIGKILL
task halt port 3000
```

## Highlight

```sh
# basic PDF highlight stamp
task highlight -i paper.pdf -o paper.marked.pdf --text "important"

# or
task highlight paper.pdf -o paper.marked.pdf --text "important"

# log level highlighter
task highlight log app.log --level error
task highlight log app.log --text "5\\d\\d"
```

## Inspect

```sh
# auto-route from extension
task inspect report.pdf
task inspect song.mp3
task inspect etch.ttf
task inspect notes.txt            # shows type / mime / encoding / eol

# explicit subcommands
task inspect color    -i image.png
task inspect file     -i clip.mp4 -f json | jq .groups
task inspect metadata -i photo.jpg
task inspect unicode  text.txt                    # codepoint table

# processes / network / system
task inspect process 1234
task inspect process 1234 -s children,port,file
task inspect network                              # summary
task inspect network --connections                # every open socket + owning process
task inspect network --listening                  # only LISTEN sockets (servers on this box)
task inspect network --established                # only ESTABLISHED sockets (live traffic)
task inspect network --remote                     # remote endpoints only
task inspect network --remote --group ip          # grouped by remote IP
task inspect network --remote --group domain      # reverse-DNS grouped by domain
task inspect network --connections --filter "*chrome*"  # glob match on process name
task inspect network --remote --group domain --watch    # live view, refreshes every 2s
task inspect network example.com -s dns:A,MX,TXT
task inspect system
task inspect system -s memory,disk

# web / wire
task inspect http https://example.com             # status + headers
task inspect tls  example.com                     # cert chain
task inspect parquet data.parquet                 # schema + column stats
```

## List

```sh
task list process                        # all processes
task list process --port 3000            # who owns that port
task list process --name chrome          # glob / substring on name
task list process --text node            # ranked fuzzy search
task list process --filter "memory > 500mb AND name ~ node"
task list process --user foobar
task list process --top memory
task list process --sort cpu --direction descending    # or asc / desc
task list process --group name           # aggregate by name
task list process --show cpu:sum --show memory:sum     # column aggregates
task list process --layout tree          # full process tree (subtree memory rolled up)
task list process 1234 --layout tree     # subtree from PID
task list process 1234 -s children

task list port                           # open TCP / UDP ports
task list port --status open
task list port --protocol tcp

task list network interface              # en0, lo0, ...
task list network connection --status open
task list network route

task list ssh                            # ~/.ssh/config entries
```

## Make

```sh
task make ssh-key prod
task make ssh-key prod --comment "someone@laptop"
task make ssh-key prod --host 1.2.3.4 --user ubuntu  # key + config
```

## Measure

```sh
task measure https://example.com          # DNS / connect / TTFB / total
```

## Modify

```sh
task modify doc.pdf -o doc.reordered.pdf --order 3,1,2
task modify doc.pdf -o doc.trimmed.pdf   --remove 2
```

## Normalize

```sh
task normalize song.mp3 -o normalized.mp3                 # EBU R128 defaults
task normalize song.mp3 -o podcast.mp3 --target -18
task normalize unicode text.txt --form NFC                # NFC / NFD / NFKC / NFKD
```

## Open

```sh
task open ssh prod    # interactive `ssh prod`
```

## Optimize

```sh
task optimize photo.jpg -o photo.small.jpg
task optimize clip.mp4  -o clip.small.mp4
```

## Pad

```sh
task pad intro.mp3 -o intro.padded.mp3 --to 3:00.000
task pad tone.wav  -o tone.padded.wav  --to 12.5
```

## Parse

```sh
task parse code -i snippet.ts -o snippet.ast.json
task parse log  nginx.log -f json
task parse log  app.log   -f yaml

# HTML — tables / links / images / text from a URL or file
task parse html https://en.wikipedia.org/wiki/List_of_largest_companies
task parse html ./page.html --table 0                          # pick by index
task parse html ./page.html --table "#pricing"                  # by selector
task parse html ./page.html --match price                       # filter
task parse html ./page.html -f csv -o tables.csv
task parse html https://example.com --links --images
task parse html https://app.example.com --render                # JS-rendered (puppeteer)
task parse html https://app.example.com --render --engine playwright --wait-for "table.results"
```

## Ping

```sh
task ping example.com
task ping example.com -c 10
```

## Push

```sh
task push ssh-key prod prod                  # ssh-copy-id
task push ssh-key work ubuntu@10.0.0.5
```

## Remove

```sh
task remove metadata     photo.jpg            # EXIF / XMP / ID3 strip
task remove metadata     song.mp3             # routes to ffmpeg for mp3/wav
task remove exif         photo.jpg --preset gps                # surgical — keep camera, drop GPS
task remove exif         photo.jpg --tag SerialNumber --overwrite
task remove audio        clip.mp4 -o clip.silent.mp4
task remove subtitles    clip.mkv -o clip.nosub.mkv             # ffmpeg -sn
task remove password     secure.pdf --password hunter2          # qpdf --decrypt
task remove profile      photo.jpg                              # drop embedded ICC / IPTC / XMP
task remove transparency logo.png -b "#0b1020"                   # flatten alpha
task remove invisible    text.txt                               # zero-width / BOM / joiners
task remove ssh-key      prod
```

## Render

```sh
task render font -i etch.ttf -o sample.png -t "Hello"
task render font -i etch.ttf -o sample.svg -t "Hello" --font-size 64
```

## Resize

```sh
task resize photo.jpg -o photo.small.jpg --width 800
task resize clip.mp4  -o web.mp4         -w 1920
task resize clip.mp4  -o thumb.mp4       -w 320 -h 180
```

## Rm

```sh
task rm ssh old-box
```

## Rotate

```sh
task rotate photo.png -o rotated.png -d 90
task rotate clip.mp4  -o rotated.mp4 -d 270
```

## Sanitize

```sh
task sanitize code -i notebook.py -o notebook.clean.py
```

## Record

```sh
task record screen   -o demo.mp4                       # mp4 until Ctrl-C
task record screen   -o demo.gif -t 15 -r 15           # 15s gif
task record terminal -o demo.cast                      # asciinema rec
task record terminal -o build.cast -c "pnpm make"      # capture one cmd
```

## Replay

```sh
task replay demo.cast                                  # play in terminal
task replay demo.cast -s 2                             # 2x speed
task replay demo.cast -o demo.gif                      # render gif
task replay demo.cast -o demo.mp4                      # render mp4
```

## Configure

```sh
task configure machine                                 # dev preset (default)
task configure machine --preset min                    # minimal
task configure machine --from ./my-machine.yml         # custom manifest
task configure machine --dry-run                       # preview only
task configure machine --skip vscode --skip git        # skip stages
```

## Scan

```sh
# CVE / SBOM / secrets / network — all behind one verb
task scan image      myapp:latest --severity critical
task scan filesystem .                                  # source + lockfiles
task scan host                                          # local OS packages
task scan secrets    .                                  # gitleaks
task scan sbom       myapp:latest --format cyclonedx -o sbom.json
task scan network    192.168.1.0/24                     # home LAN
task scan network    192.168.1.10 -p 22,80,443
task scan network    10.0.0.5 --scan-type vuln          # NSE vuln scripts

# SSH host-key fingerprint
task scan ssh github.com
task scan ssh github.com -t ed25519
```

## Project (zero-config runner)

Two shapes — both call the same backend.

**Canonical: `task <verb> code`** (preferred):

```sh
task build code                             # pnpm build / cargo build / go build / ...
task test code                              # pnpm test  / cargo test  / go test  / ...
task run code                               # pnpm dev   / cargo run   / go run . / ...
task lint code
task format code
task install code
task clean code
```

**Single-file mode: `task build <file>`** (extension → compiler):

```sh
task build foo.c            # → clang  → foo
task build foo.rs           # → rustc  → foo
task build foo.go           # → go build → foo
task build foo.hs           # → ghc    → foo
task build foo.v            # → coqc   → foo (Coq vernacular)
task build main.bend        # → bend gen-cu
task build foo.txt -l c     # force a language when the extension is wrong
task build foo.c -o out     # custom output path
```

**Legacy alias: `task project <verb>`** (still works, identical to `task <verb> code`):

```sh
task project build
task project test
task project call "cargo bench --release"   # escape hatch — arbitrary cmd
```

**Common knobs** (work on either shape):

```sh
task build code --dry-run                   # show resolved command, don't run
task build code --explain                   # print before running
task build code -e cargo                    # force an ecosystem (polyglot repo)
```

Override per-repo via `.taskrc`:

```yaml
# .taskrc
build: cargo build --release
test:  cargo test --all-features
```

Detected ecosystems (71 total): pnpm / bun / npm / cargo / go /
uv / poetry / pdm / hatch / pipenv / conda / pip / maven / gradle /
sbt / mill / scala-cli / clojure / leiningen / dotnet / stack /
cabal / dune / elm / spago / swift-pm / flutter / dart / rails /
bundler / laravel / composer / mix / phoenix / gleam / rebar3 /
zig / nim / dub / v / bazel / buck2 / pants / cmake / meson /
autotools / ninja / hugo / jekyll / mdbook / mkdocs / docker / make …

## Scout

```sh
# domain availability (existing)
task scout domain "my-app"

# username availability across ~30 platforms (new)
task scout username foobar                                      # every platform
task scout username foobar -p github,gitlab,npm                 # comma list
task scout username foobar -p github -p twitter                 # repeated flag
task scout username foobar -p pypi,dockerhub,crates,rubygems
task scout username foobar -p twitter,instagram,facebook,linkedin
task scout username foobar -p reddit,youtube,tiktok,twitch,kick
task scout username foobar -p medium,substack,devto,hashnode
task scout username foobar -p discord,telegram
task scout username foobar -p behance,dribbble,figma,notion

# machine-readable
task scout username foobar -f json
task scout username foobar -f json | jq '.results[] | select(.status=="available")'
```

## Search

```sh
task search --query "TODO" --path src/
task search logs/*.log --filter "error"
```

## Set

```sh
task set encoding utf8 legacy.txt
task set encoding utf8 legacy.txt -o clean.txt
task set eol lf   build.sh
task set eol crlf script.bat

task set environment API_KEY sk-abc                          # positional
task set environment DATABASE_URL postgres://... --file .env.prod

task set metadata song.mp3 --title "Song" --artist "Band" --album "Record"

task set ssh prod --user root
task set ssh prod --port 2222 --jump bastion
```

## Shape

```sh
task shape font -i etch.ttf -t "office"
task shape font -i etch.ttf -t "office" --features "-liga"
```

## Slice

```sh
task slice paper.pdf -o section.pdf --pages 4-10
```

## Split

```sh
task split song.mp3  --segments silence           # audio on silence
task split song.mp3  --segments 30                # 30s chunks
task split file.pdf  --pages 1-3                  # PDF page slice
```

## Subset

```sh
task subset etch.ttf -o etch.min.ttf -t "Hello world"
task subset etch.ttf -o etch.latin.woff2 -u U+0020-007F --flavor woff2
```

## Sync

```sh
# rsync-style mirror
task sync ./src/ /Volumes/Backup/src/ --delete
task sync ./src/ ./dst/ --dry-run --checksum
task sync ./site/ user@box:/var/www/site/          # ssh
task sync ./photos/ smb://nas.local/photos/2026 --user foobar  # NAS / Synology

# snapshot-style (deduplicated, versioned)
task sync snapshot ~/Documents --repo /backups/home           # default: restic
task sync snapshot ~/src --tool borg --repo /backups/borg
task sync snapshot --action list  --repo /backups/home
task sync snapshot --action prune --repo /backups/home \
  --keep-daily 7 --keep-weekly 4 --keep-monthly 12
```

## Test

```sh
task test ssh prod        # BatchMode=yes reachability
```

## Trace

```sh
task trace route example.com
task trace route example.com -m 15
```

## Trim

```sh
task trim song.mp3 -o clip.mp3 -s 10        -e 30
task trim clip.mp4 -o cut.mp4  -s 00:00:10 -e 00:00:30
task trim clip.mp4 -o cut.mp4  -s 10        -e 30 --reencode
task trim photo.png -o tile.png -c 100,100,400,400
```

## Update

```sh
task update etch.ttf -F features.fea                   # compile FEA
task update etch.ttf -F features.fea -o dist/v2.ttf

task update photo.png --grayscale                      # image tweaks
task update photo.png -o warm.png --saturation +20
task update photo.png -o bright.png --brightness +10 --contrast +5

task update clip.mp4 -o clip.sub.mp4 -s subs.srt       # mux subtitles
```

## Validate

```sh
task validate document -i report.pdf
```

## Verify

```sh
task verify image -i photo.jpg
```

## Watch

```sh
task watch process
task watch process node
task watch process --top memory --interval 2000
```

## End-to-end workflows

### SSH setup

```sh
task make ssh-key prod --host 1.2.3.4 --user ubuntu  # key + config
task push ssh-key prod prod                          # install on remote
task scan ssh   prod                                 # read host keys
task test ssh   prod
task open ssh   prod

task add ssh work --host 10.0.0.5 --user foobar --key ~/.ssh/work
task set ssh work --port 2222
task list ssh
task rm  ssh old
```

### Audio / video / image

```sh
task inspect song.mp3
task trim song.mp3 -o clip.mp3 -s 10 -e 30
task normalize clip.mp3 -o final.mp3
task set metadata final.mp3 --title "Clip" --artist "Me"

task inspect clip.mp4
task compress clip.mov -o clip.mp4
task trim clip.mp4 -o cut.mp4 -s 00:00:10 -e 00:00:30
task rotate cut.mp4 -o rot.mp4 -d 90
task remove audio rot.mp4 -o silent.mp4
task update silent.mp4 -o subbed.mp4 -s subs.srt

task inspect photo.png
task resize photo.png -o web.png -w 800
task flip photo.png -o mirror.png --horizontal
task trim photo.png -o tile.png -c 100,100,400,400
task compress photo.png --quality 80
task update photo.png --grayscale
```

### Fonts

```sh
task inspect etch.ttf
task subset  etch.ttf -o etch.min.ttf -t "Hello world"
task compress etch.ttf -o dist/etch.woff2
task dump    etch.ttf -o etch.ttx
task update  etch.ttf -F features.fea
task shape   font -i etch.ttf -t "office"
task render  font -i etch.ttf -o sample.png -t "Hi"
```

### Text encoding / line endings

```sh
task inspect notes.txt            # type / mime / encoding / eol
task set encoding utf8 notes.txt
task set eol      lf   build.sh
```

### Network diagnostics

```sh
task ping example.com
task measure https://example.com
task trace route example.com
task inspect network                        # local summary
task inspect network example.com -s dns:A,MX,TXT
task list network interface
task list network connection --status open
task list network route
```

### System snapshot

```sh
task inspect system
task inspect system -s memory,disk
task list process --top memory
task list process --layout tree
task watch process node
```

## Standard short flags

| long              | short | verbs                                                |
| ----------------- | ----- | ---------------------------------------------------- |
| `--input-file-path` | `-i`  | every convert-style verb                             |
| `--output-file-path`| `-o`  | every convert-style verb                             |
| `--input-format`  | `-I`  | convert                                              |
| `--output-format` | `-O`  | convert, extract font                                |
| `--format`        | `-f`  | global output style                                  |
| `--text`          | `-t`  | shape, render, highlight, subset, scan ssh           |
| `--bitrate`       | `-b`  | compress audio, convert audio                        |
| `--quality`       | `-q`  | compress image                                       |
| `--degree`        | `-d`  | rotate image / video                                 |
| `--width`         | `-w`  | resize video                                         |
| `--height`        | `-h`  | resize video                                         |
| `--start`         | `-s`  | trim audio / video                                   |
| `--end`           | `-e`  | trim audio / video                                   |
| `--duration`      | `-d`  | trim audio / video                                   |
| `--crop`          | `-c`  | trim image                                           |
| `--show`          | `-s`  | inspect process / network / system                   |
| `--count`         | `-c`  | ping                                                 |
| `--max-hops`      | `-m`  | trace route                                          |
| `--unicodes`      | `-u`  | subset font                                          |
| `--fea`           | `-F`  | update font (capital avoids `-f` collision)          |
| `--subtitles`     | `-s`  | update video                                         |

## Help conventions

- Required options are marked with a red `*` in the first column.
- Choice values render as background-tinted pills; the default
  pill gets an extra green highlight.
- Read-style verbs (`inspect`, `get`, `check`, `shape`, `list`,
  `halt`) skip the ora spinner and print their content directly.
- `task <verb> <path>` auto-routes to the subcommand whose kind
  matches the file extension.

## Error format

```
ERROR
<message>
run `task <verb> --help` to see available commands
```

## Platform notes

- SSH (`~/.ssh/config`, keys, push, copy, open, test, scan, edit)
  works on macOS, Linux, and Windows 10+. POSIX file modes only
  apply on unix-likes; Windows uses the native ACL on
  `%USERPROFILE%\.ssh`.
- Clipboard picker: `pbcopy` / `clip` / `wl-copy` / `xclip`.
- `task push ssh-key` uses `ssh-copy-id` where available, otherwise
  falls back to `ssh <host> 'cat >> ~/.ssh/authorized_keys'`.
- `task set encoding` requires `iconv` (ships with macOS / most
  Linux; Windows needs Git for Windows or WSL).
- `task trace route` uses `traceroute` on unix, `tracert` on Windows.
- `task inspect system` reads disks via `df -Pk` on unix and
  PowerShell `Get-PSDrive` on Windows.

## Not yet implemented

- Spreadsheet data verbs: `task select / filter / sort / group / style /
  freeze` for xlsx / csv / parquet (DuckDB + exceljs split planned)
- Font metadata updates: `task update font --name/--family/--style`
- `task combine image.png audio.mp3 -o video.mp4` (heterogeneous)
- FEA DSL shortcuts: `--dotless-i`, `--anchor`, `--attach`, etc.
- `task map font` (variable-font axis control)
- Folder listing with `--first / --last / --sort`
