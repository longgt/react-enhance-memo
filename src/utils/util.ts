import { FunctionalObject } from '../types/types'

export function isFunction(val: any): val is Function {
  return typeof val === 'function'
}

export function isPresent(val: any | null | undefined): val is any {
  return val !== null && val !== undefined
}

export function extractFunctionalProps(props: any): FunctionalObject {
  const obj: FunctionalObject = {}

  if (isPresent(props)) {
    for (const key of Object.keys(props)) {
      const val = props[key]

      if (isFunction(val)) {
        obj[key] = val
      }
    }
  }

  return obj
}
