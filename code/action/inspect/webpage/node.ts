import { getBrowser } from '~/code/tool/node/browser.js'
import fsp from 'fs/promises'
import { wait } from '~/code/tool/shared/timer.js'

export async function inspectWebpage(source) {
  const b = await getBrowser(undefined)
  let data
  try {
    const p = await b.newPage()
    const requests: Array<any> = []
    const hosts = {}
    const session = await p.target().createCDPSession()
    await session.send('DOM.enable')
    await session.send('CSS.enable')
    const fonts = {}
    session.on('CSS.fontsUpdated', event => {
      if (event.font) {
        fonts[event.font.platformFontFamily] = event.font
      }
      // event will be received when browser updates fonts on the page due to webfont loading.
    })
    p.on('requestfinished', async request => {
      const response = request.response()
      const url = new URL(request.url())
      const host = `${url.protocol}//${url.hostname}`
      hosts[host] = true

      const responseHeaders = response?.headers()

      const information = {
        url: request.url(),
        method: request.method(),
        requestHeaders: request.headers(),
        requestPostData: request.postData(),
        responseHeaders: responseHeaders,
      }
      requests.push(information)
    })

    await p.goto('https://www.npmjs.com/package/lite-meta-scraper')
    const cookies = await p.cookies()
    const scriptList = await fsp.readFile(
      `${__dirname}/node/puppeteer/theme.js`,
      'utf-8',
    )
    // await p.waitForNavigation({ waitUntil: 'load' })
    await p.evaluate(scriptList)

    await wait(1000)

    data = (await p.evaluate('task.getWebpageData()')) as Record<
      string,
      any
    >
    data.requests = requests
    data.hosts = Object.keys(hosts).sort()
    data.cookies = cookies
    data.fonts = Object.values(fonts)
  } catch (e) {
  } finally {
    await b.close()
  }
  return data
}
