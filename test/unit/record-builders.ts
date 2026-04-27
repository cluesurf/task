/**
 * Unit asserts for the record / replay command builders.
 * No ffmpeg / asciinema / agg required — checks the pure
 * argv shape each builder returns.
 *
 * Invoked from `test/console/record.sh`.
 */

import {
  buildScreenRecordCommand,
  buildTerminalRecordCommand,
  planReplay,
  renderAsciinemaHtml,
  shouldEmitHtml,
  castPath,
  type RecordCommand,
} from '~/code/tool/shared/record/command'

let failures = 0

function assert(label: string, cond: unknown, detail?: string): void {
  if (cond) {
    process.stdout.write(`  ✓ ${label}\n`)
  } else {
    failures++
    process.stdout.write(`  ✗ ${label}${detail ? ` — ${detail}` : ''}\n`)
  }
}

function joined(c: RecordCommand): string {
  return `${c.bin} ${c.args.join(' ')}`
}

// ── screen ──────────────────────────────────────────────────
{
  const c = buildScreenRecordCommand({ output: 'demo.mp4', framerate: 30 })
  assert('screen: bin is ffmpeg',          c.bin === 'ffmpeg')
  assert('screen: framerate flag',         c.args.includes('-framerate'), joined(c))
  assert('screen: -y output last',         c.args[c.args.length - 1] === 'demo.mp4')
  if (process.platform === 'darwin') {
    assert('screen mac: avfoundation',     c.args.includes('avfoundation'))
  } else if (process.platform === 'linux') {
    assert('screen linux: x11grab',        c.args.includes('x11grab'))
  } else if (process.platform === 'win32') {
    assert('screen win: gdigrab',          c.args.includes('gdigrab'))
  }
}

// ── screen with region (cross-platform) ─────────────────────
{
  const c = buildScreenRecordCommand({
    output: 'crop.mp4',
    region: { x: 10, y: 20, w: 800, h: 600 },
  })
  if (process.platform === 'linux') {
    assert('screen linux region: -i +x,y',
      c.args.some(a => a.includes('+10,20')), joined(c))
    assert('screen linux region: -video_size 800x600',
      c.args.some(a => a === '800x600'), joined(c))
  }
  if (process.platform === 'darwin') {
    assert('screen mac region: -vf crop=W:H:X:Y',
      c.args.some(a => a.includes('crop=800:600:10:20')), joined(c))
  }
}

// ── screen output codec selection ───────────────────────────
{
  const mp4  = buildScreenRecordCommand({ output: 'a.mp4'  })
  const webm = buildScreenRecordCommand({ output: 'a.webm' })
  const gif  = buildScreenRecordCommand({ output: 'a.gif'  })
  assert('mp4: libx264',     mp4.args.includes('libx264'),  joined(mp4))
  assert('webm: libvpx-vp9', webm.args.includes('libvpx-vp9'), joined(webm))
  assert('gif: palettegen',  gif.args.some(a => a.includes('palettegen')), joined(gif))
}

// ── terminal ────────────────────────────────────────────────
{
  const c = buildTerminalRecordCommand({
    output: 'demo.cast',
    title: 'Demo',
    idleLimit: 2,
  })
  assert('terminal: bin is asciinema',     c.bin === 'asciinema')
  assert('terminal: rec sub-cmd first',    c.args[0] === 'rec')
  assert('terminal: -t title',             c.args.includes('-t') && c.args.includes('Demo'))
  assert('terminal: -i idle-limit',        c.args.includes('-i') && c.args.includes('2'))
}

// ── terminal html output → cast sidecar ─────────────────────
{
  const c = buildTerminalRecordCommand({ output: 'demo.html' })
  assert('terminal html: writes .cast not .html', c.args.includes('demo.cast'), joined(c))
  assert('castPath: html → cast',          castPath('demo.html') === 'demo.cast')
  assert('castPath: cast → cast',          castPath('demo.cast') === 'demo.cast')
  assert('shouldEmitHtml: html ext',       shouldEmitHtml({ output: 'demo.html' }) === true)
  assert('shouldEmitHtml: cast ext',       shouldEmitHtml({ output: 'demo.cast' }) === false)
  assert('shouldEmitHtml: --html flag',    shouldEmitHtml({ output: 'demo.cast', html: true }) === true)
}

// ── replay: play ────────────────────────────────────────────
{
  const p = planReplay({ input: 'demo.cast', speed: 2, idleLimit: 1 })
  if (p.kind !== 'play') {
    failures++
    process.stdout.write(`  ✗ replay play: kind=${p.kind}\n`)
  } else {
    assert('replay play: bin is asciinema', p.command.bin === 'asciinema')
    assert('replay play: -s 2',             p.command.args.join(' ').includes('-s 2'))
    assert('replay play: -i 1',             p.command.args.join(' ').includes('-i 1'))
  }
}

// ── replay: gif ─────────────────────────────────────────────
{
  const p = planReplay({ input: 'demo.cast', output: 'demo.gif', speed: 2 })
  if (p.kind !== 'gif') {
    failures++
    process.stdout.write(`  ✗ replay gif: kind=${p.kind}\n`)
  } else {
    assert('replay gif: bin is agg',         p.command.bin === 'agg')
    assert('replay gif: --speed forwarded',  p.command.args.includes('--speed'))
    assert('replay gif: output set',         p.output === 'demo.gif')
  }
}

// ── replay: mp4 chain ───────────────────────────────────────
{
  const p = planReplay({ input: 'demo.cast', output: 'demo.mp4' })
  if (p.kind !== 'mp4') {
    failures++
    process.stdout.write(`  ✗ replay mp4: kind=${p.kind}\n`)
  } else {
    assert('replay mp4: two-step plan',       p.commands.length === 2)
    assert('replay mp4: agg → ffmpeg',        p.commands[0]!.bin === 'agg' && p.commands[1]!.bin === 'ffmpeg')
    assert('replay mp4: tmp gif cleaned up',  p.cleanup?.length === 1 && p.cleanup[0]!.endsWith('.tmp.gif'))
    assert('replay mp4: ffmpeg yuv420p',      p.commands[1]!.args.includes('yuv420p'))
  }
}

// ── replay: html ────────────────────────────────────────────
{
  const p = planReplay({ input: 'demo.cast', output: 'demo.html' })
  if (p.kind !== 'html') {
    failures++
    process.stdout.write(`  ✗ replay html: kind=${p.kind}\n`)
  } else {
    assert('replay html: output path',        p.output === 'demo.html')
  }
  // Implicit format from extension only — no ffmpeg / agg shell
  // out for the html branch.
}

// ── html template ───────────────────────────────────────────
{
  const html = renderAsciinemaHtml({ castUrl: 'demo.cast', title: 'Demo', speed: 2 })
  assert('html: includes asciinema-player', html.includes('asciinema-player'))
  assert('html: references cast url',       html.includes('"demo.cast"'))
  assert('html: speed embedded',            html.includes('speed:     2'))
  assert('html: title escaped + present',   html.includes('<title>Demo</title>'))
  // XSS sanity: a rude title shouldn't render an executable tag.
  const evil = renderAsciinemaHtml({ castUrl: 'x', title: '<script>alert(1)</script>' })
  assert('html: title escapes <script>',    !evil.includes('<script>alert(1)</script>'))
  assert('html: title <→&lt;',              evil.includes('&lt;script&gt;'))
}

if (failures > 0) {
  process.stdout.write(`\n  ${failures} assertion(s) failed\n`)
  process.exit(1)
}
process.stdout.write('\n  all builder asserts pass\n')
