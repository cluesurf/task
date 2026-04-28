# Roadmap

The scope target: every common file / data / media / dev-loop
operation a developer reaches for, wrapped behind one consistent
`task.<verb>(input)` call. Each entry below points at the tool we'd
shell out to (or a library to embed) — the actual work is schema +
routing, not writing new algorithms.

Pull requests welcome.

---

## 10x Bang-for-Buck Priority

**If you can only ship ten things over the next month, these
are the ten that pay back the most daily.** Everything below
exists somewhere in the larger roadmap; this section is
priority ordering, not new scope.

See `note/idea/zero-config-build-runner-roadmap.md` in the
parent note tree for the full rationale and the per-tool
"what you learn" framing.

### Top 10, ordered (open work only — done items folded into the action table)

1. **`task find ast` via ast-grep** — syntactic search beats
   text grep once you taste it. Also unlocks
   `task refactor rename` (see below).
2. **`task log follow` + `task log grep`** via `lnav` / `rg` /
   `jq`. Ends "where did my log go" for good. Composes
   with `task highlight log` already shipped.
3. **`task git bisect auto`** — regression finder that feels
   like cheating. Ten lines over `git bisect run <cmd>`.
4. **`task watch file` via `fswatch` / `entr`**. Re-run on
   change is the core dev loop. Composes with every other
   command.

### Already shipped from the original Top 10

- `task query sql` via DuckDB
- `task inspect process` + `task inspect port`
- `task trace process` (strace / dtruss / procmon)
- `task profile cpu` (samply / 0x / clinic)
- `task fetch http` (extends existing fetch)
- `task inspect dns` (system resolver + Cloudflare zone-records mode)
- `task inspect tls` (openssl s_client + Node `X509Certificate`)
- `task scan env` (gitleaks / trufflehog)
- `task autocomplete` (zsh / bash / fish completion)

### Adjacent gaps not yet in the rest of the roadmap

- **`task query jq` / `task query yq`** — thin wrappers that
  pre-load the project's data conventions (field renames,
  date parsing). Not just `jq`-with-a-different-name.
- **`task refactor rename <old> <new>`** — ast-grep-backed,
  lands on top of `task find ast`. Project-wide type-safe
  rename in one command.
- **`task inspect binary`** — `nm` / `objdump` / `otool -L` /
  `readelf`. Covered partially under lint / disassemble.
  Worth a first-class home under `inspect/binary/<tool>/`.
- **`task compare bench`** — A/B two `hyperfine --export-json`
  runs and print the percentile deltas. Benchmarking is
  in the roadmap but the diff verb is not.
- **`task measure startup`** — hyperfine wrap specifically
  for cold-start time, one of the rarely-tracked metrics.

### Wrap-before-memorize loop

Adding to `task` is also the fastest way to internalize a
tool you don't know yet:

1. Find a tool you need but don't fully understand
   (`strace`, `dig`, `jq`, `duckdb`, `gh`, `ast-grep`).
2. Wrap its most-used invocation as
   `code/call/<verb>/<thing>/` with a typed `console.ts`.
3. Use the wrapper daily for two weeks.
4. Unwrap if you want — the skill is yours.

This is the **opposite** of aliasing. The wrapper forces
you to name the verbs, type the flags, and write docs.
After a year of this you'll have covered the tool hit-list
of a much more senior engineer without ever sitting down
to "learn" them.

### Placement discipline

Every verb above follows the repo convention:
`code/call/<verb>/<thing>/` with per-backend subdirs
(`trace/process/{strace,dtruss,procmon}`, `find/ast/<tool>`,
`query/sql/{duckdb,sqlite}`) when multiple tools implement
the same verb. `console.ts` (not `cli`). Four-branch
dispatch in `node.ts`. See `CLAUDE.md` for the full
checklist.

---

## Existing actions — what's still open

Done items are folded into the action table at the top of
`note/commands.md`. This list is only "what's missing."

### archive / unpack

- Per-format flags still patchy: zstd compression level, 7z solid
  mode, deterministic output (`SOURCE_DATE_EPOCH`).
- Browser-side read-only `unpack` via [`libarchive.js`](https://github.com/nika-begiashvili/libarchivejs).
- Frames from video, audio from video, subtitles, OCR'd text from
  image / pdf (`tesseract`, `ocrmypdf`).

### compile

- Done: `c`, `cpp`, `rust`, `swift`, `wast`, `go`, `kotlin-jvm`,
  `kotlin-native`, `zig`, `haskell`, `ocaml`, `dart`, `nim`,
  `crystal`, `v`, `tsc` (type-check only). WASM targets:
  `wasm-emcc`, `wasm-wasi`, `wasm-pack`. LLVM pipeline:
  `--emit ir|asm|object|exe` on c/cpp/rust/swift, plus
  `compile llvm-opt` and `compile llvm-llc` as standalone verbs.
  All wrap via `~/code/tool/shared/compile/command` so adding
  a new language is ~30 lines.

### convert

**image** — all open items shipped:
- Raster ↔ vector: `potrace`, `autotrace`, `rsvg-convert`, `inkscape`. **Done.**
- RAW pipelines: `dcraw`, `darktable-cli`, `rawtherapee-cli`. **Done.**
- HDR / Radiance `.hdr` ↔ `exr` via `radiance` + `pfstools`. **Done.**
- Animated: `gif` ↔ `apng` ↔ `webp` ↔ `mp4` via `gifsicle` /
  `apngasm` / `img2webp` / `ffmpeg`. **Done.**

**document**

Shipped:
- Ebook: `epub` ↔ `mobi` ↔ `azw3` ↔ `fb2` via `calibre`.
- Notebooks: `ipynb` ↔ `py` / `md` / `html` via `jupyter`.
- Slides: `md` → `pptx` / reveal.js via `marp` / `revealjs`.
- LibreOffice / pandoc / pdflatex / puppeteer / enscript
  backends per pair.

Open:
- `pptx ↔ pdf` round-trip beyond the LibreOffice path.

**audio / video**

Shipped (ffmpeg-backed):
- core convert / trim / resize / rotate / flip / normalize / pad
  / split / combine / merge across the common formats.

Open:
- First-class bitrate / VBR / channel flags surfaced as typed
  fields on the schemas.
- HLS / DASH packaging (`shaka-packager`, ffmpeg HLS muxer).
- Frame-extraction + thumbnail-sheet generation.
- Subtitle ↔ format (`srt` ↔ `vtt` ↔ `ass`).
- Music-source separation (`demucs`, `spleeter`).
- MIDI ↔ audio (`fluidsynth`, `basic-pitch`).

**text / data** — parsing + transformation

The driving idea: every time a developer reaches for an ad-hoc
`jq` or `yq` one-liner, a Python script with `csv`, `pandas`,
`BeautifulSoup`, or a regex-and-pray, there should be a single
typed `task convert data` (read-only structural conversion) or
`task parse data` (lossy / inferring parse into structured
records) or `task transform data` (mapping / reshaping) call.

Tabular ↔ tree pairs:

Shipped:
- `csv ↔ json` / `csv ↔ jsonl`
- `tsv ↔ csv` / `tsv ↔ json` / `tsv ↔ jsonl`
- `xlsx ↔ csv` / `xlsx ↔ json` (sheetjs / exceljs)
- `xlsx → parquet` via the existing parquet route
- `json ↔ yaml` / `yml → json`
- `parquet ↔ jsonl` (DuckDB)

Open:
- `json ↔ toml` / `yaml ↔ toml`
- `json ↔ xml` (configurable element / attribute mapping)
- `xml ↔ csv` (per-row XPath selector)
- `html ↔ json` — pull `<table>` / `<ul>` / `<dl>` /
  `[itemprop]` / opengraph / json-ld out of arbitrary pages.
  Backends: `cheerio` for selectors, `linkedom` for parser,
  `htmlq` for the CLI fallback.
- `html ↔ markdown` (`turndown`)
- `markdown ↔ html` / `markdown ↔ json` (AST via `remark`)
- `pdf ↔ json` — text + tables + bbox per page (`pdfjs-dist`,
  `tabula-java`, `camelot-py`).
- `pdf ↔ csv` — `--tables` mode (pull tabular regions only).
- `arrow ↔ parquet ↔ csv ↔ jsonl` (DuckDB or `parquet-tools`).
- `avro ↔ json` (`avsc`), `orc ↔ csv` (DuckDB).
- `protobuf ↔ json` (`.proto` + buffer in, json out — and back).
- `msgpack ↔ json` / `cbor ↔ json` / `bencode ↔ json`.
- `srt ↔ vtt ↔ ass` (already in subtitle plan).
- `dotenv ↔ json` / `ini ↔ json` / `properties ↔ json`.
- `csv ↔ sql-insert` — emit `INSERT INTO ...` statements with
  the right escaping per dialect.
- `csv ↔ ddl` — infer a table schema and print `CREATE TABLE`.

Parsing and transformation verbs (separate from convert because
they're lossy or interpret):

Shipped:
- `task parse entity <text>` — emails / urls / ips / phone / cc /
  ssn / mac / bitcoin / uuid (linkify-it / ip-regex /
  libphonenumber-js / validator).
- `task parse link <html|md>` — every href + alt text + rel
  (cheerio + linkify-it).
- `task parse table <pdf|html|docx>` — pull tables out of a
  document, emit CSV / JSON (cheerio / mammoth / pdfjs-dist).
- `task isolate image <pdf|docx|html>` — dump embedded images
  (pdfimages / mammoth / cheerio).
- `task transform data <in> --map / --jq / --sql` — declarative
  rename / pick / drop / coerce / default; jq-wasm pipelines;
  DuckDB SQL with `in` bound as the source.

Dialect / schema:

- SQL dialect translate (`sqlglot`).
- JSON-Schema infer from sample (already noted under "schema
  infer" browser section; should ship CLI too).
- TypeScript type infer from JSON sample (`quicktype`).
- Zod / Yup / Joi infer from JSON sample.

Implementation note: most of the above are pure-JS and can ship
to the browser entrypoint at the same time as the Node one. Use
the four-branch dispatch (per `note/action-pattern.md`) so the
remote and external paths come along for free.

**code**
- Source-to-source: `babel`, `@swc/core`, `tsc`, `ts-node`.
- Migration transforms: `@codemod/*`, `jscodeshift`, `ast-grep`.

### format

- Done: `assembly` (asmfmt), `clang` (c/cpp/objc), `clang-tidy`,
  `python` (black), `ruby` (rubocop), `rust` (rustfmt), `swift`
  (swift-format), `kotlin` (ktlint), `go` (gofmt), `java`
  (google-java-format), `shell` (shfmt), `sql` (sql-formatter),
  `dart` (dart format), `haskell` (ormolu), `ocaml` (ocamlformat),
  `zig` (zig fmt). Markup via prettier: `html`, `css`, `js`, `ts`,
  `yaml`, `json`, `markdown`. All wrap via
  `~/code/tool/shared/format/command` so a new entry is ~10 lines.
- Uniform `--config <path>` is wired via `FormatOptions.configFile`.
  `--check` (stdout / dry-run mode) on every formatter.

### lint (new verb)

- `eslint`, `ruff`, `clippy`, `golangci-lint`, `clang-tidy`,
  `shellcheck`, `hadolint`, `stylelint`, `htmlhint`, `yamllint`,
  `jsonlint`, `markdownlint`, `protolint`, `sqlfluff`.
- Shared output shape: `{ file, line, col, rule, message, severity }`.

### test (new verb)

- Unified driver for `jest`, `vitest`, `mocha`, `pytest`,
  `cargo test`, `go test`, `swift test`, `xctest`, `rspec`, `phpunit`.
- Coverage report collection + format conversion (`lcov` ↔
  `cobertura` ↔ `json`).

### inspect

Shipped:
- `inspect file` (per-format pretty table — pdf / image / audio
  / video / font / generic), `inspect metadata`, `inspect color`,
  `inspect process`, `inspect port`, `inspect tls` (openssl
  s_client + Node `X509Certificate`), `inspect dns` (system
  resolver + Cloudflare zone-records mode), plus the Cloudflare
  / Postgres / k8s family.

Open:
- entropy / randomness score, image color profile, PDF outline
  + page count, font metrics, binary headers (`readelf`,
  `otool`, `dumpbin`), WASM imports / exports, archive
  manifest without extracting.

### compare

- Add: word-level text (`dwdiff`), PDF (`diff-pdf`), perceptual
  image (`pixelmatch`, `odiff`), directory tree (count + hash walk).

### optimize

- Add: `oxipng`, `jpegoptim`, `mozjpeg`, `gifsicle`, `svgo`,
  `cwebp`, `avifenc`, `imagemin` plugins. JS / CSS / HTML minify
  (deps already present, wire through). PDF compress
  (`ghostscript`, `qpdf`). Video size-target presets.

### sanitize

- Add: markdown, SVG (`domPurify`), SQL injection guard
  (parameterise via tree-sitter), PII redact (`presidio`).

### validate

- Add: JSON Schema, YAML schema, XML via DTD/XSD (`xmllint`),
  HTML (`html-validate`), email, URL, phone (`libphonenumber-js`),
  regex against samples, SQL parse (`sql-formatter` / `pglast`),
  spell check (`aspell`, `hunspell`, `cspell`).

### verify

- Add: checksum verify (sha256/512/blake3), gpg / minisign / `age`
  signature, X.509 cert chain, JWS / JWT, code-signing (macOS
  `codesign -v`, Windows `signtool`).

### resize / crop / slice

- Smart crop (face / saliency — `smartcrop.js`), audio slice by
  timestamp, multi-page image split (`tiff` → `pngs`).

### merge / split

Shipped:
- Video concat via ffmpeg concat demuxer.
- Time-range trim / split + segment-based split.

Open:
- image → pdf / contact-sheet, folder merge, csv / jsonl split
  by row count or column value.

### download / upload

Shipped:
- HuggingFace, S3 (incl. R2 via `--endpoint`), GCS, Azure, FTP,
  SFTP, WebDAV, IPFS, torrent. Plus `download video` (yt-dlp,
  1500+ sites).

Open:
- OAuth device flow, service-account auth helpers, signed-URL
  upload, integrity check (`--checksum`).

### sync

- Windows SMB auto-mount via `net use`, Git-based doc history
  extract, S3 / rclone transports as first-class targets.

### disassemble

- Done. Keep an eye on `--profile` additions for ghidra (CFG, data
  refs, decompile via `ghidra-decompiler`).

### database

- Done: dump + restore for pg / mysql / sqlite / mongo.
- Add: schema diff (`migra`, `dbmate diff`, `prisma migrate diff`),
  data sample / anonymize, query export, fixture loader.
- Add: `task dump schema pg <url>` — schema-only dump, no owners,
  no privileges. Wraps:
  ```sh
  pg_dump "<url>" \
    --schema=public \
    --schema-only \
    --no-owner \
    --no-privileges \
    > schema.sql
  ```
  Equivalent MySQL / SQLite / Mongo variants follow the same shape.

### network / host-inspect

- Done: `ping`, `measure`, `trace route`, `inspect network`
  (dns/whois/connections/listening/established/remote --group),
  `inspect tls`, `list port`, `list network`.
- Add: `mtr`, `nmap` / port scan (local only, safety-gated).
- **Bandwidth** (the open item from network observability):
  - `inspect process --bandwidth` via `nettop` (mac) / `nethogs` (linux)
  - `measure network --duration 60s` for sampled byte counters
  - `watch network --process` for per-process activity stream
  - `inspect network --idle` heuristic (no foreground window owns the socket)

### ocr (new verb)

- `tesseract`, `ocrmypdf`, `paddleocr`. Language-pack selection +
  structured output (words with bounding boxes + confidence).

---

## New action families — app dev / observability / ops

The original roadmap was file-and-media heavy. Here's what would
actually accelerate building and running real apps.

### scaffold (new verb)

Generate a starter repo / module / fixture from a template.

- `task scaffold node-app --name foo` → tsconfig, eslint, prettier,
  package.json, .gitignore, github actions, basic test runner.
- `task scaffold rust-app`, `scaffold python-pkg`, `scaffold
  fastapi`, `scaffold expo`, `scaffold next`, `scaffold svelte`,
  `scaffold electron`.
- `task scaffold dockerfile <stack>` — write a sane Dockerfile for
  a given language stack.
- `task scaffold ci <provider>` — GitHub Actions / GitLab CI /
  Buildkite YAML with build + test + deploy stages.
- `task scaffold module <name>` — drop a new file with the
  surrounding repo's chosen file-header / license / import order.

### log (new verb family)

Already partially landed: `parse log`, `aggregate log`,
`highlight log`. Round it out into a real triage toolkit:

- `task log tail <file>` — tail with parse-aware filtering;
  smart EOL detection, jsonl-aware highlighting.
- `task log ship <source> --to <sink>` — read pino / bunyan /
  stdlog / journald, push to loki / datadog / honeycomb / cloudwatch.
- `task log sample <file> --rate 0.01` — preserve schema, drop
  rows, useful for sharing logs without leaking volume.
- `task log redact <file>` — strip PII / tokens / paths via
  configured regexes.
- `task log replay <file> --speed 4x` — replay timestamped logs
  for testing alerting.

### trace (extended)

`trace process` (strace / dtruss / procmon) and `profile cpu`
(samply / 0x / clinic) ship today. Open work:

- `task trace http <url>` — full-fidelity request trace (DNS,
  TCP, TLS, request, response, body) — like `curl --trace-time`
  but parsed.
- `task trace dns <host>` — every step of the resolution
  (root → TLD → authoritative → cached answer).

### monitor (new verb)

Long-running watch with thresholds + alerts.

- `task monitor process <pattern>` — re-emit when state crosses
  a threshold (cpu > 80% for 30s, memory leaks, exit).
- `task monitor port <port>` — fire when the port goes
  up/down/changes-pid.
- `task monitor cert <host>` — alert N days before TLS expiry.
- `task monitor file <path>` — fsevents / inotify, rate-limited
  echo when written. Optional debounce.
- `task monitor http <url> --every 30s --slack <hook>` — synthetic
  monitoring; ping, fail to slack/discord/webhook.

### dns (new verb family)

Kill the "why won't this resolve" dance. Wrap one tool per
verb so the flags stop being the bottleneck.

**Diagnose**

- `task dns lookup <host>` — one-shot resolver probe across the
  OS-native cache and a configurable upstream. Prints A /
  AAAA / CNAME plus which resolver answered. (`task inspect dns`
  already does the read-only side; `task dns lookup` is the
  more flag-rich diagnostic surface.)
- `task dns trace <host>` — parsed `dig +trace` (root → TLD →
  authoritative → cached answer) with per-hop timing.
- `task dns inspect` — dump the active resolver chain
  (system resolver config, per-zone scoping files, which
  process owns :53).
- `task dns compare <host> --via cloudflare,google,quad9` —
  fan out queries, diff the answers. Catches split-horizon or
  poisoned resolvers fast.
- `task dns propagate <record>` — poll N public resolvers on
  an interval until a new A / AAAA / NS record propagates after
  a registrar change.
- `task dns test doh <url>` — confirm a DoH endpoint returns
  valid wire-format / JSON, measure latency.

**Mutate**

- `task dns flush` — clear the OS resolver cache, per-platform.
- `task dns serve wildcard <zone> --to <addr>` — install a
  local resolver rule so `*.<zone>` resolves to a fixed
  address (default `127.0.0.1`). Backed by dnsmasq or
  dnscrypt-proxy's cloaking rules, plus the per-OS scoping
  file (e.g. `/etc/resolver/<zone>` on macOS) so the rule
  applies only to that zone. Idempotent — re-runs are safe.
- `task dns serve private --upstream doh` — swap the local
  resolver to DoH-only (cloudflare / quad9 / google) via
  dnscrypt-proxy. Adds `require_dnssec` / `require_nolog` /
  `require_nofilter` toggles. Composes with `dns serve
  wildcard` so private zones stay local while public lookups
  go encrypted to a chosen provider. Idempotent.
- `task dns revert` — undo the most recent `dns serve` install
  (stops the local resolver daemon, restores prior config,
  removes per-zone scoping files). Same shape as a
  `--revert` flag on the install commands.

The `serve wildcard` / `serve private` / `revert` triplet
captures the common dev-machine pattern of "I want a private
TLD that only my laptop knows about, and I want all my other
DNS to leave the machine encrypted, both reversibly."

### audit (new verb family)

Dev-machine posture check in one command — the inverse of the
`dns serve` / `tls trust` mutate verbs above. Confirms the
machine is in the configuration we expect, not slowly
drifting.

- `task audit dev` — full check, exits 0 on green and 1 on
  any failure. Sections:
  - DNS resolver health (the right local daemon up, the
    others down, bound to loopback only, DoH /
    DNSSEC / no-log toggles where applicable).
  - Per-zone scoping (no broad zone hijack — only the
    zones we explicitly own redirect locally).
  - Trust store (exactly one current local CA, no stale
    duplicates from prior rotations).
  - Reverse-proxy exposure (admin API off, only :80 / :443
    open to LAN, everything else loopback-bound).
  - Process privilege (loopback daemons running as root
    only where required, not by default).
- `task audit resolver` — the DNS / per-zone-scoping slice
  of `audit dev`, runnable on its own.
- `task audit trust-store` — enumerate every non-system
  root cert in the trust store; flag unknown ones for review.
- `task audit ports` — every listening socket with process,
  user, and loopback-vs-lan-vs-any binding.
- `task audit secrets` — `task scan env` over the working
  tree + recent history (already shipped — `audit secrets` is
  the alias).
- `task audit startup` — launchd / systemd / Windows service
  units installed by third-party installers, with install date.

`audit dev` is the "is my laptop still set up the way I left
it" command — useful as a `task` cron, a CI step on a build
machine, or a five-second sanity check before a demo.

### debug (new verb)

- `task debug attach <pid>` — start lldb / gdb / delve / py-spy
  attached to a running process; opens the right debugger for the
  process binary.
- `task debug core <core-file>` — symbolicate + open in debugger.
- `task debug crash <macOS-crash-log>` — parse and pretty-print
  Apple's `.ips` crash reports.
- `task debug network <pid>` — capture this process's traffic
  only (filtered tcpdump + auto-keylog for TLS via
  `SSLKEYLOGFILE` injection).

### serve (new verb)

Spin up tiny local servers without remembering tool names.

- `task serve folder ./public --port 8080` — static file server
  (parity with `python -m http.server` but with hot-reload).
- `task serve api openapi.yaml` — mock server from an OpenAPI doc
  via `prism mock`.
- `task serve graphql schema.graphql` — same idea via
  `graphql-faker`.
- `task serve smtp --port 1025` — local SMTP sink (`mailpit`).
- `task serve s3 --port 9000` — local S3-compatible storage
  (`minio` or `localstack`).
- `task serve postgres` — ephemeral Postgres in a volume-less
  container, prints `DATABASE_URL=...` on stdout.

### deploy (new verb)

- `task deploy ssh <host>` — rsync + remote `systemctl restart`,
  with rollback.
- `task deploy fly|render|vercel|netlify|cloudflare-pages` —
  thin wrappers around each provider's CLI with a uniform input
  shape.
- `task deploy docker <image> --to <ssh-host>` — push image,
  trigger pull + restart.
- `task deploy k8s <manifest.yaml>` — `kubectl apply` with
  health-check wait.

### env (new verb family)

- `task env dump` — print the effective env (with secrets
  optionally masked).
- `task env diff <a> <b>` — compare two env files / two shells.
- `task env merge a.env b.env -o c.env` — last-wins merge.
- `task env encrypt .env --to .env.age` / `task env decrypt` —
  age / sops wrap so `.env.age` can be committed.
- `task env load <provider>` — pull from 1Password / Doppler /
  AWS Secrets Manager / Vault into a one-shot env block.

### secret

Shipped:
- `task rotate secret <key>` — generate a fresh random value,
  write it to a configured store (dotenv today), optionally
  fire a `--restart` follow-up command. **Done.**
- `task scan secret <repo>` — gitleaks / trufflehog walk over
  a working tree or git history. **Done.**
- `task check secret` — list every key in the chosen store with
  last-set / expiry info (dotenv today; cloud stores plug in
  via `--store <name>`). **Done.**

Open: cloud-store drivers (1Password, Doppler, AWS Secrets
Manager, HashiCorp Vault) under `code/call/{rotate,check}/secret/
<store>/`. The schemas already accommodate `--store` — only the
per-store driver work remains.

### snapshot (new verb)

(Distinct from `sync snapshot`.)

- `task snapshot disk` — APFS snapshot on macOS, btrfs snapshot
  on Linux. Roll back on demand.
- `task snapshot db <conn>` — ad-hoc point-in-time dump for the
  current schema state, not the whole table data.
- `task snapshot folder ./src --label before-refactor` —
  zip + tag, useful before destructive refactors.

### record / replay (new verbs)

- `task record screen` / `record window <id>` — `ffmpeg` + AVF /
  X11 grab, output mp4 / webm / gif.
- `task record terminal --to demo.cast` — `asciinema`-style
  capture with autoplay HTML embed.
- `task replay demo.cast --speed 2x` — playback either as text
  to a terminal or render to mp4 / gif.

### benchmark (new — the open part of measure)

- `task benchmark cli <cmd>` — `hyperfine` wrap.
- `task benchmark http <url>` — `wrk` / `oha` / `vegeta`.
- `task benchmark disk` — `fio` profile.
- `task benchmark function <ts-file>` — micro-bench wrap around
  `tinybench` / `mitata` for in-source benchmarking.

### detect (extended)

- Done: `bidi`.
- Add: `secret-leak` (run gitleaks/trufflehog on staged diff —
  pre-commit hook helper), `dead-code` (per-language unused
  exports — `ts-prune`, `vulture`, `cargo-udeps`),
  `circular-deps` (madge / cargo-deny), `license` (per-dep
  license summary, fail on banned), `vulnerability` (osv-scanner /
  trivy / snyk).

### keep / cache (new verbs)

- `task cache get <key>` / `task cache put <key> <file>` —
  content-addressed local cache (sccache-style), shareable across
  build steps.
- `task keep <file> --for 7d` — soft-pin a file in a cache dir
  so cleanup scripts skip it.

### git (new verb family)

- `task git split-commits` — cluster a giant WIP commit into
  reasonable PR-sized chunks (heuristic: file-path proximity).
- `task git pick <pattern>` — interactive cherry-pick across
  branches.
- `task git rewrite-author` — rename committer everywhere
  (filter-repo wrap).
- `task git size` — `git filter-repo --analyze` rendered as a
  nice tree of "biggest paths in history."
- `task git timeline` — author/file heatmap as ascii / svg.

### service (new verb)

- `task service start|stop|restart|status <name>` — uniform
  facade over launchd (mac), systemd (linux), services.msc
  (windows). Picks the right manager automatically.
- `task service install <unit>` — install a unit/agent file in
  the right place per OS.

### container (new verb family)

- `task container build` — Dockerfile inference from project
  (Buildpacks-style) when no Dockerfile present.
- `task container scan <image>` — `trivy` / `grype`.
- `task container size <image>` — layer-by-layer breakdown
  (`dive` wrap).
- `task container shell <image>` — boot a throwaway container
  from any image into bash / sh.
- `task container clean` — prune unused layers, dangling images,
  exited containers; show before/after disk reclaim.

### k8s (new verb family)

- `task k8s logs <selector>` — `stern`-style multi-pod tailing
  with parse-aware highlighting (composes with `task highlight log`).
- `task k8s port-forward <selector>:<port>` — auto-discover the
  pod, forward, restart on drop.
- `task k8s scale <deployment> <n>` — readable wrapper.
- `task k8s diff <manifest>` — `kubectl diff` plus rendered
  before/after.

### release (new verb)

- `task release version` — bump version per-commit-message
  (`conventional-commits` parse), update changelog, tag.
- `task release notes` — generate release notes from commit log
  since the last tag (PR titles, contributors).
- `task release changelog --since <tag>` — rolling
  CHANGELOG.md prepend.
- `task release publish` — orchestrate npm / docker push / github
  release / homebrew pr / etc., respecting per-target dependencies.

### onboard (new verb)

- `task onboard <project>` — read a manifest of "what this repo
  needs," install missing deps, start required services, print a
  ready-to-use `.env.example` walk-through.
- `task onboard machine` — set up a fresh dev machine: dotfiles,
  shell, common tools, git config.

### review (new verb)

- `task review pr <num>` — pull the diff, summarize via LLM,
  highlight risky changes (large deletions, lock changes, env
  mutations).
- `task review commit <sha>` — same for any commit.
- `task review folder <path>` — summary of a directory's
  exports, recent churn, test coverage gap.

### chat (new verb — LLM utility)

- `task chat with <provider> --system <prompt>` — interactive
  REPL or one-shot prompt against openai / anthropic / ollama.
- `task chat fix <error-text>` — given a compile / runtime
  error, ask the configured model for a fix.
- `task chat explain <file>:<range>` — explain a code chunk.
- `task chat commit-msg` — generate a conventional-commits
  message from the staged diff.

---

## Packaging

### Chocolatey

Missing on Windows: swift, clang-format, rustfmt, asmfmt, shfmt,
rubocop, pip-installed tools (black, etc.). Compare
`load/choco/base.nuspec` with the `Dockerfile` for the full gap.

### Ubuntu / Debian

- Done: `cluesurf-task` deb published via the apt repo at
  deck.clue.surf.

### Arch

- Done: `cluesurf-task` AUR package live, push via
  `pnpm host:pkg:arch`.

### Nix

- Flake output `packages.default` pulling every shell-out via
  `buildInputs` so `nix run .#task` is self-contained.

### Homebrew

- Done. Bump tap on release via `pnpm host:cask`.

---

## Infrastructure

- **Browser entrypoint** still eagerly loads some paths. Goal:
  per-action imports so tree-shaking is real.
- **Auto-generated dispatch tables** — today some route entries
  are hand-written in `code/form/export/action/<verb>/node.ts`;
  walk MESH at codegen time to emit them.
- **Task-class overload wall** — codegen emits overloaded methods
  on the `Task` class itself, not just on `TaskSurface`, so
  per-input return-type narrowing works at call sites without a
  cast.
- **Progress events** — long-running actions (`convert` large
  video, `embed` 100k docs) should emit a progress stream.
  Design: `AsyncIterable<ProgressEvent>` returned alongside the
  promise, or a callback on input.
- **Streaming I/O** — large files shouldn't require `path`; accept
  Node streams / `Blob` / async iterators uniformly.
- **Remote dispatch protocol** — nail down the task.surf wire
  format (input serialisation, file upload, progress, work-id
  resolution) and document it as a stable spec.
- **Sandboxing** — run shell-outs in a jail (landlock on Linux,
  sandbox-exec on mac, wasi/wasmtime where the tool exists as
  WASM).
- **Plugin system** — third parties register new verbs / tools
  via a declared schema + handler pair, same as first-party
  actions.
- **GPU path** — when present, route video / image / embedding
  tasks through CUDA / Metal / Vulkan accelerated binaries.
- **Distributed work queue** — redis / postgres-backed queue so
  `task.convert({ remote: true })` scales to N workers behind the
  scenes.
- **WebSocket progress push** — live updates from remote workers
  back to `task.wait(work)`.
- **Caching** — content-addressed output cache keyed on
  `(action, input-hash, tool-versions)`. Repeated identical calls
  skip execution and return the cached artifact.
- **Metrics** — emit prometheus-compatible counters
  (`task_action_count_total`, `task_action_duration_seconds`) so
  long-running task.surf workers are observable out of the box.
- **OpenTelemetry traces** — every action becomes a span;
  composes with the user's existing tracing backend.
- **Replayable command log** — every invocation's input + outcome
  written to `~/.local/share/task/history.jsonl`. `task history`
  lists / re-runs.
- **Error taxonomy** — finite `KinkCode` enum so callers can
  switch on failure modes instead of regexing error strings.

---

## Browser-side actions

`task` already exposes a browser entrypoint, but most actions
short-circuit to "node-only." Anything below can run **purely in
the browser** via WASM or Web APIs — useful for online tools,
in-browser dev panels, code-sandbox sites, no-server playgrounds.

The pattern: `import { <verb><Thing>Browser } from
'@cluesurf/task/<verb>/<thing>'` returns a function that takes a
`File | Blob | ArrayBuffer | string` and resolves to another. No
network round-trip.

### data — quick ad-hoc transforms

- **format / parse** — `json ↔ yaml ↔ toml ↔ xml ↔ csv ↔ tsv
  ↔ jsonl ↔ ndjson ↔ url-query` round-trips. All pure JS.
- **compare** — semantic diff for json / yaml / csv with
  side-by-side render that scales to ~100k rows (virtual scroll).
- **find similarities** — fuzzy match across two columns or
  files (Levenshtein, dice, cosine), highlight near-duplicates,
  cluster.
- **dedupe** — by exact match, by hash, by fuzzy threshold.
- **schema infer** — given a json sample, emit zod / typescript /
  json-schema / sql DDL / parquet schema.
- **flatten / unflatten** — `{a:{b:1}}` ↔ `{"a.b":1}` for csv
  exports.
- **csv pivot / unpivot** — wide ↔ long shape transforms.
- **DuckDB-WASM front end** — load a csv/parquet/json into
  DuckDB-WASM, run SQL in the browser, export the result. No
  server.
- **arrow / parquet preview** — read an arrow IPC or parquet
  file, render schema + first N rows + column stats.

### date / time — every dev needs this hourly

- **convert** — unix epoch ↔ iso ↔ rfc-2822 ↔ http-date ↔
  human ("3 days ago"). Two-way, every format.
- **timezone** — convert between timezones with DST awareness;
  show the same instant in every TZ at once (worldclock view).
- **parse natural** — "tomorrow at 3pm pst", "next monday",
  "in 2 weeks" via `chrono-node`.
- **range expand** — given `2026-01-01..2026-01-07`, list every
  date / cron-occurrence / business-day.
- **cron explain** — `0 9 * * mon-fri` → "every weekday at 9am".
  Plus next 5 firings, plus a calendar render.
- **age / diff** — between two timestamps in human + machine
  units.

### text — clipboard + dev panel staples

- **case convert** — snake / kebab / camel / pascal / scream /
  title / dot / path. Detect input, offer outputs.
- **encode / decode** — base64, base64url, hex, url, html
  entities, unicode escapes, quoted-printable, rot13, morse.
- **hash** — md5, sha1, sha256, sha512, blake3, crc32, xxh64
  via WebCrypto + small WASM polyfills.
- **uuid / nanoid / ulid generate** — copy on click.
- **lorem** — generate, with seeded reproducibility.
- **diff** — myers / patience / histogram, render side-by-side.
- **regex playground** — live match + replace, named groups,
  flag toggles, sample test strings, pattern explainer.
- **count** — chars, words, lines, tokens (gpt-tokenizer / tiktoken
  via WASM), bytes after encoding.

### color / design

- **convert** — rgb / hsl / lab / lch / oklch / hwb / cmyk /
  hex via `culori`.
- **palette** — extract a palette from an uploaded image (k-means
  in WASM). Export to css custom properties / tailwind config /
  swift / kotlin.
- **contrast** — WCAG ratio + APCA score for any fg/bg pair, with
  AA / AAA badges.
- **gradient** — generate equal-luminance gradients,
  perceptually-uniform color ramps.
- **accessibility** — color-blindness simulator on an uploaded
  image (protanopia / deuteranopia / tritanopia).

### image — useful bits without uploading

- **inspect** — exif, color profile, dimensions, channel
  histogram, dominant colors, file-size budget calc.
- **resize / crop / rotate** — via canvas + `pica` for high-quality
  resampling.
- **format convert** — jpg / png / webp / avif / gif via wasm
  codecs (`@jsquash/*` or `wasm-vips`).
- **annotate** — draw arrows / boxes / blur over an uploaded
  screenshot (think CleanShot but free + browser-only).
- **diff** — pixelmatch on two uploads, render the delta.
- **strip metadata** — drop EXIF / GPS / device info before
  re-downloading. Privacy-first share helper.

### audio — surprisingly browser-friendly

- **inspect** — duration, bitrate, sample rate, channel layout,
  loudness (LUFS).
- **trim / fade / normalize** — Web Audio API + `audiobuffer-utils`.
- **convert** — wav / mp3 / ogg / flac / opus via
  `@ffmpeg/ffmpeg` (ffmpeg.wasm) or codec-specific WASM.
- **waveform render** — visualize as svg / png.
- **transcribe** — whisper.cpp WASM build, runs entirely
  client-side for short clips.

### video — bigger but doable

- **ffmpeg.wasm** — full-fidelity convert / trim / extract-frames /
  thumbnail-sheet / concat. ~30 MB load but cached after first use.
- **thumbnail-from-time** — render a single still at a
  user-supplied timestamp.
- **inspect** — codec / container / streams via ffprobe.wasm.
- **subtitle convert** — srt ↔ vtt ↔ ass, all pure JS.

### archive — gzip / zip / tar in the browser

- **extract** — `libarchive.js`-backed reader for tar / zip / 7z /
  rar / iso. Browse contents without downloading individual files
  to disk.
- **gzip / brotli / zstd** — compress / decompress single files
  via `pako` / `wasm-brotli` / `zstd.wasm`.
- **zip create** — assemble a zip from selected uploads via
  `client-zip` (streaming, no full buffer in memory).
- **tar create** — same idea via `tarballjs`.

### font — preview, subset, inspect

- **inspect** — name table, OS/2, hhea, GSUB / GPOS feature list,
  variable-font axes, glyph count via `opentype.js` /
  `harfbuzz.wasm`.
- **preview text** — render arbitrary user text in the uploaded
  font at chosen size / weight / variation. Save as png/svg.
- **subset** — drop unused glyphs to shrink for web delivery.
- **shape** — show how a string lays out per the font's
  contextual rules (`harfbuzz.wasm`).
- **convert** — ttf ↔ otf ↔ woff ↔ woff2 ↔ ttx via WASM.
- **glyph chart** — render every glyph in a grid, click for
  unicode + glyph name.

### crypto — keys + signing in browser

- **keypair generate** — RSA / Ed25519 / X25519 / EC via WebCrypto.
- **sign / verify** — JWS / JWT / detached signatures,
  visualizers for tokens with claim breakdown.
- **encrypt / decrypt** — symmetric (AES-GCM) and asymmetric
  (age via WASM).
- **password derive** — PBKDF2 / Argon2id (WASM) timing tester.

### encoding / wire formats

- **protobuf** — given a `.proto` and a hex/base64 payload,
  decode it; given an object, encode + show the wire bytes.
  `protobufjs` + a tiny editor.
- **msgpack / cbor / bencode / amf** — bidirectional viewers.
- **HAR viewer** — drop a .har, inspect requests, time-waterfall,
  copy as fetch / curl, export filtered subset.

### url / api / network

- **url decompose** — protocol / host / port / path / query /
  hash / userinfo with each piece editable; auto-recompose.
- **query builder** — visual editor for query strings, supports
  bracket notation arrays, sorts, dedupes.
- **JWT viewer** — paste, see header + payload + signature
  validity (against an uploaded JWK / pubkey).
- **OAuth flow tracer** — paste an authorization URL, walk
  through redirect_uri / scopes / client_id, simulate the dance.
- **REST request runner** — fetch wrapper with history, env vars,
  scripted pre/post hooks. Bookmarklet-able.

### qr / barcode

- **qr generate** — error-correction levels, embed a center logo,
  export as svg.
- **qr scan** — webcam scanner via `jsQR`.
- **barcode** — code39 / code128 / ean13 / itf via `jsbarcode`,
  scan via `quagga2`.

### clipboard / drag-and-drop helpers

- **paste anywhere** — drop a link / image / file / json on the
  page, route to the right inspector automatically (mime sniff).
- **share-as** — generate a shareable URL with the input
  state encoded (so a colleague can open the same view).

### dev panels

- **localStorage / sessionStorage / IndexedDB** — visual editor
  for the current origin's keys. Diff between two snapshots.
- **cookie viewer** — readable table for the current origin's
  cookies, export as JSON, import back.
- **service-worker dev tools** — list registrations, kill /
  update, see fetch handler activity.
- **websocket inspector** — paste a ws:// url, send + receive
  in a chat-like panel, save sessions.

### in-browser file system

- **OPFS browser** — explore the Origin-Private File System for
  the current origin (chrome / safari support varies).
- **directory diff** — drop two folders via the File System
  Access API, get a tree-diff with file-content diffing for
  text changes.

### code

- **AST viewer** — paste source in any language tree-sitter
  supports, see the parsed tree. Click a node, highlight in
  source.
- **format / minify / beautify** — prettier in browser for
  every language it supports.
- **transpile** — typescript / jsx / coffee / pug / sass live in
  the browser via `@swc/wasm-web` / `sucrase`.
- **eval** — sandboxed (iframe + CSP) JS / TS evaluator with a
  REPL. Useful for quick one-liners.

### wasm playground

- **wasm inspect** — drop a `.wasm`, see imports / exports /
  memory layout, run exported functions with typed inputs via a
  generated UI.
- **wat ↔ wasm** — round-trip via wabt.wasm.

---

## Cross-cutting polish

- **Per-action timing in pretty mode** — every line ends with a
  dim `(143ms)`, summed at the bottom. Useful for spotting which
  step in a pipeline is the bottleneck.
- **`--json` everywhere** — every read-style verb already emits
  json on `--format json`, but a few write verbs still don't
  return structured output. Audit + fix.
- **`--quiet` / `--silent`** — uniform suppression flag across
  every verb, not just per-implementation.
- **`--explain` for every backend** — currently per-verb.
  Generalize so any verb prints the underlying CLI invocation
  before running.
- **Dry-run by default for destructive verbs** — `task halt`,
  `task remove`, `task sync --delete`. Force with `--apply`.
- **Tab completion** — generate zsh / bash / fish / powershell
  completions from the registered help entries.
- **Man pages** — render the same registry into roff so
  `man task-convert` works after install.

---

## XLSX workflows

Map of planned spreadsheet operations, grouped by workflow, each
with a concrete `task` command. These slot into the existing
verbs (`filter`, `convert`, `inspect`, `merge`, ...) rather than a
dedicated `xlsx` verb, so every operation composes with the rest
of the CLI.

### Core row / column

- filter by missing/null/regex/range → `task filter rows <in.xlsx> --where "col:empty|regex:^X|range:1..10|date:2024-01..2024-12"`
- deduplicate by N columns → `task dedupe rows <in.xlsx> --by email,phone`
- stable multi-column sort → `task sort rows <in.xlsx> --by status,-created_at`
- select / drop / rename / reorder columns → `task select column <in.xlsx> --keep id,name --drop raw --rename "Full Name=full_name" --order id,full_name`
- trim whitespace + normalize casing → `task normalize column <in.xlsx> --trim --case lower`
- forward fill / default fill → `task fill column <in.xlsx> --column user --method ffill`
- explode array cells into rows → `task split rows <in.xlsx> --column tags --delimiter ,`
- group + aggregate rows → `task merge rows <in.xlsx> --by country --agg "users:count,revenue:sum"`

### File splitting / combining

- split into N rows per file → `task split xlsx <in.xlsx> --rows 200 -o chunks/`
- split by column value → `task split xlsx <in.xlsx> --by country -o by-country/`
- split by sheet → `task split xlsx <in.xlsx> --by-sheet -o sheets/`
- merge files / sheets / rows → `task merge xlsx a.xlsx b.xlsx c.xlsx -o all.xlsx [--by-sheet|--append-rows]`
- cell-level diff → `task diff xlsx a.xlsx b.xlsx`

### Data cleaning / normalization

- remove empty rows / duplicate headers → `task sanitize xlsx <in.xlsx> --drop-empty-rows --drop-duplicate-headers`
- normalize phones / emails / URLs / ISO dates → `task normalize column <in.xlsx> --column phone --format e164`, `task normalize column <in.xlsx> --column created_at --format iso`
- strip formatting (styles → values) → `task sanitize xlsx <in.xlsx> --strip-formatting`
- evaluate formulas → `task convert xlsx <in.xlsx> --formulas evaluate -o computed.xlsx`
- type coercion → `task convert column <in.xlsx> --column count --to integer`
- schema validate → `task validate xlsx <in.xlsx> --schema schema.json`

### Schema / structure

- enforce schema (required + enums) → `task validate xlsx <in.xlsx> --schema schema.json --strict`
- infer schema → `task inspect xlsx <in.xlsx> --infer-schema -o schema.json`
- map columns → `task rename column <in.xlsx> --map columns.json`
- flatten nested structures → `task flatten xlsx <in.xlsx>`
- expand JSON-in-cell → `task expand column <in.xlsx> --column meta --format json`
- pivot / unpivot → `task pivot xlsx <in.xlsx> --index country --columns year --values revenue`, `task unpivot xlsx <in.xlsx> --index id --value-name metric`
- group + aggregate → `task merge rows <in.xlsx> --by region --agg "users:count"`

### Search / matching / fuzzy

- fuzzy match → `task search xlsx <in.xlsx> --column name --fuzzy "lance" --algo levenshtein`
- inner / left join → `task join xlsx users.xlsx orders.xlsx --on user_id --type left -o enriched.xlsx`
- lookup / enrich → `task enrich xlsx <in.xlsx> --from <other.xlsx> --on id --pull email,plan`
- near-duplicate detection → `task dedupe rows <in.xlsx> --by name --fuzzy --threshold 0.92`
- cluster similar rows → `task cluster rows <in.xlsx> --column description`
- keyword search → `task search xlsx <in.xlsx> "needle"`

### Language / text-specific

- token / IPA / transliteration extraction → `task extract tokens <in.xlsx> --column text`, `task convert column <in.xlsx> --column word --to ipa`
- script normalization → `task normalize column <in.xlsx> --column word --unicode nfc --no-diacritics`
- definition summarization → `task summarize column <in.xlsx> --column def --max-words 3`
- language detection → `task detect language <in.xlsx> --column text`
- parallel-text alignment → `task align rows <in.xlsx> --columns en,ar`
- frequency counts → `task measure frequency <in.xlsx> --column word`
- concordance → `task inspect concordance <in.xlsx> --column text --token "foo"`

### Validation / QA

- required fields / invalid values / duplicates → `task validate xlsx <in.xlsx> --required id,email --unique id`
- row-level rules ("if A then B") → `task validate xlsx <in.xlsx> --rules rules.yml`
- validation report → `task validate xlsx <in.xlsx> --schema schema.json -o report.html`
- outlier / rare-value highlighting → `task inspect anomalies <in.xlsx>`
- row checksums → `task hash rows <in.xlsx> --columns id,email -o hashes.csv`

### Conversion / interop

- XLSX → CSV / TSV / JSON / NDJSON / Parquet → `task convert data <in.xlsx> -o <out.csv|tsv|json|ndjson|parquet>`
- CSV / JSON → XLSX → `task convert data <in.csv> -o <out.xlsx>`
- per-sheet export → `task export xlsx <in.xlsx> --sheet "Q1" -o q1.csv`
- compress → `task archive file <in.xlsx> --format zst`
- parquet for HuggingFace → `task convert data <in.xlsx> --to parquet --schema schema.json -o data.parquet`

### Performance / large data

- streaming read / write → `--stream` flag on `task filter rows` / `task convert data` so nothing loads the whole file
- chunked pipelines → `task split xlsx <in.xlsx> --rows 10000 | task filter rows --where "status:active" | task merge xlsx - -o active.xlsx`
- parallel workers → `--workers N` on CPU-bound verbs
- lazy evaluation → stages compose via stdin/stdout, evaluated only when the last step consumes

### Formatting / presentation

- auto-size + freeze → `task format xlsx <in.xlsx> --auto-size --freeze 1`
- header bolding / colors → `task format xlsx <in.xlsx> --header bold,bg=#eee`
- autofilters → `task format xlsx <in.xlsx> --autofilter`
- multi-sheet report → `task make xlsx report.xlsx --from summary.csv:Summary,detail.csv:Detail`

### Automation / meta

- batch a folder → `task batch ./inputs/*.xlsx --do "convert data --to parquet"`
- watch directory → `task watch directory ./drop -o processed/ --on-new "convert data --to parquet"`
- version datasets → `task hash xlsx <in.xlsx>`, `task diff xlsx <old.xlsx> <new.xlsx>`
- transformation log → `--log <path>` global flag already prints every subprocess invocation; pipe into a file for an audit trail
- dry-run → `--explain` already prints the native commands; extend to every xlsx verb
- reversible transforms → out-of-scope first pass; achievable with a sidecar patch file

### Advanced / niche

- cell-level diff → `task diff xlsx a.xlsx b.xlsx --cell-level`
- formula audit / dependency graph → `task inspect formulas <in.xlsx> [--broken | --graph dot]`
- merged-cell detection → `task sanitize xlsx <in.xlsx> --normalize-merged`
- extract comments / annotations → `task extract comments <in.xlsx>`
- synthetic data from patterns → `task generate xlsx --schema schema.json --rows 1000`
- semantic column inference (AI) → `task inspect columns <in.xlsx> --infer-meaning`
- header fuzzy-map across files → `task match headers a.xlsx b.xlsx`
- column similarity → `task compare columns a.xlsx b.xlsx`
- time-series gap fill → `task fill column <in.xlsx> --column ts --method interpolate`

### End-to-end pipeline examples

```sh
# 1. Clean + split
task sanitize xlsx input.xlsx --drop-empty-rows --strip-formatting -o clean.xlsx
task normalize column clean.xlsx --column created_at --format iso
task dedupe rows clean.xlsx --by email -o clean.deduped.xlsx
task split xlsx clean.deduped.xlsx --rows 200 -o chunks/

# 2. Merge + enrich
task join xlsx users.xlsx orders.xlsx --on user_id --type left -o enriched.xlsx

# 3. Convert for HuggingFace
task convert data enriched.xlsx --to parquet --schema schema.json -o data.parquet
```

### Priority for this project (per conversation)

1. schema enforcement + validation (`validate xlsx --schema`)
2. fuzzy matching + clustering (`search xlsx --fuzzy`, `cluster rows`)
3. text normalization — IPA, scripts, unicode NFC/NFD (`normalize column`)
4. JSON-in-cell expansion (`expand column`)
5. XLSX → Parquet pipeline (`convert data --to parquet`)

---

## Security tool aggregator — hackingtool integration

Upstream: <https://github.com/Z4nzu/hackingtool>. A curated
launcher around ~50 open-source pentesting / forensics tools
(Anonsurf, Nmap, Sqlmap, theHarvester, Photon, recon-ng,
WPScan, Metasploit, hashcat, CeWL, Hydra, Tor router, Wireshark
filters, payload generators, …). The upstream surface is a
text-menu Python launcher; install steps are mostly Linux-only
shell scripts that `apt install` and `git clone` per tool.

The integration goal is **not** to vendor hackingtool's code or
ship its menu UI. It is to:

1. Adopt the verb taxonomy and use-cases as roadmap for `task`.
2. Wrap the most useful entries as first-class typed `task`
   commands (single-object input, four-branch dispatch, real
   help, JSON output) so they compose with the rest of the CLI.
3. Make every wrap **cross-platform** (or fail with a clear
   per-OS install hint), where upstream is Linux-first.
4. Gate destructive / network-touching operations behind an
   explicit `--i-accept-responsibility` flag (consistent with
   `task scan network`).

### Verb mapping

Group the upstream tools by verb and ship them under the
existing namespaces:

- **`task scan network`** (already shipped, nmap-backed) —
  extend with `--scan-type vuln` NSE coverage already wired,
  plus add `--tool masscan` for fast port sweeps.
- **`task scan host`** (already shipped, trivy rootfs) — add
  a `--tool lynis` backend for the audit / hardening checklist.
- **`task scan ssh`** (already shipped) — accept `--tool
  ssh-audit` as an alternative engine.
- **`task scan webpage`** (new under `scan/`) — `wapiti` /
  `nikto` / `whatweb` per-tool subdir. Default `whatweb` for
  fingerprint, opt-in to active scanners.
- **`task scan wordpress`** (new) — `wpscan` wrap with API
  token passthrough. Reads vuln DB, writes JSON.
- **`task scan password-policy`** (new) — `cewl` over a target
  site, `john` / `hashcat` rule preview, no actual cracking.
- **`task search osint`** (new top-level under `search/`) —
  `theharvester` / `recon-ng` / `maigret` per-tool subdir.
  Output a normalized record set (handle, source, confidence).
- **`task crawl webpage`** (new) — `photon` / `katana` /
  `gospider`. Emits a flat URL list + per-URL metadata.
- **`task fetch tor`** (extension to existing `fetch`) — add
  `--via tor` flag. Routes through a local Tor SOCKS proxy if
  one is up; refuses otherwise (no auto-start).
- **`task generate password-list`** (new under `generate/`) —
  `crunch` / `cupp` / `cewl` rule sets, output a wordlist.
- **`task generate phishing-page`** (new) — clone a target
  page's static assets for **lab-only** use. Default refuses
  to write under any path matching public TLDs without
  `--i-accept-responsibility`.
- **`task generate payload`** — `msfvenom` wrap for
  authorized red-team work. Same gate.
- **`task crack hash`** (new top-level) — `hashcat` / `john`.
  Wordlist + rule input, hash type detection via
  `name-that-hash`. CPU + GPU modes.
- **`task crack archive`** (new) — `fcrackzip` / `john --zip`.
- **`task disassemble binary`** (already shipped, radare /
  objdump) — add `--tool ghidra-headless` for batch disasm.
- **`task extract embedded`** (new under `extract/`) —
  `binwalk` / `foremost`. Carves embedded files out of
  arbitrary blobs (firmware, disk images, photos with
  hidden data). Read-only.
- **`task extract steganography`** (new under `extract/`) —
  `zsteg` / `stegseek` / `steghide --extract`. Pulls hidden
  data out of cover media.
- **`task encrypt steganography`** (new under `encrypt/`) —
  `steghide --embed`. Hides a payload inside a cover image
  / audio file. Lab use, gated.
- **`task inspect memory`** (new under `inspect/`) —
  `volatility3`. Per-OS profile selection lives in the
  wrapper; output is JSON.
- **`task sniff packets`** (new under `sniff/`) — `tshark`
  wrap. Bounded by interface + duration + filter; refuses
  to run without an interface explicitly named.
- **`task replay packets`** (extends existing `replay/`) —
  `tcpreplay` for pcap files.
- **`task inspect wifi`** (new under `inspect/`) —
  `airodump-ng` read-only. No injection / deauth without
  explicit gate.
- **`task crack wifi`** (new under `crack/`) —
  `aircrack-ng` against a captured pcap. Lab use only,
  gated.

### Cross-platform strategy

The blocker for most of these on macOS / Windows is upstream's
Linux-first install. For each verb, follow the same pattern:

1. **Native first.** If the binary is available via Homebrew /
   Chocolatey / Scoop / winget, register it in
   `code/tool/shared/install-hint.ts` and shell out directly.
2. **Container fallback.** When the tool is Linux-only or
   requires kernel features (raw sockets, monitor-mode wifi),
   ship a per-tool Docker image under
   `make/deck/docker/security/` and have the wrapper detect
   `--tool <name>` falling through to `docker run` with a
   temporary work-dir mount. macOS and Windows users get the
   verb without a manual install dance.
3. **Refuse when neither works.** No silent stubs. The verb
   prints an explicit per-OS install hint via the existing
   `formatInstallHint` helper.

### Repo placement

The first path segment under `code/call/` is **always a verb**
(see `note/action-pattern.md`'s placement discipline). No
noun-first directories — so `forensics/`, `wifi/`, and similar
groupings live under existing verbs (`extract`, `inspect`,
`crack`) instead of as their own top level.

```
code/call/
  scan/
    webpage/{whatweb,nikto,wapiti}/
    wordpress/wpscan/
    password-policy/{cewl,john,hashcat}/
  search/
    osint/{theharvester,recon-ng,maigret}/
  crawl/
    webpage/{photon,katana,gospider}/
  fetch/
    # existing fetch/ — extend with --via tor branch
  generate/
    password-list/{crunch,cupp,cewl}/
    phishing-page/
    payload/msfvenom/
  crack/
    hash/{hashcat,john}/
    archive/{fcrackzip,john}/
    wifi/aircrack/
  extract/
    embedded/{binwalk,foremost}/        # carve hidden files
    steganography/{zsteg,stegseek,steghide}/  # read-only
  encrypt/
    steganography/steghide/             # write side
  inspect/
    memory/volatility3/
    wifi/airodump/                      # read-only
  sniff/
    packets/tshark/
  replay/
    packets/tcpreplay/
```

Every leaf has the canonical `{base.ts, command.ts, node.ts,
console.ts}` quartet. Schema declared in `base.ts`, generated
parsers consumed in `node.ts`, argv built by `command.ts`,
yargs wiring in `console.ts`. The verb-group `console.ts`
files (e.g. `code/call/forensics/console.ts`) bundle each
thing under the verb.

### Node API surface

Each verb gets a method on `Task` in `code/node.ts`,
auto-typed off the generated form unions:

```ts
const out = await task.scan({
  thing: 'webpage',
  tool: 'whatweb',
  url: 'https://example.com',
})

const ports = await task.sniff({
  thing: 'packets',
  interface: 'en0',
  duration: 30,
  filter: 'tcp port 443',
})
```

The `thing` discriminator is the second-level dispatch — same
shape as `task.query({ tool: 'duckdb', ... })` already does.

### Ethical guardrails

Every active / network-touching / destructive verb defaults to
refuse on non-private targets unless the caller passes
`--i-accept-responsibility` (consistent with the existing
`task scan network` gate). The flag is per-invocation, never a
config / env default — there is no "always opt-in" mode.

### Phasing

Ship in priority order so each phase is independently useful:

1. **Phase 1 — passive recon**: `scan webpage`, `search osint`,
   `crawl webpage`, `dns lookup` extensions. All read-only,
   no install gate, useful immediately.
2. **Phase 2 — local forensics**: `extract embedded`,
   `extract steganography`, `crack archive`. CTF / IR
   workflows. Cross-platform via container fallback.
3. **Phase 3 — credentials**: `crack hash`, `generate
   password-list`. GPU mode optional via Docker NVIDIA
   runtime.
4. **Phase 4 — active probes (gated)**: `scan wordpress`,
   `scan password-policy`, `sniff packets`, `replay packets`.
   Always behind `--i-accept-responsibility`.
5. **Phase 5 — wifi / wireless**: `inspect wifi`,
   `crack wifi`. Linux + USB monitor-mode adapter only;
   documented as such.

The phases don't have to ship sequentially — each verb is
independent. The order just reflects "smallest blast radius
first", so the surface stays well-typed and well-tested as
the catalog grows.

---

## AI orchestration — Pentest-Swarm-AI integration (theory)

Upstream: <https://github.com/Armur-Ai/Pentest-Swarm-AI>. A
multi-agent LLM orchestrator that plans and runs pentest
workflows by chaining specialized agents (recon → vuln-scan
→ exploit → post-exploit → report). The agents call into a
tool layer; today that tool layer is hard-coded shell
commands.

The integration in theory: **`task` becomes the tool layer**
the swarm dispatches into. Three reasons it fits:

1. **Single typed surface.** Every `task` verb takes one
   object and returns one promise. An LLM agent emitting
   `task scan webpage --url X --tool whatweb` doesn't need
   to know the difference between `nmap`, `whatweb`, and
   `wpscan` flags — the verb name routes, the schema
   constrains the arguments, the parser rejects malformed
   plans before they spawn a subprocess.
2. **Structured output by default.** Every verb already
   returns JSON when invoked with `--format json`. The agent
   feeds the output of one step into the planner for the
   next without a regex-and-pray parsing layer.
3. **Built-in safety gates.** The same
   `--i-accept-responsibility` flag the hackingtool
   integration uses, plus the existing `--explain` mode
   (prints the native command without executing) is the
   ideal review checkpoint between "the AI says we should
   run X" and actually running X.

### Wire shape

```
┌──────────────┐     plan       ┌─────────────┐
│ Swarm planner│ ──────────────▶│ Tool router │
│ (LLM chain)  │                │  (task)     │
└──────────────┘ ◀──────────────└─────────────┘
                  structured
                  results
```

The planner emits a list of `{ verb, input }` records. Each
record is validated by the matching `<Verb>NodeInputParser`
before execution — so a hallucinated flag never reaches the
shell. Results come back as plain objects matching
`<Verb>NodeOutput`, which the planner consumes for the next
step.

### Integration points

- **Programmatic API as the dispatch contract.** The swarm
  imports `Task` from `@cluesurf/task` directly. No CLI
  shell-out, no string parsing. Every call is a typed
  method invocation, and the LLM's plan is validated
  against the generated zod schemas before execution.
- **`--explain` as the human-in-loop gate.** Sensitive verbs
  run with `explain: true` first; the planner reads back the
  native command, the human (or a policy engine) approves,
  the planner re-issues without `explain`. Built-in
  audit trail.
- **Per-step caching.** The roadmap already calls for
  content-addressed output caching keyed on
  `(action, input-hash, tool-versions)`. For an LLM
  orchestrator this is a free win — repeated identical
  plan fragments don't re-spawn binaries. Bigger win:
  the planner can branch a plan, try multiple variants,
  and see prior results from cache without retracing
  steps.
- **Replay log as planner training data.** The existing
  `task history` (replayable command log under
  `~/.local/share/task/history.jsonl`) is exactly the
  format an offline RL fine-tune wants — input plan,
  action, structured outcome.

### What `task` would add to host the swarm well

Most of these are already on the roadmap; calling them out
here as the gating set:

- **Plugin / verb registry exposed at runtime.** A
  `task --list-verbs --format json` that emits every verb
  + schema URL. The planner pulls this once at boot to
  ground the LLM in the actual tool surface (no
  hallucinated verbs).
- **Per-verb permission policy.** Today verbs use
  ad-hoc `--i-accept-responsibility` flags. Generalize to
  a policy file the planner is bound by — "agents may
  call read-only verbs in the inspect / search / scan
  prefixes, may not call any crack / generate /
  forensics verb without a human ACK."
- **Sandboxing.** Already on the infrastructure list
  (landlock / sandbox-exec / wasi). Hard requirement
  before LLM-emitted command lines run unattended.
- **Streaming progress.** Long-running verbs need to
  emit progress for the planner to time-budget. The
  `AsyncIterable<ProgressEvent>` design under
  Infrastructure covers this — make sure swarm-relevant
  verbs (scan, crack, forensics) implement it first.
- **Structured failure taxonomy.** The existing
  `KinkCode` enum lets the planner switch on failure
  modes ("missing tool" → install via `task install`,
  "auth required" → ask human, "rate limited" → back off)
  rather than regexing error strings.

### Phasing (theory)

1. **Read-only verb subset.** Wire the swarm against the
   existing inspect / search / list / scan-passive verbs
   only. Validates the dispatch shape, the schema flow,
   and the streaming-output contract end-to-end without
   any destructive risk.
2. **Add `--explain` interactive review.** Every active
   verb runs `explain` first; planner shows the native
   command in its UI for a thumbs-up.
3. **Policy-bound autonomous mode.** Behind an explicit
   per-session opt-in, allow the planner to call active
   verbs that match the loaded policy file (e.g. only
   on configured lab subnets / fixtures).
4. **Sandbox + cache + history.** Once the
   infrastructure pieces (sandbox / output cache /
   history log) ship, the swarm runs against a stable,
   auditable substrate — the difference between "an LLM
   ran a shell" and "an LLM filed a sequence of typed,
   logged, replayable, sandboxed verb invocations."

This is theory until phase 1 is prototyped — but the verb
catalog growing under the hackingtool roadmap is the
prerequisite for the swarm to have anything to dispatch
into.
