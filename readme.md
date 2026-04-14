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

Every action takes a single object, returns a `Promise`. Dispatch on
input/output format picks the right backend automatically (imagemagick
for `png:jpg`, ffmpeg for video, pandoc for documents, ...).

## Install

```sh
# node module (for CLI + library)
pnpm add -g @cluesurf/task

# or inside a project
pnpm add @cluesurf/task
```

Task shells out to native tools (ffmpeg, imagemagick, pandoc, ...).
Install those per your OS: see [note/install.md](./note/install.md).

Prebuilt container with everything:

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

Remote execution against a domain:

```ts
const task = new Task({ host: 'https://example.com', code: '<bearer-token>' })

const work = await task.convert({
  remote: true,
  work:   true,
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})

await task.wait(work)
const output = await task.resolve(work)
```

CLI (installed globally). Every verb accepts the same shorthand:
`task <verb> <file>` picks the right subcommand from the file's
extension, and for convert you can chain two positionals.

```sh
# shorthand — extension routes to the subcommand
task convert a.png a.jpg               # → convert image (2 positionals)
task compress song.wav -o song.mp3     # → compress audio
task trim clip.mp4 -o cut.mp4 -s 10 -e 30
task inspect report.pdf
task highlight paper.pdf -o marked.pdf -t "important"

# explicit form still works
task convert image -i a.png -o a.jpg
task format python -i hello.py
task archive --format zip -i folder/ -o folder.zip
```

See [note/commands.md](./note/commands.md) for one example per verb
and [note/examples.md](./note/examples.md) for full workflows.

## What it can do

Cross-cutting verbs across media, fonts, documents, text, code,
processes, SSH, and networks:

- **Media** — `convert`, `compress`, `trim`, `rotate`, `flip`,
  `resize`, `optimize`, `normalize`, `pad`, `split`, `combine`,
  `remove audio`
- **Fonts** — `inspect`, `subset`, `compress`, `shape`, `render`,
  `dump` (TTX round-trip), `extract` (TTX / GSUB+GPOS), `update`
  (compile .fea into GSUB/GPOS)
- **Documents / PDFs** — `inspect`, `slice`, `crop`, `modify`
  (pages), `mark` / `highlight`, `validate`
- **Text** — `inspect` (type / mime / encoding / eol), `set
  encoding`, `set eol`
- **Code** — `compile` (c/cpp/rust/swift/wast), `format`,
  `parse`, `sanitize`, `disassemble`
- **Generate** — `generate hash`, `generate qrcode`,
  `generate string`
- **Env** — `set environment`, `get environment`
- **SSH** — `add`, `set`, `get`, `list`, `rm`, `test`, `open`
  entries in `~/.ssh/config`; `make / get / push / copy / remove
  ssh-key`; `scan ssh <host>`; `edit ssh`
- **Processes / ports** — `list process`, `list port`, `list
  network connection|interface|route`, `inspect process`,
  `halt process | port`, `watch process`
- **Network** — `ping`, `measure <url>`, `trace route`,
  `inspect network`, `inspect <host> --show dns:A,MX,...`
- **System** — `inspect system --show cpu,memory,disk`

Every verb speaks four global flags: `-f / --format`
(pretty / text / json / json:pretty), `--help`, `--explain`
(print the underlying native command without running it), and
`--log [pattern]` (stream subprocess stdout/stderr, optionally
grep-filtered).

## Docs

- [API design](./note/api.md): `Task` class, dispatch, overloads, remote/local/explain modes.
- [Install](./note/install.md): native tools per OS, Docker, Homebrew, Chocolatey.
- [Examples](./note/examples.md): representative calls for every verb.
- [Contributing](./note/contributing.md): repo layout, codegen, adding a new action.
- [Roadmap](./note/roadmap.md): what's missing.

## Tests

```sh
./test/cli.sh
```

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
