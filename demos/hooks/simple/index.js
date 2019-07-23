import React from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export default function Simple() {
  const [{ xy, scale }, set] = useSpring(() => ({ xy: [0, 0], scale: 1 }))
  const bind = useDrag(({ down, delta }) => {
    set({ xy: down ? delta : [0, 0], scale: down ? 1.2 : 1 })
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="simple flex-content">
      <animated.div
        {...bind()}
        style={{
          transform: interpolate(
            [xy, scale],
            ([x, y], s) => `translate3D(${x}px, ${y}px, 0) scale(${s})`
          ),
        }}
      />
    </div>
  )
}
