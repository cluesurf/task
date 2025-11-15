// https://github.com/z1nc0r3/twitter-video-downloader/blob/main/twitter_downloader.py

import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as process from 'process'
import { JSDOM } from 'jsdom'

/**
 * Create a progress bar in the console
 */
class ProgressBar {
  private total: number
  private current: number = 0
  private barLength: number = 30
  private unitScale: boolean
  private unit: string

  constructor(
    total: number,
    unit: string = 'B',
    unitScale: boolean = true,
  ) {
    this.total = total
    this.unit = unit
    this.unitScale = unitScale
  }

  update(value: number): void {
    this.current += value
    const percentage = this.total
      ? Math.round((this.current / this.total) * 100)
      : 0
    const filledLength = Math.round(
      (this.barLength * this.current) / this.total,
    )
    const bar =
      '█'.repeat(filledLength) +
      '-'.repeat(this.barLength - filledLength)

    const formattedSize = this.unitScale
      ? this.formatSize(this.current)
      : `${this.current}${this.unit}`
    const formattedTotal = this.unitScale
      ? this.formatSize(this.total)
      : `${this.total}${this.unit}`

    process.stdout.write(
      `\r|${bar}| ${percentage}% ${formattedSize}/${formattedTotal}`,
    )
  }

  private formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }

    return `${size.toFixed(2)}${units[unitIndex]}`
  }

  close(): void {
    process.stdout.write('\n')
  }
}

/**
 * Download a video from a URL into a filename.
 * @param url The video URL to download
 * @param fileName The file name or path to save the video to
 */
async function downloadVideo(
  url: string,
  fileName: string,
): Promise<void> {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `Failed to download video: ${response.status} ${response.statusText}`,
      )
    }

    if (!response.body) {
      throw new Error('Response body is null')
    }

    const contentLength = parseInt(
      response.headers.get('content-length') || '0',
      10,
    )
    const reader = response.body.getReader()
    const progressBar = new ProgressBar(contentLength)

    const downloadPath = path.join(os.homedir(), 'Downloads', fileName)
    const fileStream = fs.createWriteStream(downloadPath)

    let receivedLength = 0

    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      receivedLength += value.length
      progressBar.update(value.length)
      fileStream.write(Buffer.from(value))
    }

    progressBar.close()
    fileStream.end()
    console.log('Video downloaded successfully!')
  } catch (error) {
    console.error('Error downloading video:', error)
  }
}

/**
 * Extract the highest quality video url to download into a file
 * @param url The twitter post URL to download from
 */
export async function downloadTwitterVideo(url: string): Promise<void> {
  try {
    const apiUrl = `https://twitsave.com/info?url=${url}`
    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Twitter video info: ${response.status} ${response.statusText}`,
      )
    }

    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document

    const downloadButton = document.querySelectorAll(
      'div.origin-top-right',
    )[0]
    if (!downloadButton) {
      throw new Error('Could not find download button element')
    }

    const qualityButtons = downloadButton.querySelectorAll('a')
    if (!qualityButtons.length) {
      throw new Error('Could not find quality buttons')
    }

    // Highest quality video url
    const highestQualityUrl = qualityButtons[0].getAttribute('href')
    if (!highestQualityUrl) {
      throw new Error('Could not find video URL')
    }

    const fileNameElement = document
      .querySelectorAll('div.leading-tight')[0]
      ?.querySelectorAll('p.m-2')[0]
    if (!fileNameElement) {
      throw new Error('Could not find file name element')
    }

    // Video file name
    let fileName = fileNameElement.textContent || 'twitter_video'
    // Remove special characters from file name
    fileName = fileName.replace(/[^a-zA-Z0-9]+/g, ' ').trim() + '.mp4'

    await downloadVideo(highestQualityUrl, fileName)
  } catch (error) {
    console.error('Error downloading Twitter video:', error)
  }
}
