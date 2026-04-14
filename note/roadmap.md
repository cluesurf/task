# Roadmap

Open work. Pull requests welcome.

## Actions

- **archive / unarchive** — flesh out against `unar`, `atool`, `zip`,
  `patool`, `7z`.
- **minify** — css (`@csstools/csso`, see
  [benchmarks](https://github.com/GoalSmashers/css-minification-benchmark)),
  js (`@swc/core`, see
  [benchmarks](https://github.com/privatenumber/minification-benchmarks)).
  One backend first; multiple minifiers later behind the `tool` flag.
- **sanitize html** — `sanitize-html`; partial work under
  `code/call/sanitize/`.
- **format code** — black, clang-format, ktfmt, prettier, rustfmt,
  swift-format, shfmt, asmfmt, rubocop. Several already landed;
  config-file passthrough is still thin.
- **compile** — mostly done (c, cpp, rust, swift, wast).
- **spreadsheet conversion** — xlsx via `xlsx.js`.
- **disassemble binary** — `objdump`
  ([manpage](https://man7.org/linux/man-pages/man1/objdump.1.html),
  [demangle styles](https://unix.stackexchange.com/questions/763259/what-are-the-possible-objdump-demangle-styles)).
- **crypto** — wrap `node-forge`.
- **compress / decompress** — `fflate` for browser, native `zstd`
  + `gzip` for node. Browser side started under
  `code/call/archive/*/browser.ts`.

## Packaging

### Chocolatey

Missing coverage on Windows:

- swift, clang-format, rustfmt, asmfmt, shfmt, rubocop
- pip-installed tools (black, etc.)

Compare `load/choco/base.nuspec` with the `Dockerfile` for the full
gap. Build triggering is manual —
[choco package creation discord](https://discord.com/channels/778552361454141460/897088817293574154).

### Ubuntu

- Publish a `.deb` / apt repo. See
  [guide](https://earthly.dev/blog/creating-and-hosting-your-own-deb-packages-and-apt-repo/).

## Infrastructure

- Browser entrypoint (`code/browser.ts`) still eagerly loads some
  paths. Goal: per-action imports so tree-shaking is real.
- Codegen for the dispatch table — today some route entries are
  hand-written in `code/form/export/action/<verb>/node.ts`; the next
  step is walking the MESH to emit them automatically.
- Overload wall on the `Task` class itself (not just `TaskSurface`)
  so call-site inference narrows per input variant.
