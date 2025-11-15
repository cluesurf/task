import Observable from 'zen-observable'
import { Output, WorkFileAsBlob } from '~/code/tool/shared/work'

export async function resolve<T extends any>(
  observable: Observable<Output<T>>,
) {
  let last: Output<T> | undefined = undefined
  await observable.forEach(data => {
    if (data.type === 'output') {
      last = data
    }
  })
  return last
}
