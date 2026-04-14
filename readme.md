<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/cluesurf/task/blob/make/view/flame.svg?raw=true' height='256'>
</p>

<h3 align='center'>@cluesurf/task</h3>
<p align='center'>
  A Function Registry
</p>

<br/>
<br/>
<br/>

> Pre-alpha. Scope is large. Expect rough edges.

## What it is

One library, three surfaces:

- **CLI**: `task convert image.png image.jpg`
- **Node API**: every action, full filesystem / child-process access
- **Browser API**: the subset that works in the browser, with remote fallback

Every action takes a single object and returns a `Promise`.
Dispatch on input / output format picks the right backend
automatically: ImageMagick for `png:jpg`, ffmpeg for video,
pandoc for documents, fontTools for fonts, qpdf for PDFs, and so
on.

## Install

```sh
# node module (CLI + library)
pnpm add -g @cluesurf/task

# or inside a project
pnpm add @cluesurf/task
```

Task shells out to native tools (ffmpeg, ImageMagick, pandoc,
fontTools, qpdf, HarfBuzz, ...). Install them per your OS: see
[note/install.md](./note/install.md).

Prebuilt container with everything baked in:

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/cluesurf/task:latest
```

## Use

```ts
import Task from '@cluesurf/task'

const task = new Task()

const out = await task.convert({
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})
```

Remote execution against a hosted task server:

```ts
const task = new Task({ host: 'https://example.com', code: '<bearer>' })

const work = await task.convert({
  remote: true,
  work:   true,
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})

await task.wait(work)
const output = await task.resolve(work)
```

## CLI

Every verb understands the same three invocation shapes:

```sh
# shorthand: extension routes to the subcommand, 2-positional convert
task convert a.png a.jpg
task compress song.wav -o song.mp3
task trim clip.mp4 -o cut.mp4 -s 10 -e 30
task inspect report.pdf
task highlight paper.pdf -o marked.pdf -t "important"

# explicit
task convert image -I png -O jpg -i a.png -o a.jpg
task format python -i hello.py
task archive --tool zip -i folder/ -o folder.zip
```

### What it can do

| Area         | What you can do                                                                             |
| ------------ | ------------------------------------------------------------------------------------------- |
| Media        | Convert, compress, trim, rotate, flip, resize, normalize, pad, split, combine media files  |
| Fonts        | Inspect, subset, compress to WOFF2, shape text, render previews, round-trip TTX, apply FEA |
| Documents    | Inspect, slice, crop, reorder pages, highlight, validate PDFs                               |
| Text         | Inspect encoding / line endings, convert character encoding, normalize EOL                  |
| Code         | Compile (C / C++ / Rust / Swift / WASM text), format, parse, sanitize, disassemble          |
| Generate     | Hashes, QR codes, random strings                                                            |
| Environment  | Read and write `.env` keys without editing the file by hand                                 |
| SSH          | Manage `~/.ssh/config`, generate / push / copy keys, scan host keys, test and open sessions |
| Processes    | List, search, filter, group, top, tree, live-watch, inspect, or kill running processes      |
| Network      | Ping, HTTP latency, traceroute, DNS lookup, show IP, interfaces, connections, routes        |
| System       | CPU, memory, disk, uptime snapshot                                                          |

### Global flags (every verb)

| flag              | meaning                                                         |
| ----------------- | --------------------------------------------------------------- |
| `-f, --format`    | `pretty` (default), `text`, `plain`, `json`, `json:pretty`      |
| `-h, --help`      | Tinted help layout for the current path                         |
| `-v, --version`   | Print the installed `@cluesurf/task` version                    |
| `--explain`       | Print the native commands the verb would run, without executing |
| `--log [pattern]` | Stream subprocess output. Glob filter (`"*"` = all)             |

### Standard short flags

`-i` input path, `-o` output path, `-I` input format, `-O` output
format, `-t` text, `-b` bitrate, `-q` quality, `-d` degree,
`-w` width, `-s` start / show / scope, `-e` end, `-c` crop / count,
`-F` fea path. See [note/commands.md](./note/commands.md) for the
full matrix plus one illustrative example per verb.

### Process listing highlights

```sh
task list process --top memory
task list process --name chrome          # case-insensitive substring
task list process --name "*ode"          # glob
task list process --filter "memory > 500mb and cpu > 10%"
task list process --layout tree          # subtree memory rollups
task list process --layout tree --name node --show children
task list process --show memory,cpu,user
task list process --sort cpu --direction desc --limit 50 --page 2
```

`--layout tree` paints memory in purple, CPU in blue, branch
glyphs in gray, process names in bright white. Tree filters keep
every match's ancestor chain visible; `--show children` brings
descendants along too.

## Docs

- [Commands](./note/commands.md): one example per verb.
- [API design](./note/api.md): `Task` class, dispatch, overloads,
  remote / local / explain modes.
- [Install](./note/install.md): native tools per OS, Docker,
  Homebrew, Chocolatey.
- [Examples](./note/examples.md): full workflows.
- [Contributing](./note/contributing.md): repo layout, codegen,
  adding a new action.
- [Roadmap](./note/roadmap.md): what's missing.

## Tests

CLI suites live under `test/console/*.sh` and share the scaffolding
in `test/lib.sh`:

```sh
# run one
bash test/console/font.sh

# run everything
bash test/console/all.sh
```

Programmatic API tests (Node + browser) run via `pnpm test` per
the usual TypeScript pipeline.

<img src='https://github.com/cluesurf/task/blob/make/view/test-line.gif?raw=true' />

## License

MIT

## ClueSurf

Made by [ClueSurf](https://clue.surf), meditating on the universe ¤.
[YouTube](https://youtube.com/@cluesurf) ·
[X](https://x.com/cluesurf) ·
[Instagram](https://instagram.com/cluesurf) ·
[Substack](https://cluesurf.substack.com) ·
[Facebook](https://facebook.com/cluesurf) ·
[LinkedIn](https://linkedin.com/company/cluesurf) ·
[GitHub](https://github.com/cluesurf)
