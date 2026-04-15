/**
 * Platform table for `task check username`.
 *
 * Each entry declares:
 *   url       profile URL with `{user}` placeholder
 *   method    how to decide "taken" vs "available"
 *             - status404   : HTTP 404 → available
 *             - status200body: 200 + body contains one of `notFound` → available
 *             - api          : custom JSON endpoint (npm, pypi)
 *   notFound  substrings in the body that indicate "not found" (for status200body)
 *
 * Keep entries sorted within each category.
 */

export type PlatformCheck = {
  name: string
  category: 'code' | 'social' | 'video' | 'chat' | 'writing' | 'registry' | 'design' | 'other'
  url: (user: string) => string
  method: 'status404' | 'status200body' | 'api'
  /** Substrings in the body that mean "user does NOT exist." */
  notFound?: string[]
  /** Replace the generic check with a custom fn (api method). */
  check?: (user: string) => Promise<'taken' | 'available' | 'unknown'>
}

// ---- helpers for status + body checks ---------------------------

async function head(url: string): Promise<number> {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), 8000)
  try {
    const r = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: c.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (task-check-username)' },
    })
    return r.status
  } catch { return 0 } finally { clearTimeout(t) }
}

async function getBody(url: string): Promise<{ status: number; body: string }> {
  const c = new AbortController()
  const t = setTimeout(() => c.abort(), 10_000)
  try {
    const r = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: c.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (task-check-username)' },
    })
    const body = await r.text()
    return { status: r.status, body }
  } catch { return { status: 0, body: '' } } finally { clearTimeout(t) }
}

// ---- the catalog ------------------------------------------------

export const PLATFORMS: PlatformCheck[] = [
  // --- code / dev ---
  { name: 'github',        category: 'code',     url: u => `https://github.com/${u}`,                      method: 'status404' },
  { name: 'gitlab',        category: 'code',     url: u => `https://gitlab.com/${u}`,                      method: 'status404' },
  { name: 'bitbucket',     category: 'code',     url: u => `https://bitbucket.org/${u}/`,                  method: 'status404' },
  { name: 'microsoft',     category: 'code',     url: u => `https://github.com/microsoft/${u}`,            method: 'status404' }, // MS presence on GH
  { name: 'stackoverflow', category: 'code',     url: u => `https://stackoverflow.com/users/${u}`,         method: 'status404' },
  { name: 'devto',         category: 'writing',  url: u => `https://dev.to/${u}`,                          method: 'status404' },
  { name: 'hashnode',      category: 'writing',  url: u => `https://hashnode.com/@${u}`,                   method: 'status404' },

  // --- registries ---
  {
    name: 'npm', category: 'registry',
    url: u => `https://registry.npmjs.org/-/user/org.couchdb.user:${u}`,
    method: 'api',
    check: async u => {
      const { status } = await getBody(`https://www.npmjs.com/~${u}`)
      return status === 200 ? 'taken' : status === 404 ? 'available' : 'unknown'
    },
  },
  {
    name: 'pypi', category: 'registry',
    url: u => `https://pypi.org/user/${u}/`,
    method: 'api',
    check: async u => {
      const { status } = await getBody(`https://pypi.org/user/${u}/`)
      return status === 200 ? 'taken' : status === 404 ? 'available' : 'unknown'
    },
  },
  {
    name: 'dockerhub', category: 'registry',
    url: u => `https://hub.docker.com/u/${u}`,
    method: 'api',
    check: async u => {
      const { status } = await getBody(`https://hub.docker.com/v2/users/${u}/`)
      return status === 200 ? 'taken' : status === 404 ? 'available' : 'unknown'
    },
  },
  { name: 'crates',        category: 'registry', url: u => `https://crates.io/users/${u}`,                 method: 'status404' },
  { name: 'rubygems',      category: 'registry', url: u => `https://rubygems.org/profiles/${u}`,           method: 'status404' },

  // --- social ---
  { name: 'twitter',       category: 'social', url: u => `https://twitter.com/${u}`,    method: 'status200body',
    notFound: ["This account doesn", 'page doesn', "isn't available"] },
  { name: 'x',             category: 'social', url: u => `https://x.com/${u}`,          method: 'status200body',
    notFound: ["This account doesn", "isn't available"] },
  { name: 'instagram',     category: 'social', url: u => `https://www.instagram.com/${u}/`, method: 'status404' },
  { name: 'facebook',      category: 'social', url: u => `https://www.facebook.com/${u}`,   method: 'status200body',
    notFound: ['The link you followed may be broken', "isn't available right now"] },
  { name: 'linkedin',      category: 'social', url: u => `https://www.linkedin.com/in/${u}`, method: 'status404' },
  { name: 'reddit',        category: 'social', url: u => `https://www.reddit.com/user/${u}`, method: 'status200body',
    notFound: ['Sorry, nobody on Reddit goes by that name', 'page not found'] },
  { name: 'pinterest',     category: 'social', url: u => `https://www.pinterest.com/${u}/`, method: 'status404' },
  { name: 'snapchat',      category: 'social', url: u => `https://www.snapchat.com/add/${u}`, method: 'status404' },

  // --- video ---
  { name: 'youtube',       category: 'video', url: u => `https://www.youtube.com/@${u}`, method: 'status404' },
  { name: 'tiktok',        category: 'video', url: u => `https://www.tiktok.com/@${u}`,  method: 'status200body',
    notFound: ["Couldn't find this account"] },
  { name: 'twitch',        category: 'video', url: u => `https://www.twitch.tv/${u}`,    method: 'status200body',
    notFound: ['Sorry. Unless you', 'content is unavailable'] },
  { name: 'kick',          category: 'video', url: u => `https://kick.com/${u}`,         method: 'status404' },
  { name: 'vimeo',         category: 'video', url: u => `https://vimeo.com/${u}`,        method: 'status404' },

  // --- chat ---
  { name: 'discord',       category: 'chat', url: u => `https://discord.com/users/${u}`, method: 'status404' },
  { name: 'telegram',      category: 'chat', url: u => `https://t.me/${u}`,              method: 'status200body',
    notFound: ['If you have Telegram, you can contact'] }, // shown only for non-existent; taken handles show profile
  { name: 'whatsapp',      category: 'chat', url: u => `https://wa.me/${u}`,             method: 'status200body',
    notFound: ['Phone number shared via url is invalid'] }, // whatsapp keys off phone; loose check

  // --- writing ---
  { name: 'medium',        category: 'writing', url: u => `https://medium.com/@${u}`,    method: 'status404' },
  { name: 'substack',      category: 'writing', url: u => `https://${u}.substack.com`,   method: 'status200body',
    notFound: ['There is no newsletter here'] },

  // --- design ---
  { name: 'behance',       category: 'design', url: u => `https://www.behance.net/${u}`, method: 'status404' },
  { name: 'dribbble',      category: 'design', url: u => `https://dribbble.com/${u}`,    method: 'status404' },
  { name: 'figma',         category: 'design', url: u => `https://www.figma.com/@${u}`,  method: 'status404' },
  { name: 'notion',        category: 'design', url: u => `https://${u}.notion.site`,     method: 'status200body',
    notFound: ['Page not found', 'This workspace no longer exists'] },
]

export function allPlatformNames(): string[] {
  return PLATFORMS.map(p => p.name)
}

export function platformByName(name: string): PlatformCheck | undefined {
  return PLATFORMS.find(p => p.name === name.toLowerCase())
}

// ---- the generic probe ------------------------------------------

export async function probe(
  platform: PlatformCheck,
  user: string,
): Promise<{ status: 'taken' | 'available' | 'unknown'; url: string }> {
  const url = platform.url(user)
  if (platform.check) {
    const status = await platform.check(user)
    return { status, url }
  }
  if (platform.method === 'status404') {
    const s = await head(url)
    if (s === 0) return { status: 'unknown', url }
    if (s === 404) return { status: 'available', url }
    if (s >= 200 && s < 400) return { status: 'taken', url }
    return { status: 'unknown', url }
  }
  // status200body — HEAD is unreliable; do GET + body match.
  const { status, body } = await getBody(url)
  if (status === 0) return { status: 'unknown', url }
  if (status === 404) return { status: 'available', url }
  if (status >= 200 && status < 400) {
    const hit = platform.notFound?.some(s => body.includes(s)) ?? false
    return { status: hit ? 'available' : 'taken', url }
  }
  return { status: 'unknown', url }
}
