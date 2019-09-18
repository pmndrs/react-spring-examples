import * as React from 'react'
import { render } from 'react-dom'
import { animated, Transition } from 'react-spring'

export default function App() {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShow(show => !show)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <Transition
      items={show}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}>
      {(style, show) =>
        show && <animated.div style={style}>Hello world</animated.div>
      }
    </Transition>
  )
}
