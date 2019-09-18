import React from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export default function Simple() {
  const [props, set] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const bind = useDrag(({ down, movement: [x, y] }) => {
    set({ x: down ? x : 0, y: down ? y : 0, scale: down ? 1.2 : 1 })
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="simple flex-content">
      <animated.div {...bind()} style={props} />
    </div>
  )
}
