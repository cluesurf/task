# `task` command reference

Every command is verb-first: `task <verb> [thing] [path-or-args]`.
Global flags work on every verb: `-f / --format` (`pretty` default,
`text`, `plain`, `json`, `json:pretty`), `-h / --help`, `--explain`
(print native commands without running), `--log [pattern]` (stream
subprocess output, optionally filtered).

Most verbs accept two invocation styles:

- `task <verb> <file> [options]` — positional fills the input; for
  edit-style verbs the same path also fills output (in-place edit)
  unless `-o <out>` is given.
- `task <verb> -i <in> -o <out> [options]` — explicit form. Pass
  the same path to both for in-place edits.

For verbs that operate on one file kind (compile, compress, trim,
rotate, flip, normalize, resize, optimize, subset, dump, shape,
render, update, convert, extract, slice, crop, mark, modify,
validate, verify, inspect, check, format), the subcommand can be
omitted — the kind is picked from the file's extension.

## Archive

```sh
task archive --tool tar --input-path ./src -O tar.gz \
  --output-file-path dist/src.tar.gz
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
# extension-inferred (preferred)
task compile hello.c     -o hello
task compile hello.cpp   -o hello
task compile main.rs     -o main
task compile main.swift  -o main
task compile mod.wat     -o mod.wasm

# or explicit language
task compile c     -i hello.c    -o hello
task compile cpp   -i hello.cpp  -o hello
task compile rust  -i main.rs    -o main
task compile swift -i main.swift -o main
task compile wast  -i mod.wat    -o mod.wasm
```

## Compress

```sh
task compress etch.ttf                 # → font, writes sibling .woff2
task compress etch.ttf -o dist/x.woff2 # explicit output
task compress photo.jpg --quality 80   # → image
task compress song.wav -o song.mp3 --bitrate 128k  # → audio
task compress clip.mov -o clip.mp4     # → video (libx264, CRF 28)
```

## Convert

```sh
task convert archive  -I zip  -O tar.gz -i in.zip     -o out.tar.gz
task convert data     -I csv  -O parquet -i data.csv  -o data.parquet
task convert document -I docx -O pdf     -i memo.docx -o memo.pdf
task convert font     -I ttf  -O woff    -i etch.ttf  -o etch.woff
task convert image    -I png  -O webp    -i icon.png  -o icon.webp
task convert time     --input 2026-04-14T12:00:00Z --output-format unix
task convert unit     --value 100 --from kg --to lb
task convert video    -I mov  -O mp4     -i clip.mov  -o clip.mp4
```

## Copy

```sh
task copy ssh-key prod   # → clipboard (pbcopy / clip / wl-copy / xclip)
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
task dump etch.ttf -o etch.ttx                    # font → TTX
task dump etch.ttf -o etch.name.ttx --tables name,OS/2
task dump etch.ttx -o etch.ttf                    # TTX → font
```

## Extract

```sh
task extract src.tar.gz -o src/                # archive
task extract doc.pdf    -o pages.pdf --pages 1-3
task extract etch.ttf   --format ttx           # font → TTX
task extract etch.ttf   --format fea -o etch.features.ttx
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
task format Main.kt
task format main.py
task format main.rb
task format main.rs
task format Main.swift
```

## Generate

```sh
task generate hash   -i file.bin --algorithm sha256
task generate qrcode --text "https://example.com" -o qr.png
task generate string --length 32 --kind base32
```

## Get

```sh
task get duration   song.mp3
task get ssh        prod
task get ssh-key    prod   # prints the .pub
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
task highlight paper.pdf -o paper.marked.pdf --text "important"
task highlight -i paper.pdf -o paper.marked.pdf --text "important"
```

## Inspect

```sh
task inspect report.pdf        # auto-routes to `inspect file`
task inspect song.mp3
task inspect etch.ttf
task inspect notes.txt         # shows type / mime / encoding / eol
task inspect process 1234
task inspect process 1234 --show children,port,file

# explicit subcommands
task inspect file     -i clip.mp4 -f json | jq .groups
task inspect color    -i image.png
task inspect metadata -i photo.jpg
```

PDF, image, audio, video, font, and text inputs each render a
key / value table. Text / unknown files fall back to libmagic
(`file`) for type + MIME plus a pure-JS detector for encoding
and line endings. Font tables include family, style, version,
ascent / descent, weight, glyph count, variable axes, and the
sfnt table list.

## List

```sh
task list process                       # all processes
task list process --port 3000           # who owns port 3000
task list process --text node           # fuzzy match
task list process --user lance
task list process --top memory
task list process --sort cpu
task list process --group name          # aggregate by name
task list process --layout tree         # full process tree
task list process 1234 --layout tree    # subtree from PID
task list process 1234 --show children

task list port                           # open TCP / UDP ports
task list port --status open
task list port --protocol tcp

task list ssh                            # all ~/.ssh/config entries
```

## Make

```sh
task make ssh-key prod
task make ssh-key prod --comment "lance@laptop"
task make ssh-key prod --host 1.2.3.4 --user ubuntu  # also adds ssh entry
```

## Mark

```sh
task mark pdf -i paper.pdf -o paper.marked.pdf --highlight "important"
# prefer the top-level form:
task highlight paper.pdf -o paper.marked.pdf --text "important"
```

## Modify

```sh
task modify doc.pdf -o doc.reordered.pdf --order 3,1,2
task modify doc.pdf -o doc.trimmed.pdf   --remove 2
```

## Normalize

```sh
task normalize song.mp3 -o normalized.mp3               # EBU R128 defaults
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

## Push

```sh
task push ssh-key prod prod                 # ssh-copy-id
task push ssh-key work ubuntu@10.0.0.5
```

## Remove

```sh
task remove metadata photo.jpg -o photo.clean.jpg
task remove audio    clip.mp4  -o clip.silent.mp4
task remove ssh-key  prod
```

## Render

```sh
task render font -i etch.ttf -o sample.png --text "Hello"
task render font -i etch.ttf -o sample.svg --text "Hello" --font-size 64
```

## Resize

```sh
task resize photo.jpg -o photo.small.jpg --width 800
```

## Rm

```sh
task rm ssh old-box
```

## Rotate

```sh
task rotate photo.png -o rotated.png --degree 90
task rotate clip.mp4  -o rotated.mp4 --degree 270
```

## Sanitize

```sh
task sanitize code -i notebook.py -o notebook.clean.py
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

task set environment API_KEY sk-test                       # positionals
task set environment DATABASE_URL postgres://... --file .env.prod

task set metadata song.mp3 --title "Song" --artist "Band" --album "Record"

task set ssh prod --user root
task set ssh prod --port 2222 --jump bastion
```

## Shape

```sh
task shape font -i etch.ttf --text "office"
task shape font -i etch.ttf --text "office" --features "-liga"
```

## Slice

```sh
task slice paper.pdf -o section.pdf --pages 4-10
```

## Subset

```sh
task subset etch.ttf -o etch.min.ttf --text "Hello world"
task subset etch.ttf -o etch.latin.woff2 \
  --unicodes U+0020-007F --flavor woff2
```

## Test

```sh
task test ssh prod           # BatchMode=yes reachability check
```

## Trim

```sh
task trim song.mp3 -o clip.mp3 --start 10 --end 30
task trim clip.mp4 -o cut.mp4  --start 00:00:10 --end 00:00:30
task trim clip.mp4 -o cut.mp4  --start 10 --end 30 --reencode
task trim photo.png -o tile.png --crop 100,100,400,400
```

## Update

```sh
task update etch.ttf --fea features.fea                        # font
task update etch.ttf --fea features.fea -o dist/etch.v2.ttf
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

## SSH — end-to-end

```sh
task make ssh-key prod --host 1.2.3.4 --user ubuntu  # key + config
task push ssh-key prod prod                          # install on remote
task test ssh prod
task open ssh prod                                   # interactive shell

task add ssh work --host 10.0.0.5 --user lance --key ~/.ssh/work
task get ssh work
task list ssh
task set ssh work --port 2222
task rm  ssh old
```

## Audio / video / image — end-to-end

```sh
task inspect song.mp3
task trim song.mp3 -o clip.mp3 --start 10 --end 30
task normalize clip.mp3 -o final.mp3
task set metadata final.mp3 --title "Clip" --artist "Me"

task inspect clip.mp4
task compress clip.mov -o clip.mp4
task trim clip.mp4 -o cut.mp4 --start 00:00:10 --end 00:00:30
task rotate cut.mp4 -o rot.mp4 --degree 90
task remove audio rot.mp4 -o silent.mp4

task inspect photo.png
task resize photo.png -o web.png --width 800
task flip   photo.png -o mirror.png --horizontal
task trim   photo.png -o tile.png --crop 100,100,400,400
task compress photo.png --quality 80
```

## Fonts — end-to-end

```sh
task inspect etch.ttf
task subset  etch.ttf -o etch.min.ttf --text "Hello world"
task compress etch.ttf -o dist/etch.woff2
task dump    etch.ttf -o etch.ttx         # inspect as XML
task update  etch.ttf --fea features.fea  # apply FEA
task shape   font -i etch.ttf --text "office"
task render  font -i etch.ttf -o sample.png --text "Hi"
```

## Text encoding / line endings

```sh
task inspect notes.txt           # type / mime / encoding / eol
task set encoding utf8 notes.txt
task set eol      lf   build.sh
```

---

## Global flags

| flag              | meaning                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `-f, --format`    | `pretty` (default), `text`, `plain`, `json`, `json:pretty`          |
| `-h, --help`      | Tinted help layout for the current path                             |
| `-v, --version`   | Print the installed `@cluesurf/task` version                        |
| `--explain`       | Print the native commands the verb would run, without executing     |
| `--log [pattern]` | Stream subprocess output. Pass a glob to filter (`"*"` = all)       |

## Help conventions

- Required options are marked with a red `*` in the first column.
- Choice values render as background-tinted pills; the default
  pill gets an extra green highlight.
- Read-style verbs (`inspect`, `get`, `check`, `shape`, `list`,
  `halt`) skip the ora spinner and print their content directly.
  Other verbs show a `- task <Doing>` / `✔ task <Done>` lifecycle
  on stderr.
- `task <verb> <path>` auto-routes to the right subcommand based
  on the file's extension.

## Error format

```
ERROR
<message>
run `task <verb> --help` to see available commands
```

## Platform notes

- SSH (`~/.ssh/config`, keys, push, copy, open, test) works on
  macOS, Linux, and Windows 10+. File modes `0o600` / `0o700` are
  only applied on POSIX; Windows uses NTFS ACLs on the standard
  `%USERPROFILE%\.ssh` path OpenSSH expects.
- Clipboard copy picks `pbcopy` / `clip` / `wl-copy` / `xclip`
  based on platform.
- `task push ssh-key` uses `ssh-copy-id` where available and
  falls back to `ssh <host> 'cat >> ~/.ssh/authorized_keys'`
  on Windows or minimal Linux installs.
- `task set encoding` requires `iconv` (default on macOS and most
  Linux distros; Windows needs Git for Windows or WSL).
