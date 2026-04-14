// https://github.com/fbdown/fbdown.github.io/blob/master/src/Downloader.php

interface VideoInfo {
  title: string | null
  description: string | false
  owner: string | false
  created_time: string | false
  hd_link: string | false
  sd_link: string | false
  id: string
}

interface RequestOptions {
  headers?: Record<string, string>
  [key: string]: any
}

export class Downloader {
  private static promises: Promise<Response>[] = []
  protected body = ''

  public async getSourceCode(url: string): Promise<string> {
    const response = await this.httpRequest(url)
    if (!response) {
      throw new Error('Request failed')
    }

    const status = response.status
    if (status === 200) {
      this.body = await response.text()
      return this.body
    }

    throw new Error(
      `Something went wrong, HTTP Status Code Returned: ${status}`,
    )
  }

  private async httpRequest(
    url: string,
    options: RequestOptions = {},
    isAsyncRequest = false,
  ): Promise<Response | false> {
    if (!url || url.trim() === '') {
      return false
    }

    const requestOptions = this.getOptions(
      this.defaultHeaders(),
      options,
    )

    try {
      const request = fetch(url, requestOptions)

      if (isAsyncRequest) {
        Downloader.promises.push(request)
        return false
      } else {
        return await request
      }
    } catch (e) {
      return false
    }
  }

  private getOptions(
    headers: Record<string, string>,
    options: RequestOptions = {},
  ): RequestOptions {
    const defaultOptions: RequestOptions = {
      method: 'GET',
      headers: headers,
    }

    return { ...defaultOptions, ...options }
  }

  protected defaultHeaders(): Record<string, string> {
    return {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.71 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.8,sr;q=0.6,pt;q=0.4',
    }
  }

  protected decodeUnicode(str: string): string {
    return str.replace(/\\u([0-9a-f]{4})/gi, (_, group1) => {
      return String.fromCharCode(parseInt(group1, 16))
    })
  }

  protected cleanStr(str: string | null): string {
    if (!str) return ''

    // Create a temporary element to handle HTML entities
    const doc = new DOMParser().parseFromString(str, 'text/html')
    return doc.body.textContent || ''
  }

  public generateUrl(url: string | number): string | false {
    let id = ''

    if (typeof url === 'number') {
      id = url.toString()
    } else {
      const regex =
        /^http(?:s?):\/\/(?:www\.|web\.|m\.)?facebook\.com\/([A-z0-9\.]+)\/videos(?:\/[0-9A-z].+)?\/(\d+)(?:.+)?$/
      const matches = regex.exec(url)

      if (matches?.[2]) {
        id = matches[2]
      }
    }

    if (!id) {
      return false
    }

    return `https://www.facebook.com/video.php?v=${id}`
  }

  public async getVideoInfo(
    url: string | number,
  ): Promise<VideoInfo | false> {
    const generatedUrl = this.generateUrl(url)
    if (!generatedUrl) {
      return false
    }

    await this.getSourceCode(generatedUrl)

    const title = this.getTitle()
    if (
      title?.toLowerCase() ===
      "sorry, this content isn't available at the moment"
    ) {
      return false
    }

    const description = this.getDescription()
    const owner = this.getValueByKey('ownerName')
    const created_time = this.getCreatedTime()
    const hd_link = this.getValueByKey('hd_src_no_ratelimit')
    const sd_link = this.getValueByKey('sd_src_no_ratelimit')

    // Parse URL to get the video ID
    const urlObj = new URL(generatedUrl)
    const id = urlObj.searchParams.get('v') || ''

    return {
      title,
      description,
      owner,
      created_time,
      hd_link,
      sd_link,
      id,
    }
  }

  public getTitle(): string | null {
    let title = null
    let matches

    if (
      (matches = /h2 class="uiHeaderTitle"?[^>]+>(.+?)<\/h2>/.exec(
        this.body,
      ))
    ) {
      title = matches[1]
    } else if (
      (matches = /<title[^>]*>([^<]+)<\/title>/im.exec(this.body))
    ) {
      title = matches[1]
    }

    return title ? this.cleanStr(title) : null
  }

  public getDescription(): string | false {
    const matches = /span class="hasCaption">(.+?)<\/span>/.exec(
      this.body,
    )
    if (matches) {
      return this.cleanStr(matches[1]!)
    }
    return false
  }

  public getCreatedTime(): string | false {
    const matches = /data-utime="(.+?)"/.exec(this.body)
    if (matches) {
      return matches[1]!
    }
    return false
  }

  public getValueByKey(key: string): string | false {
    const matches = new RegExp(`${key}:"(.*?)"`, 'i').exec(this.body)
    if (matches) {
      const str = this.decodeUnicode(matches[1]!)
      return decodeURIComponent(str.replace(/\\/g, ''))
    }
    return false
  }
}
