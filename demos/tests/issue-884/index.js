import React from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

export default function App() {
  const [{ x, y, bg }, set] = useSpring(() => ({ x: 0, y: 0, bg: 'hotpink' }))
  const bind = useDrag(
    ({ down, movement: [mx, my] }) =>
      set({
        bg: down ? 'green' : 'hotpink',
        x: down ? mx : 0,
        y: down ? my : 0,
        immediate: down || 'bg',
        config: { duration: 5000 },
      }),
    { initial: () => [x.get(), y.get()] }
  )

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <animated.div
      {...bind()}
      style={{ width: 100, height: 100, x, y, backgroundColor: bg }}
    />
  )
}
