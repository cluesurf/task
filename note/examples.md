# Examples

Representative calls for each verb. Signatures and supported format
pairs expand as more backends land — check the generated `TaskSurface`
interface in `code/form/export/node.ts` for the current list.

## Construct

```ts
import Task from '@cluesurf/task'

const task = new Task()
// with a remote backend + API key
const remote = new Task({ host: 'https://task.surf', code: 'API-KEY' })
```

## convert

```ts
// png → jpg via imagemagick (picked automatically)
await task.convert({
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})

// docx → pdf; caller can force a specific tool when multiple support the pair
await task.convert({
  tool:   'libre-office',
  input:  { format: 'docx', file: { path: 'a.docx' } },
  output: { format: 'pdf',  file: { path: 'a.pdf'  } },
})

// folder-tree parquet → jsonl
await task.convert({
  input:  { format: 'parquet', directory: { path: 'dump/' } },
  output: { format: 'jsonl',   directory: { path: 'dump.jsonl/' } },
})
```

## format

```ts
await task.format({
  input: { format: 'python', file: { path: 'hello.py' } },
})
```

## archive / extract

```ts
await task.archive({
  input:  { path: 'folder/' },
  output: { format: 'zip', file: { path: 'folder.zip' } },
})

await task.extract({
  input:  { format: 'zip', file: { path: 'folder.zip' } },
  output: { directory: { path: 'folder/' } },
})
```

## upload / download

```ts
await task.upload({
  location: { service: 's3', bucket: 'my-bucket' },
  input:    { file: { path: 'a.jpg' } },
  output:   { file: { path: 'foo/a.jpg' } },
})

await task.download({
  location:  { service: 's3', bucket: 'my-bucket' },
  reference: { file: { path: 'foo/a.jpg' } },
  output:    { file: { path: 'a.jpg' } },
})
```

## Modes

Every verb accepts three optional control flags on the input:

- `remote: true` — POST to `host`, runs on the remote task.surf server.
- `work: true` — return a `Work` handle immediately. Pair with
  `task.wait(work)` + `task.resolve(work)` to block and fetch later.
- `explain: true` — return the resolved command/plan instead of running it.

```ts
const plan = await task.convert({
  explain: true,
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})
```

## CLI

Every verb is also exposed from the shell:

```sh
task convert image --input a.png --output a.jpg
task format python --input hello.py
task archive --format zip --input folder/ --output folder.zip
task resize --width 512 --input a.png --output a-small.png
task optimize gif --scale 0.5 --color-count 16 --lossy 80
```

Common CLI flags:

```
-i, --input-file-path
-o, --output-file-path
-I, --input-format
-O, --output-format
-W, --work            return a work handle instead of output
-R, --remote          use the HTTP API
-E, --explain         print the resolved command/plan
-f, --format          log format: json, json:pretty, plain, color
```
