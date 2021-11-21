import React from 'react'

import { withMemo } from 'react-enhance-memo'

import './index.css'

type ChildProps = {
  getCounter: () => void
}

const ChildComponent = (props: ChildProps) => {
  const { getCounter } = props
  const counter = getCounter()
  const [parentCounter, setParentCounter] = React.useState(counter)
  const ref = React.useRef<number>(-1)
  ref.current++

  const checkParentCounter = () => {
    setParentCounter(getCounter())
  }

  return (
    <div>
      Counter: {counter}
      <div>Parent counter: {parentCounter}</div>
      <div>Rendered: {ref.current} times</div>
      <div>
        <button onClick={() => checkParentCounter()}>
          Check parent counter
        </button>
      </div>
    </div>
  )
}

const MemoChildComponent = withMemo(ChildComponent)

const ParentComponent = () => {
  const [counter, setCounter] = React.useState(0)

  const getCounter = React.useCallback(() => {
    console.log(`Current counter: ${counter}`)
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
      <div className={'child'}>
        <div className={'title'}>Child component</div>
        <ChildComponent getCounter={getCounter} />
      </div>
      <hr />
      <div className={'child'}>
        <div className={'title'}>Memo child component</div>
        <MemoChildComponent getCounter={getCounter} />
      </div>
    </React.Fragment>
  )
}

const App = () => {
  return <ParentComponent />
}

export default App
