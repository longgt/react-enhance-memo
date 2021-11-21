import * as React from 'react'
import { FunctionalObject } from '../types/types'
import { extractFunctionalProps, isFunction } from '../utils/util'

export function useFunctionalProps(props: any): FunctionalObject {
  const functionalPropsRef = React.useRef<any>(null)
  functionalPropsRef.current = extractFunctionalProps(props)

  const memoFunctionalProps: FunctionalObject = React.useMemo(() => {
    const obj: FunctionalObject = {}

    for (const key of Object.keys(functionalPropsRef.current)) {
      obj[key] = function (this: any, ...args: any[]) {
        const delegateFunction = functionalPropsRef.current[key]
        if (isFunction(delegateFunction)) {
          const context = this
          return delegateFunction.apply(context, args)
        }
      }
    }

    return obj
  }, [])

  return memoFunctionalProps
}
