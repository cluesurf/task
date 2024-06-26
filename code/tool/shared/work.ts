import Kink, { KinkMesh } from '@termsurf/kink'
import { Request, NativeOptions, getRemote } from './request.js'
import { wait } from './timer.js'
import kink from './kink.js'

export type WorkFile = {
  file: {
    path: string
  }
}

export type WorkFileContent = {
  file: {
    content: Blob
  }
}
export type Work<T> = {
  id: string
  output?: T
  status: 'complete' | 'queued' | 'error'
}

export type Output<T> = {
  type: 'output'
  output: T
}

export type Processing = {
  type: 'processing'
}

export type Ping = {
  type: 'ping'
}

export async function handleWorkRequestComplete<T>(
  request: Request,
  work: Work<T>,
  native?: NativeOptions,
): Promise<T> {
  return new Promise(async (res, rej) => {
    const signal = native?.signal
    const onUpdate = native?.onUpdate

    const handleAbort = () => {
      signal?.removeEventListener('abort', handleAbort)
      rej(kink('abort_error', { link: signal?.reason }))
    }

    signal?.addEventListener('abort', handleAbort)
    signal?.throwIfAborted()

    if (work.status === 'complete') {
      res(work.output as T)
    } else if (work.status === 'error') {
      return rej(new Kink(work.output as KinkMesh))
    }

    await onUpdate?.({
      method: 'GET',
      path: `/work/${work.id}`,
      type: 'response-waiting',
    })

    while (work) {
      await wait(2000, signal)

      const workResponse = await getRemote(`/work/${work.id}`, signal)

      if (workResponse.status >= 400) {
        const error = await workResponse.json()
        return rej(new Kink(error))
      }

      work = await workResponse.json()

      if (signal?.aborted) {
        return rej(kink('abort_error', { link: signal?.reason }))
      }

      if (work) {
        if (work.status === 'complete') {
          return res(work.output as T)
        } else if (work.status === 'error') {
          return rej(new Kink(work.output as KinkMesh))
        } else {
          onUpdate?.({
            method: 'GET',
            path: `/work/${work.id}`,
            type: 'response-waiting',
          })
        }
      }
    }
  })
}

export type WorkFileAsBlob = WorkFileContent
