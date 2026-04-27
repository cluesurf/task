import { describe, it, expect } from 'vitest'
import { buildCommandToDownloadVideoYtDlp } from '~/code/call/download/video/yt-dlp/command'

// Pure-function tests on the argv builder. Running yt-dlp
// against a real video requires network + the binary on PATH;
// gate that case via the console smoke test.

describe('download video — yt-dlp argv builder', () => {
  it('forwards a basic URL', () => {
    const c = buildCommandToDownloadVideoYtDlp({
      url: 'https://youtu.be/abc',
    })
    expect(c.bin).toBe('yt-dlp')
    expect(c.args[c.args.length - 1]).toBe('https://youtu.be/abc')
  })

  it('handles audio-only with format', () => {
    const c = buildCommandToDownloadVideoYtDlp({
      url: 'https://youtu.be/abc',
      audioOnly: true,
      audioFormat: 'mp3',
    })
    expect(c.args).toContain('-x')
    expect(c.args).toContain('--audio-format')
    expect(c.args).toContain('mp3')
  })

  it('threads through format / remux / output', () => {
    const c = buildCommandToDownloadVideoYtDlp({
      url: 'https://youtu.be/abc',
      output: '%(title)s.%(ext)s',
      format: 'bestvideo*+bestaudio/best',
      remux: 'mp4',
    })
    expect(c.args).toContain('-o')
    expect(c.args).toContain('%(title)s.%(ext)s')
    expect(c.args).toContain('-f')
    expect(c.args).toContain('bestvideo*+bestaudio/best')
    expect(c.args).toContain('--remux-video')
    expect(c.args).toContain('mp4')
  })

  it('embeds metadata + thumbnail + chapters', () => {
    const c = buildCommandToDownloadVideoYtDlp({
      url: 'https://youtu.be/abc',
      embedThumbnail: true,
      embedChapters: true,
      embedMetadata: true,
    })
    expect(c.args).toContain('--embed-thumbnail')
    expect(c.args).toContain('--embed-chapters')
    expect(c.args).toContain('--embed-metadata')
  })

  it('joins subtitle languages with a comma', () => {
    const c = buildCommandToDownloadVideoYtDlp({
      url: 'https://youtu.be/abc',
      subtitles: ['en', 'es', 'fr'],
    })
    expect(c.args).toContain('--write-subs')
    expect(c.args).toContain('--sub-langs')
    expect(c.args).toContain('en,es,fr')
  })

  it('emits playlist range + cookies + rate limit', () => {
    const c = buildCommandToDownloadVideoYtDlp({
      url: 'https://youtube.com/playlist?list=XYZ',
      playlistStart: 1,
      playlistEnd: 5,
      cookies: '/tmp/cookies.txt',
      rateLimit: '2M',
      skipExisting: true,
    })
    expect(c.args).toContain('--playlist-start')
    expect(c.args).toContain('1')
    expect(c.args).toContain('--playlist-end')
    expect(c.args).toContain('5')
    expect(c.args).toContain('--cookies')
    expect(c.args).toContain('/tmp/cookies.txt')
    expect(c.args).toContain('--limit-rate')
    expect(c.args).toContain('2M')
    expect(c.args).toContain('--no-overwrites')
  })

  it('throws when url is missing', () => {
    expect(() =>
      buildCommandToDownloadVideoYtDlp({ url: '' }),
    ).toThrow(/url is required/)
  })
})
