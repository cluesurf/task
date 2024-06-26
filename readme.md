
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<h3 align='center'>@termsurf/task</h3>
<p align='center'>
  Common Actions Interface
</p>

<br/>
<br/>
<br/>

## Summary

_**Note**: This is pre-alpha software at this point, so many things might not work or be documented properly. Eventually things will work, but scope is large._

Task is a collections of common actions to perform in code. Here are some immediately helpful resources:

- [`ghcr.io/termsurf/task` Docker image](https://ghcr.io/termsurf/task)

The `task` JavaScript/TypeScript library has these features:

- CLI
- Programmatic Browser API (for where we can do browser tasks)
- Programmatic Node.js API (for everything)

## Installing the Library

1. Install OS-specific dependencies.
2. Then install `@termserf/base` node module.

### MacOS Installation

```bash
brew install termsurf/load/base
```

The source code for enabling this Homebrew cask is at [termsurf/homebrew-load](https://github.com/termsurf/homebrew-load/blob/make/Casks/base.rb).

To use `docx2pdf` you need to have the Microsoft Word app installed on your machine as well.

### Windows Installation

I tried wrapping this in a nice and clean choco package, but it was deemed not a good fit for the choco community, so have to install all these manually :/.

```bash
choco install libreoffice-fresh
choco install imagemagick
choco install fontforge
choco install ffmpeg
choco install miktex.install
choco install inkscape
choco install gifsicle
choco install golang
choco install python3
choco install rust
choco install ruby
choco install calibre
choco install unar
choco install maven
choco install llvm
choco install julia
choco install pandoc
choco install exiftool
choco install dart-sdk
choco install php
```

Not all tasks/subcommands are supported yet, see the [Choco TODO](https://github.com/termsurf/task#todo-choco).

The source code for enabling this Choco package is at [./load/choco](https://github.com/termsurf/task/tree/make/load/choco).

### Linux Installation

See the `Dockerfile` in this project.

### Docker Installation

```Dockerfile
FROM --platform=linux/amd64 ghcr.io/termsurf/task:latest
...
```

You can link to the Docker image at [`ghcr.io/termsurf/task`](https://ghcr.io/termsurf/task) like that above.

### Node Package Installation

With the native dependencies installed, you can install task globally to enable the CLI:

```bash
npm install -g @termsurf/task
yarn install -g @termsurf/task
pnpm install -g @termsurf/task
```

```bash
task convert png -O jpg -i image.png -o image.jpg
```

You can also install it locally to get access to the commands in TypeScript:

```bash
npm install @termsurf/task
yarn install @termsurf/task
pnpm install @termsurf/task
```

_Some of this is future code._

```ts
import task from '@termsurf/task'

test()

async function test() {
  // no remote server, just the bare basics.
  const result = await task.convert({
    input: { format: 'png', file: { path: 'image.png' } },
    output: { format: 'jpg', file: { path: 'image.jpg' } }
  })
  await task.open({
    format: 'window',
    input: result.output,
  })

  // using the remote server.
  task.code('api-key')

  const work = await task.convert({
    surf: true,
    work: true,
    input: { format: 'png', file: { path: 'image.png' } },
    output: { format: 'jpg', file: { path: 'image.jpg' } }
  })

  await task.wait(work)

  const output = await task.resolve(work)

  const explainer = await task.convert({
    explain: true,
    input: { format: 'png', file: { path: 'image.png' } },
    output: { format: 'jpg', file: { path: 'image.jpg' } }
  })

  await task.format({
    input: { format: 'c', file: { path: 'hello.c' } }
  })

  await task.upload({
    location: { service: 's3', bucket: 'my-bucket' },
    input: { file: { path: 'hello.jpg' } },
    output: { file: { path: 'foo/image.jpg' } }
  })

  await task.download({
    location: { service: 's3', bucket: 'my-bucket' },
    reference: { file: { path: 'hello.jpg' } },
    output: { file: { path: 'foo/image.jpg' } }
  })

  await task.archive({
    input: { path: 'hello.jpg' },
    output: { format: 'zip', file: { path: 'foo/image.jpg' } }
  })
}
```

```
-f, --format of logs
json, json:pretty, plain, color
-i, --input-file-path
-o, --output-file-path
-W, --work (return work instead of output)
-S, --surf (use http API)
-E, --show (explain the command)
-s, --syntax

task resize --width --height --left --right --top --bottom
task optimize gif --scale 0.5 --color-count 16 --lossy=80
```

Having it installed locally, you can still use the CLI as well like:

```bash
pnpm run task convert -I png -O jpg -i image.png -o image.jpg
```

## Tests

```bash
./test/cli.sh
```

<img src='https://github.com/termsurf/task/blob/make/view/test-line.gif?raw=true' />

## Development

This codebase is built around TypeScript, Node.js/Browser, pnpm, and zod for parsing JSON input. All central functions should have an object passed as input, which zod parses and validates. We automatically generate the zod types using `pnpm tsx make`, which reads from `code/**/source.ts` for a bunch of "type" definitions written in JavaScript/JSON, and it then takes those definitions and generates TypeScript types and zod parsers. This way we don't have to write 2 or 3 times the same type definition (once in TypeScript, once in zod, once for an API somewhere else, etc.), you just write the source types, and it generates the types from that.

Then there are 3 parts:

1. Node.js API
2. CLI
3. Browser API (not really started yet)

The Node.js API is all Promise based, using the object input pattern. The CLI wraps that Node.js interface and logs some stuff to the terminal, not too much.

To setup the command locally, just do `pnpm link -g`.

### Key Commands

```bash
pnpm install # install the packages to get prettier/eslint autocomplete in vscode!
pnpm tsx make # regenerate the typescript and zod files frouce source.ts files.
pnpm test # if you want to play around with the test commands, it's not finished yet.
```

That's it! When you run `pnpm tsx make`, it regenerates the types in `code/type/*.ts`. You don't really have to pay much attention to those, but if you have VSCode and the prettier/eslint stuff setup (should be configured after `pnpm install`, if not, let me know), then you can start typing the type name in some file and it will autoimport it for you. Nice stuff.

### Key Files

All the code lives in the `code` folder, that plus the `make` folder has a command.

```bash
# where type definitions are specified, used to generate typescript and zod files
code/action/**/source.ts
# node and browser compatible code
code/action/**/shared.ts
# node.js only code
code/action/**/node.ts
# browser only code
code/action/browser.ts
```

Call in browser.

- if remote
  - file.path must be remote
  - file.content can exist
  - file.sha256 must exist if content exists
- if not remote
  - file.path must be remote
    - fetch file through server
  - file.content can exist
  - file.sha256 not necessary

```ts
import {
  ConvertFontWithFontForgeBrowserInput,
  ConvertFontWithFontForgeBrowserInputParser,
  ConvertFontWithFontForgeBrowserLocalInput,
  ConvertFontWithFontForgeBrowserOutputParser,
  ConvertFontWithFontForgeBrowserRemoteInput,
} from '~/code/type/index.js'
import { buildRequestToConvert } from '../shared.js'
import { resolveWorkFileAsBlob } from '~/code/tool/shared/work.js'
import kink from '~/code/tool/shared/kink.js'

export async function convertFontWithFontForgeBrowser(
  source: ConvertFontWithFontForgeBrowserInput,
) {
  const input = ConvertFontWithFontForgeBrowserInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertFontWithFontForgeBrowserRemote(input)
    default:
      return await convertFontWithFontForgeBrowserLocal(input)
  }
}

export async function convertFontWithFontForgeBrowserRemote(
  input: ConvertFontWithFontForgeBrowserRemoteInput,
) {
  const request = buildRequestToConvert(input)
  const content = await resolveWorkFileAsBlob(request)

  return ConvertFontWithFontForgeBrowserOutputParser().parse({
    file: {
      content,
    },
  })
}

export async function convertFontWithFontForgeBrowserLocal(
  input: ConvertFontWithFontForgeBrowserLocalInput,
) {
  throw kink('task_not_implemented', {
    task: 'convertFontWithFontForgeBrowserLocal',
  })
}
```

Call in nodejs.

- if remote
  - file.path can be local or remote
  - file.content can exist
  - file.sha256 must exist if content exists
- if not remote
  - if external
    - file.path must be remote
    - file.content can exist
    - file.sha256 if content exists
  - if not external
    - file.path can be local or remote
    - file.content can exist
    - file.sha256 if content exists

```ts
import {
  ConvertFontWithFontForgeNodeInput,
  ConvertFontWithFontForgeNodeInputParser,
  ConvertFontWithFontForgeNodeOutputParser,
  ConvertFontWithFontForgeNodeLocalInternalInput,
  ConvertFontWithFontForgeNodeLocalExternalInput,
  ConvertFontWithFontForgeNodeLocalInputParser,
  ConvertFontWithFontForgeNodeRemoteInput,
  ConvertFontWithFontForgeNodeClientInputParser,
} from '~/code/type/index.js'
import { buildCommandToConvertFontWithFontForge } from './shared.js'
import { runCommandSequence } from '~/code/tool/node/command.js'
import {
  resolveInputForConvertLocalNode,
  resolveInputForConvertRemoteNode,
} from '../tool/node.js'
import { extend } from '~/code/tool/shared/object.js'
import { buildRequestToConvert } from '../shared.js'
import { resolveWorkFileNode } from '~/code/tool/node/request.js'

export async function convertFontWithFontForgeNode(
  source: ConvertFontWithFontForgeNodeInput,
) {
  const input = ConvertFontWithFontForgeNodeInputParser().parse(source)

  switch (input.handle) {
    case 'remote':
      return await convertFontWithFontForgeNodeRemote(input)
    case 'external':
      return await convertFontWithFontForgeNodeLocalExternal(input)
    default:
      return await convertFontWithFontForgeNodeLocalInternal(input)
  }
}

async function convertFontWithFontForgeNodeLocalExternal(
  source: ConvertFontWithFontForgeNodeLocalExternalInput,
) {
  const input = await resolveInputForConvertLocalNode(source)
  return await convertFontWithFontForgeNodeLocal(input)
}

async function convertFontWithFontForgeNodeLocalInternal(
  source: ConvertFontWithFontForgeNodeLocalInternalInput,
) {
  const input = await resolveInputForConvertLocalNode(source)
  return await convertFontWithFontForgeNodeLocal(input)
}

export async function convertFontWithFontForgeNodeRemote(
  source: ConvertFontWithFontForgeNodeRemoteInput,
) {
  const input = await resolveInputForConvertRemoteNode(source)
  const clientInput =
    ConvertFontWithFontForgeNodeClientInputParser().parse(
      extend(input, { handle: 'client' }),
    )

  const request = buildRequestToConvert(clientInput)
  await resolveWorkFileNode(request, input.output.file.path)

  return ConvertFontWithFontForgeNodeOutputParser().parse({
    file: {
      path: input.output.file.path,
    },
  })
}

export async function convertFontWithFontForgeNodeLocal(input) {
  const localInput =
    ConvertFontWithFontForgeNodeLocalInputParser().parse(input)

  const sequence =
    await buildCommandToConvertFontWithFontForge(localInput)

  await runCommandSequence(sequence)

  return ConvertFontWithFontForgeNodeOutputParser().parse({
    file: {
      path: localInput.output.file.path,
    },
  })
}
```

### Task Organization

Each task in Node.js basically starts from one of the top simple action methods:

- `compile`
- `format`
- `convert`
- etc.

First it takes the `input` from the top-level call, and parses the input and passes the parsed input to the implementation task like `convertImageWithImageMagick`. Then that function checks for the `surf` argument, and if present, it branches to make a remote API call against `task.surf`. This serializes all local file paths into readable streams for upload, but keeps remote file paths unchanged. No further input parsing occurs after the first two top-level parsings.

If the `surf` parameter is not present, then it branche into the "local" API call, to the file system or a system command. So we have basically:

```
convert(source)
  input = parse(source)
  convertImageWithImageMagick(input)
    if input.surf
      convertImageWithImageMagickRemote(input)
        request = buildRequestToConvertWithImageMagickRemote(input)
        if input.show
          return request
        return makeRequest(request)
    else
      convertImageWithImageMagickLocal(input)
        command = buildCommandToConvertWithImageMagickLocal(input)
        if input.show
          return command
        return runCommand(command)
```

The remote method such as `convertImageWithImageMagickRemote` converts the local file paths to streams, and updates some input properties. Likewise, `convertImageWithImageMagickLocal` takes the input and converts some file data to local paths.

If the top-level command gets a `show` property, then it returns the `buildX` result instead. The top-level `code` property is to pass an auth token to requests.

The functions are stored in different places:

- `convert`: `code/action/convert/node.ts`
- `convertInternal`: `code/action/convert/node.ts`
- `convertImageWithImageMagick`: `code/action/convert/image/node.ts`
- `convertImageWithImageMagickRemote`: `code/action/convert/image/node.ts`
- `convertImageWithImageMagickLocal`: `code/action/convert/image/node.ts`
- `buildRequestToConvertWithImageMagickRemote`: `code/action/convert/image/shared.ts`
- `buildCommandToConvertWithImageMagickLocal`: `code/action/convert/image/shared.ts`
- `convert_image_with_image_magick`: `code/action/convert/image/source.ts`

In addition, it is actually called `convertInternal`, beccause of the way we need a TypeScript interface to everything with `convert` and under the hood it uses the parser with `convertInternal`. Then there are "source" types for defining type definitions for zod and TypeScript.

### Adding a new Task

To add a new task, just place it in either of the shared/no/browser folders, and add a source type definition for the input. Run `pnpm tsx make` to generate the types. Then just write the code to implement the command. If the command invokes a CLI tool, you can create two functions:

1. Build the command.
2. Run the command.

The building part just creates an array of CLI arguments. The Run command takes those args and runs them and interprets any CLI output if there is some.

There are some basic tests against files in the `test` directory, just manual tests pretty much at the moment.

You don't need to run Docker to develop this, you can just install the tools on your computer to develop locally.

### Choco

To trigger this build and publishing, the build needs to be run manually.

- [Choco package creation discord](https://discord.com/channels/778552361454141460/897088817293574154)

## TODO

- add unarchive commands
  - see `unar`, `atool`, `zip`, `patool`, and `7z` CLI tool docs
- add archive creation commands
  - same tools as unarchiving
- add minify commands
  - css: https://github.com/css/csso [benchmarks](https://github.com/GoalSmashers/css-minification-benchmark)
  - js: probably `@swc/core` from [here](https://github.com/privatenumber/minification-benchmarks?tab=readme-ov-file)
  - just use the docs to define the input option types. If it's not a command, just define a function with the input types and call the library function.
  - could support multiple minifiers later.
- sanitize html command (started this one, just search for "sanitize")
  - https://www.npmjs.com/package/sanitize-html
- add format code commands
  - black for python
  - config files for ktfmt and clang-format
  - prettier API options for javascript and others
  - etc.
- add compile commands (these are mostly done)
- add spreadsheet conversion commands
  - xlsx.js API
- add disassemble command
  - `objdump` CLI: https://man7.org/linux/man-pages/man1/objdump.1.html
    - https://unix.stackexchange.com/questions/763259/what-are-the-possible-objdump-demangle-styles
- add crypto commands
  - see the `node-forge` package APIs
- add decompress commands
  - see the `fflate` package APIs, started in `code/action/archive/loc/browser.ts`
- add compress commands
  - fflate

### TODO (Choco)

- add support for
  - swift
  - clang-format
  - rustfmt
  - asmfmt
  - shfmt
  - the pip installed commands
  - rubocop

Compare `load/choco/base.nuspec` with the `Dockerfile` to see all what's missing. If you know how to install those, please feel free to add.

### TODO (Ubuntu)

- create an [ubuntu package](https://earthly.dev/blog/creating-and-hosting-your-own-deb-packages-and-apt-repo/)

## License

MIT

## TermSurf

This is being developed by the folks at [TermSurf](https://term.surf), a
California-based project for helping humanity master information and
computation. Find us on [Twitter](https://twitter.com/termsurf),
[LinkedIn](https://www.linkedin.com/company/termsurf), and
[Facebook](https://www.facebook.com/termsurf). Check out our other
[GitHub projects](https://github.com/termsurf) as well!
