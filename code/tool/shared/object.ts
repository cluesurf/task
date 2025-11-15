import { flatten, unflatten } from 'flat'
import unset from 'lodash/unset'
import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'

export function flattenObjectSafe(
  obj: object,
  delimiter: string = '.',
) {
  return flatten(obj, { delimiter, safe: true })
}

export function flattenObject(obj: object, delimiter: string = '.') {
  return flatten(obj, { delimiter })
}

export function unflattenObject(obj: object, delimiter: string = '.') {
  return unflatten(obj, { delimiter })
}

export function unsetAll(obj, props: Array<Array<string>>) {
  props.forEach(path => {
    unset(obj, path)
  })
  return obj
}

export function omitNested<T extends object>(
  obj: T,
  props: Array<Array<string>>,
) {
  const out = cloneOptions(obj)
  unsetAll(out, props)
  return out
}

export function cloneOptions<T extends object>(x: T) {
  const y = {} as T

  Object.keys(x).forEach(name => {
    const value = x[name]

    if (isPlainObject(value)) {
      y[name] = cloneOptions(value)
    } else {
      y[name] = value
    }
  })

  return y
}

export function extend(x: object, y: object) {
  return merge({}, x, y)
}
