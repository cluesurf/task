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

## Archive

```sh
task archive --tool tar -i ./src -O tar.gz -o dist/src.tar.gz
```

## Check

```sh
task check report.pdf
```

## Combine

```sh
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
```

## Compress

```sh
task compress etch.ttf                  # → font, writes sibling .woff2
task compress photo.jpg -o small.jpg -q 50
task compress song.wav  -o song.mp3  -b 128k
task compress clip.mov  -o clip.mp4  --crf 28
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
task convert archive  -I zip  -O tar.gz -i in.zip   -o out.tar.gz
task convert font     -I ttf  -O woff  -i etch.ttf  -o etch.woff
task convert time     --input 2026-04-14T12:00:00Z --output-format unix
task convert unit     --value 100 --from kg --to lb
```

## Copy

```sh
task copy ssh-key prod    # → clipboard (pbcopy / clip / wl-copy / xclip)
```

## Crop

```sh
task crop paper.pdf -o paper.trimmed.pdf --margin 20
```

## Disassemble

```sh
task disassemble binary -i a.out
```

## Download

```sh
task download hugging-face --repo bert-base-uncased -o models/bert
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

## Extract

```sh
task extract src.tar.gz -o src/
task extract doc.pdf    -o pages.pdf --pages 1-3
task extract etch.ttf   -O ttx
task extract etch.ttf   -O fea -o etch.features.ttx
```

## Flip

```sh
task flip photo.png -o mirrored.png --horizontal
task flip photo.png -o flipped.png  --vertical
```

## Format

```sh
task format main.s
task format main.c
task format main.py
task format main.rs
task format Main.swift
```

## Generate

```sh
task generate hash   -i file.bin --algorithm sha256
task generate qrcode -t "https://example.com" -o qr.png
task generate string --length 32 --kind base32
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
task highlight paper.pdf -o paper.marked.pdf -t "important"
task highlight -i paper.pdf -o paper.marked.pdf -t "important"
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

# processes / network / system
task inspect process 1234
task inspect process 1234 -s children,port,file
task inspect network                              # summary
task inspect network example.com -s dns:A,MX,TXT
task inspect system
task inspect system -s memory,disk
```

## List

```sh
task list process                        # all processes
task list process --port 3000            # who owns that port
task list process --text node            # substring match
task list process --user lance
task list process --top memory
task list process --sort cpu --direction descending
task list process --group name           # aggregate by name
task list process --layout tree          # full process tree
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
task make ssh-key prod --comment "lance@laptop"
task make ssh-key prod --host 1.2.3.4 --user ubuntu  # key + config
```

## Mark

```sh
task mark pdf -i paper.pdf -o paper.marked.pdf --highlight "important"
# prefer the top-level form:
task highlight paper.pdf -o paper.marked.pdf -t "important"
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
task remove metadata photo.jpg            # EXIF / XMP / ID3 strip
task remove metadata song.mp3             # routes to ffmpeg for mp3/wav
task remove audio    clip.mp4 -o clip.silent.mp4
task remove ssh-key  prod
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

## Scan

```sh
task scan ssh github.com              # ssh-keyscan
task scan ssh github.com -t ed25519
```

## Search

```sh
task search --query "TODO" --path src/
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

---

## End-to-end workflows

### SSH setup

```sh
task make ssh-key prod --host 1.2.3.4 --user ubuntu  # key + config
task push ssh-key prod prod                          # install on remote
task scan ssh   prod                                 # read host keys
task test ssh   prod
task open ssh   prod

task add ssh work --host 10.0.0.5 --user lance --key ~/.ssh/work
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

---

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

- Filter DSL: `task list process --filter "memory > 500mb"`
- Aggregation shortcuts: `--show cpu:sum`, `--show memory:sum`
- Ranked fuzzy search (fuse.js) — `--text` is substring match today
- Font metadata updates: `task update font --name/--family/--style`
- `task combine image.png audio.mp3 -o video.mp4` (heterogeneous)
- `task convert video.mp4 --fps 30` (knob exists on the schema as
  `--frame-rate`; `fps` alias pending)
- FEA DSL shortcuts: `--dotless-i`, `--anchor`, `--attach`, etc.
- `task map font` (variable-font axis control)
- Folder listing with `--first / --last / --sort`
