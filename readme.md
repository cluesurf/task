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

- **CLI** — `task convert png --input image.png --output image.jpg`
- **Node API** — every action, full filesystem / child-process access
- **Browser API** — the subset that works in the browser, with remote fallback

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
Install those per your OS — see [note/install.md](./note/install.md).

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

Remote execution against `task.surf`:

```ts
const task = new Task({ host: 'https://task.surf', code: 'API-KEY' })

const work = await task.convert({
  remote: true,
  work:   true,
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})

await task.wait(work)
const output = await task.resolve(work)
```

CLI (installed globally):

```sh
task convert image --input a.png --output a.jpg
task format python --input hello.py
task archive --format zip --input folder/ --output folder.zip
```

Or without installing, via `npx`:

```sh
npx @cluesurf/task convert image --input a.png --output a.jpg
npx @cluesurf/task format python --input hello.py
```

More examples: [note/examples.md](./note/examples.md).

## Docs

- [API design](./note/public-api-design.md) — `Task` class, dispatch, overloads, remote/local/explain modes.
- [Install](./note/install.md) — native tools per OS, Docker, Homebrew, Chocolatey.
- [Examples](./note/examples.md) — representative calls for every verb.
- [Contributing](./note/contributing.md) — repo layout, codegen, adding a new action.
- [Roadmap](./note/roadmap.md) — what's missing.

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
