# Examples

Representative calls for every verb. Each section pairs a
**Node / TypeScript** block with the equivalent **bash** block so
you can pick whichever surface fits the moment. Signatures expand
as more backends land — check `code/form/export/node.ts` for the
generated `TaskSurface`.

## Construct

```ts
import Task from '@cluesurf/task'

const task = new Task()
// with a remote backend + API key
const remote = new Task({ host: 'https://task.surf', code: 'API-KEY' })
```

```sh
# Install
pnpm add -g @cluesurf/task

# Tab-complete every verb / sub-thing / flag in your shell
task autocomplete >> ~/.zshrc && exec zsh
```

## Modes (every verb)

```ts
// explain: print the resolved native command, don't execute
const plan = await task.convert({
  explain: true,
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})

// remote + work: dispatch to `host`, return a Work handle
const work = await task.convert({
  remote: true, work: true,
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})
await task.wait(work)
const out = await task.resolve(work)
```

```sh
task convert image -I png -O jpg -i a.png -o a.jpg --explain
task convert image -I png -O jpg -i a.png -o a.jpg --remote --work
```

## convert

```ts
// png → jpg (imagemagick picked automatically)
await task.convert({
  input:  { format: 'png', file: { path: 'a.png' } },
  output: { format: 'jpg', file: { path: 'a.jpg' } },
})

// docx → pdf, force a specific backend
await task.convert({
  tool:   'libre-office',
  input:  { format: 'docx', file: { path: 'a.docx' } },
  output: { format: 'pdf',  file: { path: 'a.pdf'  } },
})

// folder-tree csv → json (uses the new transform routes)
await task.convert({
  input:  { format: 'csv',  directory: { path: 'records/' } },
  output: { format: 'json', directory: { path: 'records.json/' } },
})

// xlsx → csv (single sheet)
await task.convert({
  input:  { format: 'xlsx', directory: { path: 'sheets/' } },
  output: { format: 'csv',  directory: { path: 'sheets.csv/' } },
})

// json → yaml round-trip
await task.convert({
  input:  { format: 'json', directory: { path: 'data/' } },
  output: { format: 'yaml', directory: { path: 'data.yaml/' } },
})
```

```sh
task convert a.png a.jpg
task convert image -I png -O jpg -i a.png -o a.jpg
task convert document -I docx -O pdf --tool libre-office -i a.docx -o a.pdf
task convert data -I csv -O json -i records/ -o records.json/
task convert data -I xlsx -O csv -i sheets/ -o sheets.csv/
task convert data -I json -O yaml -i data/ -o data.yaml/
```

## compress / trim / resize / rotate / flip / normalize

```ts
await task.compress({
  input:  { file: { path: 'pic.jpg' } },
  output: { file: { path: 'pic.small.jpg' } },
  quality: '60',
})
await task.trim({
  input:  { file: { path: 'clip.mp4' } },
  output: { file: { path: 'cut.mp4' } },
  start: '0', end: '10',
})
await task.resize({
  input:  { file: { path: 'clip.mp4' } },
  output: { file: { path: 'clip.thumb.mp4' } },
  width: 320, height: 180,
})
await task.rotate({
  input:  { file: { path: 'fire.gif' } },
  output: { file: { path: 'fire.rot.gif' } },
  degree: '90',
})
await task.flip({
  input:  { file: { path: 'fire.gif' } },
  output: { file: { path: 'fire.flip.gif' } },
  horizontal: true,
})
await task.normalize({
  input:  { file: { path: 'song.mp3' } },
  output: { file: { path: 'song.norm.mp3' } },
})
```

```sh
task compress pic.jpg -o pic.small.jpg --quality 60
task trim clip.mp4 -s 0 -e 10 -o cut.mp4
task resize clip.mp4 --width 320 --height 180 -o clip.thumb.mp4
task rotate fire.gif --degree 90 -o fire.rot.gif
task flip fire.gif --horizontal -o fire.flip.gif
task normalize song.mp3 -o song.norm.mp3
```

## compile / format

```ts
// compile dispatches by `input.format`
await task.compile({
  input:  { format: 'rust', file: { path: 'main.rs' } },
  output: { format: 'binary', file: { path: 'main' } },
})

// format dispatches by `language` (mapped to the schema's `format`)
await task.format({
  language: 'python',
  input:  { file: { path: 'hello.py' } },
  output: { file: { path: 'hello.py' } },
})
```

```sh
task compile rust src/main.rs -o build/main
task compile c hello.c -o hello
task compile swift main.swift -o main
task format python hello.py
task format rust src/main.rs
task format c hello.c             # routes to clang-format
```

## inspect (file / tls / dns)

```ts
// file: default — type, size, codec / dimensions / metadata table
await task.inspect({
  input: { file: { path: 'pic.jpg' } },
})

// tls: openssl s_client + Node X509Certificate parser
await task.inspect({
  thing: 'tls',
  host: 'clue.surf',
  port: 443,
})

// dns: local resolver lookup (or Cloudflare zone records via tool)
await task.inspect({
  thing: 'dns',
  host:  'cloudflare.com',
  type:  'MX',
})
```

```sh
task inspect file report.pdf
task inspect tls clue.surf
task inspect tls api.example.com -p 8443
task inspect tls smtp.example.com -p 587 --starttls smtp
task inspect dns cloudflare.com
task inspect dns cloudflare.com -t MX
task inspect dns example.com --resolver 1.1.1.1
task inspect dns example.com --tool cloudflare       # zone records
```

## query (sql / db)

```ts
// DuckDB over a CSV / Parquet / JSONL file
await task.query({
  sql: "SELECT count(*) FROM 'logs/*.jsonl' WHERE level='error'",
})

// Convenience: skip writing SQL by hand
await task.query({
  from:   'data/users.csv',
  select: 'id, email',
  where:  'active = true',
  limit:  100,
  format: 'json',
})

// Postgres via psql
await task.query({
  tool: 'psql',
  db:   'postgres://localhost/mydb',
  sql:  'SELECT count(*) FROM users',
})
```

```sh
task query sql duckdb --from data/users.csv --limit 10
task query sql duckdb --sql "SELECT * FROM read_parquet('logs/*.parquet')"
task query sql duckdb --from logs.jsonl --select 'level, count(*)' \
                     --where "level='error'" --render json
task query db mydb 'SELECT now()' --format json
```

## parse (entity / link / table / code / html)

```ts
// entity: emails / urls / ips / phones / cc / ssn / mac / bitcoin / uuid
await task.parse({
  thing: 'entity',
  input: { text: 'reach me at me@x.com or https://x.com from 10.0.0.1' },
})

// entity: scope to specific kinds
await task.parse({
  thing: 'entity',
  input: { file: { path: 'logs/page.html' } },
  kinds: ['email', 'url'],
})

// link: hrefs + alt + opengraph from HTML
await task.parse({
  thing: 'link',
  input: { file: { path: 'page.html' } },
  base:  'https://example.com',
})

// table: pull tables out of html / docx / pdf
await task.parse({
  thing: 'table',
  input: { file: { path: 'report.docx' } },
})
```

```sh
task parse entity logs/page.html
task parse entity --text 'reach a@x.com or https://x.com'
task parse entity README.md -k email,url
task parse link page.html --base https://example.com
task parse link readme.md --mode text
task parse table report.docx -o tables.json
task parse table page.html -i 0
task parse table invoice.pdf            # text-position layout heuristic
```

## isolate (image)

```ts
// pdf: pdfimages (poppler) — native encoding preserved
await task.isolate({
  input:  { file: { path: 'report.pdf' } },
  output: { directory: { path: 'pdf-images/' } },
})

// docx: mammoth's image handler captures every embedded image
await task.isolate({
  input:  { file: { path: 'notes.docx' } },
  output: { directory: { path: 'docx-images/' } },
})

// html: data: URIs only (use `task fetch` deliberately for remote)
await task.isolate({
  input:  { file: { path: 'page.html' } },
  output: { directory: { path: 'html-images/' } },
})
```

```sh
task isolate image report.pdf -o ./images
task isolate image report.pdf -o ./images --mode png   # re-encode to PNG
task isolate image notes.docx -o ./images
task isolate image page.html -o ./images --prefix fig
```

## transform (data)

```ts
// --map: declarative rename / pick / drop / coerce / default
await task.transform({
  thing: 'data',
  input:  { file: { path: 'users.csv' } },
  output: { file: { path: 'users.json' } },
  driver: 'map',
  mapConfig: 'mapping.yml',
})

// --jq: jq-wasm pipeline (no native jq required)
await task.transform({
  thing: 'data',
  input:  { file: { path: 'logs.jsonl' } },
  output: { file: { path: 'errors.json' } },
  driver: 'jq',
  jq:     '.[] | select(.level == "error")',
})

// --sql: DuckDB — input is bound as `in`
await task.transform({
  thing: 'data',
  input:  { file: { path: 'data.csv' } },
  output: { file: { path: 'active.json' } },
  driver: 'sql',
  sql:    'SELECT id, email FROM in WHERE active',
})
```

```sh
task transform data users.csv --map mapping.yml -o users.json
task transform data logs.jsonl --jq '.[] | select(.level=="error")'
task transform data data.csv --sql "SELECT id,email FROM in WHERE active"
```

`mapping.yml` shape:

```yaml
rename:
  full_name: name
pick: [id, name, email]
drop:    [internal_notes]
coerce:
  id: integer
  created_at: date
default:
  active: true
```

Order is `rename → drop → coerce → default → pick`, so `pick`
strictly limits the output keys regardless of what `default` adds.

## scan (env)

```ts
await task.scan({
  thing:  'env',
  tool:   'gitleaks',          // or 'trufflehog'
  path:   '.',
  history: true,               // include git history (default: working tree)
  report: 'leaks.json',
  reportFormat: 'json',
})
```

```sh
task scan env                                       # working tree
task scan env ./services --history                  # + git history
task scan env --tool trufflehog
task scan env --report leaks.json --report-format sarif
```

## profile (cpu)

```ts
// auto-picks samply for native binaries, 0x for `node` commands
await task.profile({
  thing:   'cpu',
  command: ['./target/release/parse', 'big.csv'],
})

// force clinic for a richer Node breakdown
await task.profile({
  thing:   'cpu',
  tool:    'clinic',
  command: ['node', 'server.js'],
})

// attach to a running pid (samply only)
await task.profile({
  thing: 'cpu',
  pid:   4242,
})
```

```sh
task profile cpu --command "./target/release/parse"
task profile cpu --command "node server.js" --tool clinic
task profile cpu --pid 4242
task profile cpu --command "node app.js" --tool clinic --tool-mode bubbleprof
```

## trace (process)

```ts
// auto-picks per OS — strace (linux) / dtruss (mac) / procmon (win)
await task.trace({
  thing:   'process',
  pid:     42,
  summary: true,                 // strace -c
})

await task.trace({
  thing:    'process',
  command:  ['ls', '/tmp'],
  follow:   true,
  syscalls: 'open,read,write',
})
```

```sh
task trace process --pid 42 --summary
task trace process --command "ls /tmp" --follow
task trace process --command "ls /tmp" --syscalls open,read,write
task trace process --pid 42 --tool dtruss             # force backend
```

## download (video — yt-dlp + others)

```ts
// any yt-dlp-supported site (1500+: YouTube, TikTok, Vimeo, Twitch, …)
await task.download({
  thing: 'video',
  url:   'https://youtu.be/abc',
  output: '%(title)s [%(id)s].%(ext)s',
  format: 'bestvideo*+bestaudio/best',
  remux:  'mp4',
  embedThumbnail: true,
  embedMetadata:  true,
})

// audio-only mp3
await task.download({
  thing: 'video',
  url:   'https://youtu.be/abc',
  audioOnly: true,
  audioFormat: 'mp3',
})

// playlist range
await task.download({
  thing: 'video',
  url:   'https://www.youtube.com/playlist?list=XYZ',
  playlistStart: 1,
  playlistEnd:   5,
})

// existing storage targets stay the same
await task.download({
  location:  { service: 's3', bucket: 'my-bucket' },
  reference: { file: { path: 'foo/a.jpg' } },
  output:    { file: { path: 'a.jpg' } },
})
```

```sh
task download video https://youtu.be/abc
task download video https://youtu.be/abc --audio-only --audio-format mp3
task download video https://youtu.be/abc \
  --video-format "bv*+ba/b[height<=1080]" --remux mp4 --embed-metadata --embed-thumbnail
task download video https://www.youtube.com/playlist?list=XYZ --playlist-end 5

task download s3 --bucket my-bucket --key foo/a.jpg -o a.jpg
task download hugging-face --repo-id meta-llama/Llama-3-8B
```

## combine (image + audio → video)

```ts
// Loop a still image for the audio's duration; h264/aac defaults
await task.combine({
  input:  { file: { path: 'cover.png' } },
  audio:  { file: { path: 'song.mp3' } },
  output: { file: { path: 'song-with-cover.mp4' } },
})

// Override codecs / bitrate / pixel format / tune
await task.combine({
  input:  { file: { path: 'cover.png' } },
  audio:  { file: { path: 'song.flac' } },
  output: { file: { path: 'out.mkv' } },
  videoCodec:   'libx265',
  audioCodec:   'aac',
  audioBitrate: '320k',
  pixelFormat:  'yuv420p',
  tune:         'stillimage',
})
```

```sh
task combine -i cover.png --audio song.mp3 -o song-with-cover.mp4
task combine -i cover.png --audio song.flac -o out.mkv \
  --video-codec libx265 --audio-bitrate 320k
```

## merge (concatenate same-format media)

```ts
// Concatenate three mp4 clips end-to-end (ffmpeg concat demuxer)
await task.merge({
  inputs: [
    { file: { path: 'a.mp4' } },
    { file: { path: 'b.mp4' } },
    { file: { path: 'c.mp4' } },
  ],
  output: { file: { path: 'whole.mp4' } },
})
```

```sh
task merge a.mp4 b.mp4 c.mp4 -o whole.mp4
```

## split (slice media at timestamps)

```ts
// Split a long video into 30-second chunks
await task.split({
  input:  { file: { path: 'long.mp4' } },
  output: { directory: { path: 'chunks/' } },
  segment: 30,
})
```

```sh
task split long.mp4 --segment 30 -o chunks/
```

## pad (extend / silence-pad audio or video)

```ts
// Pad an audio file out to a target duration with silence
await task.pad({
  input:  { file: { path: 'short.mp3' } },
  output: { file: { path: 'padded.mp3' } },
  to: '3:00.000',
})
```

```sh
task pad short.mp3 --to 3:00.000 -o padded.mp3
task pad short.mp3 --to 3:00.000              # in-place (positional shorthand)
```

## archive / unpack

```ts
await task.archive({
  input:  { directory: { path: 'folder/' } },
  output: { format: 'zip', file: { path: 'folder.zip' } },
})

await task.unpack({
  input:  { format: 'zip', file: { path: 'folder.zip' } },
  output: { directory: { path: 'folder/' } },
})
```

```sh
task archive folder/ -o folder.zip
task archive folder/ -O tar.gz -o folder.tar.gz
task unpack folder.zip -o folder/
```

## fetch / sync

```ts
await task.fetch({
  urls: ['https://example.com/api/data'],
  output: 'data.json',
  retry: 3,
})

await task.sync({
  source:      'src/',
  destination: 'user@host:/srv/app/',
  delete:      true,
  exclude:     ['node_modules', '.git'],
})
```

```sh
task fetch https://example.com/api/data -o data.json --retry 3
task fetch https://example.com -o page.html --mirror
task sync ./src/ user@host:/srv/app/ --delete --exclude node_modules --exclude .git
task sync ./src/ ./dst/ --dry-run
```

## set (eol / encoding / metadata)

```ts
// EOL: lf ↔ crlf
await task.set({ eol: 'lf', file: 'crlf.txt' })

// character encoding
await task.set({ encoding: 'utf-8', file: 'latin1.txt' })

// id3 metadata
await task.set({
  input: { file: { path: 'song.mp3' } },
  title: 'The Title',
  artist: 'The Artist',
  album: 'The Album',
})
```

```sh
task set eol crlf.txt --eol lf
task set encoding latin1.txt --encoding utf-8
task set metadata song.mp3 --title "The Title" --artist "The Artist"
```

## detect

```ts
// detect bidirectional / RTL hazards in mixed-language text
await task.detect({ file: 'cookies.txt' })
```

```sh
task detect bidi cookies.txt
```

## fonts (subset / shape / render / dump)

```ts
// subset to the glyphs needed for a given string
await task.subset({
  input:  { file: { path: 'big.ttf' } },
  output: { file: { path: 'small.ttf' } },
  text:   'Hello world',
})

// shape text via harfbuzz
const out = await task.shape({
  input: { file: { path: 'fnt.ttf' } },
  text:  'office',
})
out.glyphs       // → 'fi-cid-…' shaped glyph string

// render a preview at chosen size
await task.render({
  input:  { file: { path: 'fnt.ttf' } },
  output: { file: { path: 'preview.png' } },
  text:   'Hello world',
  size:   72,
})

// dump font tables (TTX)
await task.dump({
  input:  { file: { path: 'fnt.ttf' } },
  output: { file: { path: 'fnt.ttx' } },
})
```

```sh
task subset big.ttf -o small.ttf --text "Hello world"
task shape  fnt.ttf --text office
task render fnt.ttf -o preview.png --text "Hello world" --size 72
task dump   fnt.ttf -o fnt.ttx
```

## highlight

```ts
// PDF text highlight
await task.highlight({
  input:  { file: { path: 'doc.pdf' } },
  output: { file: { path: 'doc.hl.pdf' } },
  text:   'critical',
})
```

```sh
task highlight doc.pdf -o doc.hl.pdf --text critical
```

## verify

```ts
// integrity / structural validation per format
await task.verify({
  input: { file: { path: 'pic.jpg' } },
})
```

```sh
task verify pic.jpg
```

## disassemble

```ts
// dispatch by extension: .wasm / .class / .jar / .dll / .exe / else radare
await task.disassemble({
  input:  { file: { path: 'a.wasm' } },
  output: { file: { path: 'a.wat' } },
})

await task.disassemble({
  input:  { file: { path: 'app.class' } },        // → javap
  output: { file: { path: 'app.javap' } },
})

await task.disassemble({
  input:  { file: { path: 'elf-bin' } },          // → radare2
  output: { file: { path: 'elf-bin.asm' } },
})
```

```sh
task disassemble a.wasm -o a.wat
task disassemble app.class -o app.javap
task disassemble elf-bin -o elf-bin.asm
```

## remove

```ts
// metadata strip (default)
await task.remove({ input: { file: { path: 'pic.jpg' } } })

// password strip from a PDF
await task.remove({
  input:  { file: { path: 'secret.pdf' } },
  output: { file: { path: 'open.pdf' } },
  password: 'p',
})

// transparency flatten
await task.remove({
  input:  { file: { path: 'a.png' } },
  output: { file: { path: 'a.flat.png' } },
  background: '#ffffff',
})

// EXIF tag-by-tag
await task.remove({
  input: { file: { path: 'pic.jpg' } },
  tag:   'GPSLatitude',
})
```

```sh
task remove metadata pic.jpg
task remove password secret.pdf -o open.pdf --password p
task remove transparency a.png -o a.flat.png --background "#ffffff"
task remove exif pic.jpg --tag GPSLatitude
```

## query / inspect / log / list — process & system

Node (via `task.inspect` / `task.list`):

```ts
// who owns a port
await task.inspect({ thing: 'port', port: 3000 })

// process detail by PID
await task.inspect({ thing: 'process', pid: 4242 })
```

```sh
task inspect port 3000
task inspect port 3000 --show process
task inspect process 4242
task list process --top memory --layout tree
task watch process --interval 1000 --top cpu
```

## CLI shorthand

Many verbs accept a positional path so you can drop the `-i` flag:

```sh
task convert a.png a.jpg            # extension-routed
task compress song.wav -o song.mp3
task trim clip.mp4 -s 10 -e 30 -o cut.mp4
task inspect report.pdf
task query sql duckdb --from data.csv --limit 10
task parse entity logs.txt
task isolate image report.pdf -o ./img
task transform data users.csv --jq '.[] | {id, email}'
task scan env
task download video https://youtu.be/abc
task combine -i cover.png --audio song.mp3 -o song-with-cover.mp4
```

Global flags on every verb:

```
-f, --format          pretty (default) / text / plain / json / json:pretty
-h, --help            tinted help layout
-v, --version
    --explain         print the native command, don't run it
    --log [pattern]   stream subprocess output (glob filter)
```

Shell completion:

```sh
task autocomplete >> ~/.zshrc && exec zsh         # zsh / iTerm2
task autocomplete >> ~/.bashrc && exec bash       # bash
task autocomplete > ~/.config/fish/completions/task.fish
```
