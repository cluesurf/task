import bytes from 'bytes'
import child_process from 'child_process'
import kink from '~/code/tool/shared/kink'
import {
  ChildProcessError,
  Message,
  exec,
} from '~/code/tool/node/process'
import Kink from '@termsurf/kink'
import { stripAnsiFromText } from '~/code/cli/logging'

// https://stackoverflow.com/questions/747982/can-ffmpeg-show-a-progress-bar

// https://www.npmjs.com/package/file-type
// https://github.com/apache/tika
import {
  Command,
  ConvertVideoWithFfmpegNodeInput,
  ConvertVideoWithFfmpegNodeLocalInput,
  ConvertVideoWithFfmpegNodeLocalInputParser,
} from '~/code/type/node/parser'
import { buildCommandToConvertVideoWithFfmpeg } from '../command'

export async function handleFfmpegCommand(
  cmd: Command,
  onUpdate?: (msg: any) => void,
): Promise<void> {
  return new Promise((res, rej) => {
    const link = cmd.link.slice()
    const command = link.shift() as string
    const child = child_process.spawn(command, link)
    child.stderr.setEncoding('utf-8')
    // let error = false
    child.stderr.on('data', text => {
      // error = true
      // console.log('d')
      const parsed = parseFfmpegError(text)
      if (parsed instanceof Kink) {
        child.kill()
        return rej(parsed)
      }
      // console.log(text)
      if (parsed) {
        onUpdate?.(parsed)
      }
    })
    child.stdout.setEncoding('utf-8')
    child.stdout.on('data', text => {
      // const parsed = parseFfmpegError(text)
      // console.log(text)
      // if (parsed) {
      //   onUpdate?.(parsed)
      // }
    })

    child.on('error', rej)
    child.on('close', () => {
      res(undefined)
    })
  })
}

export async function handleGifsicleCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handlePerlTidyCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handlePatoolCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleBlackCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleAsmfmtCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleKtfmtCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleJavaCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleClangppCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleClangCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleLlcCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleClangFormatCommand(cmd: Command) {
  return await exec(cmd.link)
}

export async function handleSwiftFormatCommand(cmd: Command) {
  try {
    await exec(cmd.link)
  } catch (e) {
    console.log(e)
  }
}

export async function handleSwiftcCommand(cmd: Command) {
  try {
    await exec(cmd.link)
  } catch (e) {
    if (e instanceof ChildProcessError) {
      if (e.data.stdout?.trim() === 'error: fatalError') {
        throw kink('compilation_error', {
          note: stripAnsiFromText({
            input: { text: e.data.stderr as string },
          }),
        })
      }
    }
    console.log(e)
  }
}

export async function handleObjdumpCommand(cmd: Command) {
  return await exec(cmd.link)
}

function parseFfmpegError(text: string) {
  const lines = text.split(/\n/)
  if (lines[0]?.match(/File '(.+)' already exists\. Exiting/)) {
    return kink('file_already_exists', { path: RegExp.$1 })
  } else if (
    lines[0]?.match(
      /^(?:frame=\s*(.+)\s+fps=\s*(.+)\s+q=\s*(.+)\s+)?size=\s*(.+)\s+time=\s*(.+)\s+bitrate=\s*(.+)\s+speed=(.+)/,
    )
  ) {
    const { $1, $2, $3, $4, $5, $6, $7 } = RegExp
    const frame = $1 ? parseInt($1, 10) : undefined
    const fps = $2 ? parseFloat($2) : undefined
    const q = $3 ? parseFloat($3) : undefined
    const size = bytes($4)
    const [t, ms = '0'] =
      $5 === 'N/A' ? '0:0:0.0' : $5.trim().split('.')
    const [h = '0', m = '0', s = '0'] = (t as string).split(':')
    const totalSeconds = parseInt(s || '0', 10) * 1000
    const totalMinutes = parseInt(m || '0', 10) * 60 * 1000
    const totalHours = parseInt(h || '0', 10) * 60 * 60 * 1000
    const time = totalHours + totalMinutes + totalSeconds
    const bitrate = bytes($6.split('bits/s').shift() + 'b')
    const speed = $7 && $7.trim() !== 'N/A' ? parseFloat($7) : 0
    return {
      form: 'rise',
      link: {
        frame,
        fps,
        q,
        size,
        time,
        bitrate,
        speed,
      },
    } as Message
  } else if (lines[0]?.match(/^frame=/)) {
    return
  } else if (lines[0]?.match(/^Input #/)) {
    return
  } else if (text.trim()) {
    return {
      form: 'rise',
      text,
    }
  }
}

// export async function convertFLACToMp3({ inputPath, outputPath }) {
//   child_process.execSync(
//     `ffmpeg -y -loglevel warning -hide_banner -nostats -i "${path.resolve(
//       inputPath,
//     )}" -ab 320k -map_metadata 0 -id3v2_version 3 "${path.resolve(
//       outputPath,
//     )}"`,
//   )
// }
