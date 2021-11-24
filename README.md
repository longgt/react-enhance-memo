# react-enhance-memo

> React memo with functional props supports

Before passing a callback to memoized version of child component with `React.memo()`,
we must wrap it by using `React.useCallback()` then pass the returned value from `React.useCallback()` as property.

When doing tunning performance with a lot of callback and dependencies, it takes a lot of time to make it in the right way. And the source code after turned into memoized version might lead to introduce new bug in the future if we don't update its dependencies properly.

This library aims to make the work of tuning performance easier by doing the magic trick.
Just using the passing callback as normal props as usual, it'll do the rest of work.
By giving an unchanged version of passing callback, it prevents unnecessary re-render in memoized child component while still maintaining the latest closure context of the given passing callback from parent component.

According to https://reactjs.org/docs/render-props.html

> Be careful when using Render Props with React.PureComponent
> Using a render prop can negate the advantage that comes from using React.PureComponent if you create the function inside a render method. This is because the shallow prop comparison will always return false for new props, and each render in this case will generate a new value for the render prop.

by using this libarry, there is no need to worry about the above issue anymore.

Happy coding!

[![NPM](https://img.shields.io/npm/v/react-enhance-memo.svg)](https://www.npmjs.com/package/react-enhance-memo) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-enhance-memo
```

## Demo

https://longgt.github.io/react-enhance-memo/

## Usage

```tsx
import React, { Component } from 'react'

import { withMemo } from 'react-enhance-memo'

type ChildProps = {
  getCounter: () => void
}

const ChildComponent = (props: ChildProps) => {
  const { getCounter } = props
  const ref = React.useRef<number>(-1)
  ref.current++
  const counter = getCounter()

  return (
    <div>
      Counter: {counter}
      <div>Rendered: {ref.current} times</div>
    </div>
  )
}

const MemoChildComponent = withMemo(ChildComponent)

const ParentComponent = () => {
  const [counter, setCounter] = React.useState(0)

  const getCounter = React.useCallback(() => {
    return counter
  }, [counter])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevState) => prevState + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <React.Fragment>
      <div>
        <div>Child component</div>
        <ChildComponent getCounter={getCounter} />
      </div>
      <hr />
      <div>
        <div>Memo child component</div>
        <MemoChildComponent getCounter={getCounter} />
      </div>
    </React.Fragment>
  )
}
```

## Options

- **propsAreEqual**: Custom equality check of props. Default is does a shallow comparison of props and objects of props as `React.memo()`.

  Or any function from

  - [deep-equal](https://www.npmjs.com/package/deep-equal)
  - [shallowequal](https://www.npmjs.com/package/shallowequal)
  - [react-fast-compare](https://www.npmjs.com/package/react-fast-compare)
  - ...

## License

MIT © [longgt](https://github.com/longgt)
