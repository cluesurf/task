import {
  Request,
  RequestResponseCycle,
  fetchWithTimeout,
} from '../shared/request.js'
import { NativeOptions } from '~/code/tool/shared/request.js'
import {
  Work,
  WorkFile,
  WorkFileAsBlob,
  handleWorkRequestComplete,
} from '~/code/tool/shared/work.js'
import Kink, { KinkMesh } from '@termsurf/kink'
import kink from '../shared/kink.js'

export async function callXhrBrowser(
  request: Request,
  native?: NativeOptions,
): Promise<any> {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest()
    const signal = native?.signal
    const onUpdate = native?.onUpdate

    const isAsync = true

    xhr.open(request.method, request.path, isAsync)

    signal?.addEventListener('abort', handleAbort)
    signal?.throwIfAborted()

    let body
    if (typeof request.body === 'string') {
      body = request.body
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.responseType = 'json'
    } else if (request.body instanceof FormData) {
      body = request.body
      // headers['content-type'] = 'multipart/form-data'
    } else {
      body = JSON.stringify(body)
      xhr.setRequestHeader('content-type', 'application/json')
      xhr.responseType = 'json'
    }

    function handleAbort() {
      xhr.upload.removeEventListener('progress', handleProgress)
      signal?.removeEventListener('abort', handleAbort)
      xhr.abort()
      handleError(kink('abort_error', { link: signal?.reason }))
    }

    function handleProgress(e: ProgressEvent) {
      const percentComplete = (e.loaded / e.total) * 100
      onUpdate?.({
        ...request,
        type: 'request-progress',
        percentComplete,
      })
    }

    xhr.upload.addEventListener('progress', handleProgress)

    xhr.addEventListener('load', function () {
      signal?.removeEventListener('abort', handleAbort)
      xhr.upload.removeEventListener('progress', handleProgress)

      const data = JSON.parse(xhr.response)

      if (this.status == 200) {
        onUpdate?.({
          ...request,
          type: 'response',
          data,
          status: 'success',
          code: 200,
        })

        res(data)
      } else {
        onUpdate?.({
          ...request,
          type: 'response',
          data,
          status: 'failure',
          code: this.status,
        })

        handleError(data)
      }
    })

    xhr.addEventListener('error', function () {
      signal?.removeEventListener('abort', handleAbort)
      xhr.upload.removeEventListener('progress', handleProgress)

      const data = JSON.parse(xhr.response)

      onUpdate?.({
        ...request,
        type: 'response',
        data,
        status: 'failure',
        code: this.status,
      })

      handleError(data)
    })

    xhr.send(body)

    function handleError(e) {
      // console.log('ERROR: callXhrBrowser', e)
      rej(e)
    }
  })
}

// export // The user aborted a request.
export function requestAndWaitForWorkToCompleteBrowser<
  T extends object,
>(request: Request, native?: NativeOptions): Promise<any> {
  return new Promise(async (res, rej) => {
    const signal = native?.signal
    const onUpdate = native?.onUpdate

    signal?.addEventListener('abort', handleAbort)
    signal?.throwIfAborted()

    try {
      await callXhrBrowser(request, { signal, onUpdate: onXhrUpdate })
      signal?.removeEventListener('abort', handleAbort)
    } catch (e) {
      signal?.removeEventListener('abort', handleAbort)
      return handleError(e)
    }

    async function onXhrUpdate(update: RequestResponseCycle) {
      onUpdate?.(update)

      switch (update.type) {
        case 'response': {
          switch (update.status) {
            case 'failure':
              return handleError(new Kink(update.data as KinkMesh))
            case 'success': {
              try {
                const output = await handleWorkRequestComplete<T>(
                  request,
                  update.data as Work<T>,
                  { signal, onUpdate },
                )

                res(output)
              } catch (e) {
                return handleError(e)
              }
            }
          }
          break
        }
      }
    }

    function handleAbort() {
      signal?.removeEventListener('abort', handleAbort)

      rej(kink('abort_error', { link: signal?.reason }))
    }

    function handleError(e) {
      // console.log('ERROR: requestAndWaitForWorkToCompleteBrowser', e)
      rej(e)
    }
  })
}

export function resolveWorkFileAsBlob(
  request: Request,
  native?: NativeOptions,
): Promise<WorkFileAsBlob> {
  const signal = native?.signal

  return new Promise(async (res, rej) => {
    signal?.addEventListener('abort', handleAbort)
    signal?.throwIfAborted()

    try {
      const output =
        await requestAndWaitForWorkToCompleteBrowser<WorkFile>(
          request,
          native,
        )

      const fileResponse = await fetchWithTimeout(output.file.path, {
        method: 'GET',
        signal,
      })
      const arrayBuffer = await fileResponse.arrayBuffer()
      return res({
        file: {
          content: new Blob([arrayBuffer]),
        },
      })
    } catch (e) {
      removeHandleAbort()
      rej(e)
    }

    function handleAbort() {
      removeHandleAbort()
      rej(kink('abort_error', { link: signal?.reason }))
    }

    function removeHandleAbort() {
      signal?.removeEventListener('abort', handleAbort)
    }
  })
}
