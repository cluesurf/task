# Roadmap

The scope target: every common file / data / media operation a
developer reaches for, wrapped behind one consistent `task.<verb>(input)`
call. Each entry below points at the tool we'd shell out to (or a
library to embed) — the actual work is schema + routing, not writing
new algorithms.

Pull requests welcome.

## Actions

### archive / extract

- Flesh out coverage across `unar`, `atool`, `zip`, `patool`, `7z`,
  native `tar`, `rar`.
- Per-format flags (zstd level, 7z solid mode, deterministic output).
- Browser-side read-only `extract` via [`libarchive.js`](https://github.com/nika-begiashvili/libarchivejs).

### compile

- Mostly landed: `c`, `cpp`, `rust`, `swift`, `wast`.
- Add: `go`, `kotlin` (jvm + native), `zig`, `haskell` (ghc),
  `ocaml`, `dart`, `nim`, `crystal`, `v`, `tsc` (type-check only).
- WASM targets: `emcc`, `wasm32-wasi`, `wasm-pack` for rust.
- LLVM IR / bitcode pipelines (`opt`, `llc`) as a first-class
  sub-action so `compile → emit-ir → optimize → emit-asm` chains cleanly.

### convert

**image**
- Raster ↔ vector: `potrace`, `autotrace` for bitmap→svg;
  `rsvg-convert`, `inkscape` for svg→raster.
- RAW pipelines (`dcraw`, `darktable-cli`, `rawtherapee-cli`).
- HDR / Radiance `.hdr` ↔ `exr`.
- Animated: `gif` ↔ `apng` ↔ `webp` ↔ `mp4`.

**document**
- Ebook: `epub` ↔ `mobi` ↔ `azw3` ↔ `fb2` (`calibre`).
- Markup: `asciidoc` ↔ `rst` ↔ `markdown` ↔ `org` (`pandoc` already;
  add `asciidoctor` for the asciidoc side).
- Notebooks: `ipynb` ↔ `py`/`md`/`html` (`jupyter nbconvert`).
- Slides: `pptx` ↔ `pdf`, `md` ↔ reveal.js / marp.
- LaTeX pipelines: `tex` → `pdf` via `pdflatex`, `xelatex`, `lualatex`;
  `tex` → `html` via `pandoc` / `make4ht`.

**audio**
- Container + codec transcoding (`mp3`/`aac`/`ogg`/`opus`/`flac`/`wav`)
  via ffmpeg. First-class bitrate / VBR / channel flags.
- Music-source separation (vocal removal) via `demucs` or `spleeter`.
- MIDI → audio (`fluidsynth`), audio → MIDI (`spotify/basic-pitch`).

**video**
- Codec + container permutations via ffmpeg.
- HLS / DASH packaging (`shaka-packager`, `ffmpeg` HLS muxer).
- Frame extraction + thumbnail sheet generation.
- Subtitle ↔ format (`srt` ↔ `vtt` ↔ `ass`).

**text / data**
- Text encodings: utf-8 ↔ utf-16 ↔ latin-1 ↔ shift-jis; BOM on/off;
  line-ending normalisation (via `dos2unix`/`unix2dos` or inline).
- Structured data: `csv` ↔ `tsv` ↔ `json` ↔ `jsonl` ↔ `yaml` ↔
  `toml` ↔ `xml` ↔ `parquet` ↔ `arrow` ↔ `avro` ↔ `orc`
  (DuckDB handles most, `arrow` + `avrojs` for the rest).
- SQL dialect translate (`sqlglot`).

**code**
- Source-to-source: `babel`, `@swc/core`, `tsc`, `ts-node`,
  CoffeeScript, Pug/Jade, LiveScript.
- Migration transforms: `@codemod/*`, `jscodeshift`, `ast-grep`.

**units / time / color**
- Units: everything in `convert-units` (length/mass/volume/power/...).
- Time: timezone conversion, ISO/RFC/Unix epoch, human strings via
  `chrono-node` / `dayjs`.
- Color: rgb / hsl / hsv / lab / lch / oklch / hwb via `culori`.

### format

- Already: `python` (black), `rust` (rustfmt), `swift` (swift-format),
  `kotlin` (ktfmt), `ruby` (rubocop), `c`/`cpp` (clang-format).
- Add: `go` (gofmt), `java` (google-java-format),
  `shell` (shfmt), `sql` (sql-formatter), `assembly` (asmfmt),
  `html`/`css`/`js`/`ts` (prettier), `yaml`/`json` (prettier),
  `dart` (dart format), `haskell` (ormolu / fourmolu),
  `ocaml` (ocamlformat), `zig fmt`, `clang-tidy` as a format-ish pass.
- Config-file passthrough (`.prettierrc`, `rustfmt.toml`, etc.) needs
  a uniform `configFile?: string` input across all language variants.

### lint (new verb)

- `eslint` (js/ts), `ruff` (python), `clippy` (rust),
  `rubocop` (ruby), `golangci-lint` (go), `clang-tidy` (c/cpp),
  `shellcheck` (sh/bash), `hadolint` (Dockerfile),
  `stylelint` (css), `htmlhint` (html), `yamllint`, `jsonlint`,
  `markdownlint`, `protolint`, `sqlfluff`.
- Shared output shape: array of `{ file, line, col, rule, message, severity }`.

### test (new verb)

- Unified driver for `jest`, `vitest`, `mocha`, `pytest`, `cargo test`,
  `go test`, `swift test`, `xctest`, `rspec`, `phpunit`.
- Coverage report collection + format conversion
  (`lcov` ↔ `cobertura` ↔ `json`).

### extract

- Already: archive/tar/zip.
- Add: metadata (`exiftool`), frames (`ffmpeg`), audio from video
  (`ffmpeg -vn`), subtitles (`ffmpeg -c:s copy`), text from pdf
  (`pdftotext`), OCR from image/pdf (`tesseract`, `ocrmypdf`).

### edit (new verb — media manipulation)

- **video**: trim, concat, mix audio tracks, overlay image /
  watermark, blur region, crop, rotate/flip, speed change, reverse,
  stabilize (`vidstab`), color curves, LUTs (ffmpeg filter chain).
- **audio**: trim, concat, mix, fade in/out, loudness normalize
  (`ffmpeg` + `ebur128`), silence removal, pitch shift, time stretch.
- **image**: brightness/contrast, gamma, levels, curves, auto-orient
  via EXIF, red-eye, remove background (`rembg` / u2net), upscale
  (`real-esrgan`, `waifu2x`), denoise, palette quantize, dither.

### generate

- Already: hash, qrcode, string.
- Add: `uuid` (v4/v7), `nanoid`, `ulid`, `barcode` (`jsbarcode`),
  `placeholder-image`, `passphrase` (diceware), `lorem ipsum` /
  synthetic text, `faker` records (csv/json fixtures),
  `color palette` from image, `contact-sheet` from folder of images,
  `thumbnail-grid` from a video, `waveform-image` from audio
  (`audiowaveform`), `api-client` from OpenAPI
  (`openapi-generator`).

### inspect

- Already: color, metadata.
- Add: file-type detection (`file-type`), MIME sniffing,
  entropy / randomness score, codec + container probe
  (`ffprobe`, `mediainfo`), image dimensions & color profile,
  PDF outline / page count, font metrics, binary headers (`readelf`,
  `otool`, `dumpbin`), WASM module imports/exports (`wabt`),
  archive manifest without extracting.

### diff / compare (new verb)

- Text: GNU `diff`, `dwdiff` (word-level), `diff2html`.
- JSON: structural diff (`jsondiffpatch`).
- PDF: `diff-pdf`, `pdf-diff`.
- Image: perceptual diff (`pixelmatch`, `odiff`).
- Directory tree: count + hash walk.

### optimize

- Already: image (local, partial).
- Add: `oxipng`, `jpegoptim`, `mozjpeg`, `gifsicle`, `svgo`,
  `cwebp`, `avifenc`, `imagemin` plugins. Font subset via
  `pyftsubset` / `fonttools`. JS/CSS/HTML minify (already deps —
  wire through). PDF compress (`ghostscript`, `qpdf`). Video
  size-target presets.

### sanitize

- Already: html (partial).
- Add: markdown (strip scripts / suspicious links), SVG
  (`@mdn/browser-compat-data` rules + `domPurify`), sql injection
  guard (parameterise via tree-sitter parse), pii redact from text
  (regex + `presidio`), EXIF scrub on upload.

### validate

- Already: document (partial).
- Add: JSON Schema, Ajv CLI, YAML schema (`cfn-lint`-style),
  XML via DTD/XSD (`xmllint`), HTML (`html-validate`),
  CSS (`stylelint`), email (`validator.js`), URL,
  phone (`libphonenumber-js`), regex against sample strings,
  SQL parse (`sql-formatter` / `pglast`), spell check
  (`aspell`, `hunspell`, `cspell`).

### verify

- Already: image (partial).
- Add: checksum verify (sha256/512/blake3), gpg / minisign /
  `age` signature, X.509 cert chain, JWS / JWT, code-signing
  (macOS `codesign -v`, Windows `signtool`).

### resize / crop / slice

- Already landed for images / documents (partial).
- Add: smart crop (face / saliency detection — `smartcrop.js`),
  video crop/trim, audio slice by timestamp, pdf page extraction
  (already via crop — expose `slice` at page ranges), multi-page
  image split (`tiff` → `pngs`).

### remove

- Already: metadata.
- Add: audio tracks from video, subtitles, password from pdf,
  color profile, transparency, specific exif fields (`exiftool`
  per-tag).

### merge / split (new verb)

- Merge: pdfs (`qpdf`), videos (ffmpeg concat demuxer), audios,
  images → pdf / contact-sheet, folders.
- Split: pdf at page ranges, video at timestamps, audio at silence,
  csv / jsonl by row count or by column value.

### download / upload

- Already: hugging-face.
- Add: `s3`, `gcs`, `azure-blob`, `r2` (already), `ftp`, `sftp`,
  generic `http` with resume + checksum verify, `webdav`,
  `ipfs`, `magnet` / `torrent` (`webtorrent`).
- Auth: OAuth device flow, service accounts, signed-URL upload.

### scrape (new verb)

- Fetch + render via `puppeteer` / `playwright` / `jsdom`.
- Output modes: raw html, readability extract, full-page png / pdf,
  harvested links, har archive.
- RSS / Atom / sitemap crawler.

### disassemble

- Already: binary (partial).
- Add: demangle style flags for `objdump`, `llvm-objdump`,
  `radare2` /`rizin` scripted sessions, `ghidra` headless export
  (function list, call graph), wasm → wat (`wabt`), jvm `javap`,
  `.net` `ildasm`.

### encrypt / decrypt (new verb)

- Symmetric: `age`, `openssl`, `gpg --symmetric`.
- Asymmetric: `age -R`, `gpg`, `minisign`.
- File-level + stream-level variants.

### sign (new verb)

- gpg / minisign / `age` / `cosign` / `signify` detached + inline.

### transcribe (new verb)

- Audio/video → text via `whisper.cpp`, `vosk`, `whisper-api`.
- Timestamped JSON output + SRT/VTT sidecar.

### translate (new verb)

- `deepl`, `libretranslate`, `openai`, `google-translate`.
- Document-preserving translate (`pandoc` round-trip +
  paragraph-level LLM).

### summarize / extract-entities (new verb)

- LLM-backed: `openai`, `anthropic`, local via `llama.cpp`.
- Extract: tldr, keywords, entities, sentiment.

### embed (new verb)

- Text / image embedding via `openai`, `xenova/transformers`,
  `cohere`, `voyage`. Writes the vector + metadata to a sidecar
  (parquet / sqlite / qdrant / pinecone / pgvector).

### synthesize (new verb — inverse of transcribe)

- Text → speech via `piper`, `elevenlabs`, `openai`, `coqui-tts`.
- Image gen via local `sdxl` / `stable-diffusion.cpp`, or hosted
  APIs.

### backup / sync (new verb)

- Rsync-style directory mirror, with dry-run + checksum mode.
- `restic`, `borg`, `kopia` wrappers for snapshot-style backup.
- Git-based doc history extract.

### measure / benchmark (new verb)

- `hyperfine` (cli timing), `wrk` / `oha` / `vegeta` (http load),
  `ab` (apache bench), `iperf3` (network), `fio` (disk).
- Output: structured summary + p50/p95/p99 + CSV sidecar.

### database (new verb family)

- Dump: `pg_dump`, `mysqldump`, `sqlite3 .dump`, `mongodump`.
- Restore: the inverse.
- Schema diff: `migra` (pg), `dbmate diff`, `prisma migrate diff`.
- Data sample / anonymize.

### network / host-inspect (new verb)

- `dig` / `doggo`, `whois`, `traceroute`, `mtr`, `nmap` (local net
  only), `openssl s_client` for TLS inspect, ping with packet-loss
  summary, port scan of localhost only. Gated behind a safety flag
  so the library isn't accidentally turned into a scanner.

### ocr (new verb)

- `tesseract`, `ocrmypdf`, `paddleocr`. Language-pack selection +
  structured output (words with bounding boxes + confidence).

## Packaging

### Chocolatey

Missing coverage on Windows:

- swift, clang-format, rustfmt, asmfmt, shfmt, rubocop
- pip-installed tools (black, etc.)

Compare `load/choco/base.nuspec` with the `Dockerfile` for the full
gap. Build triggering is manual —
[choco package creation discord](https://discord.com/channels/778552361454141460/897088817293574154).

### Ubuntu / Debian

- Publish a `.deb` / apt repo. See
  [guide](https://earthly.dev/blog/creating-and-hosting-your-own-deb-packages-and-apt-repo/).

### Arch

- Publish an AUR package (`task-bin` or source-built `task`).

### Nix

- Flake output `packages.default` pulling every shell-out in via
  `buildInputs` so `nix run .#task` is self-contained.

## Infrastructure

- **Browser entrypoint** still eagerly loads some paths. Goal:
  per-action imports so tree-shaking is real.
- **Auto-generated dispatch tables** — today some route entries are
  hand-written in `code/form/export/action/<verb>/node.ts`; walk
  MESH at codegen time to emit them.
- **Task-class overload wall** — codegen emits overloaded methods on
  the `Task` class itself, not just on `TaskSurface`, so per-input
  return-type narrowing works at call sites without a cast.
- **Progress events** — long-running actions (`convert` large video,
  `embed` 100k docs) should emit a progress stream. Design:
  `AsyncIterable<ProgressEvent>` returned alongside the promise, or
  a callback on input.
- **Streaming I/O** — large files shouldn't require `path`; accept
  Node streams / `Blob` / async iterators uniformly.
- **Remote dispatch protocol** — nail down the task.surf wire format
  (input serialisation, file upload, progress, work-id resolution)
  and document it as a stable spec.
- **Sandboxing** — run shell-outs in a jail (landlock on Linux,
  sandbox-exec on mac, wasi/wasmtime where the tool exists as WASM).
- **Plugin system** — third parties can register new verbs / tools
  via a declared schema + handler pair, same as first-party actions.
- **GPU path** — when present, route video / image / embedding tasks
  through CUDA / Metal / Vulkan accelerated binaries.
- **Distributed work queue** — redis / postgres-backed queue so the
  same `task.convert({ remote: true })` call scales to N workers
  behind the scenes.
- **WebSocket progress push** — live updates from remote workers
  back to `task.wait(work)`.
- **Caching** — content-addressed output cache keyed on
  `(action, input-hash, tool-versions)`. Repeated identical calls
  skip execution and return the cached artifact.
