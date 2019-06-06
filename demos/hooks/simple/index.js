import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'

export default function Simple() {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const bind = useGesture({
    onDrag: ({ down, delta }) => {
      set({ xy: down ? delta : [0, 0] })
    },
    onMouseDown: () => console.log('mouse down'),
    onMouseMove: () => console.log('mouse moving'),
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="simple flex-content">
      <animated.div
        {...bind()}
        style={{
          transform: xy.interpolate((x, y) => `translate3D(${x}px, ${y}px, 0)`),
        }}
      />
    </div>
  )
}
