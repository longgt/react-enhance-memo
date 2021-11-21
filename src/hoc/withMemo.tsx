import * as React from 'react'
import { useFunctionalProps } from '../hooks/useFunctionalProps'

export function withMemo<T extends React.ComponentType<any>>(
  component: T,
  propsAreEqual?: (
    prevProps: Readonly<React.ComponentProps<T>>,
    nextProps: Readonly<React.ComponentProps<T>>
  ) => boolean
) {
  const MemoComponent = React.memo(component, propsAreEqual)

  return (props: any) => {
    const memoFunctionalProps = useFunctionalProps(props)

    return <MemoComponent {...props} {...memoFunctionalProps} />
  }
}
