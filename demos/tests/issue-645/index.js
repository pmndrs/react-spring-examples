import React from 'react'
import { useSpring, animated } from 'react-spring'
import { add, scale } from 'vec-la'
import { useGesture } from 'react-with-gesture'
import './styles.css'

export default function App() {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  // direction calculates pointer direction
  // temp is like a cache, it contains the values that you return inside "set"
  // this way we can inject the springs current coordinates on the initial event and
  // add delta to it for convenience
  const bind = useGesture(
    ({ down, delta, velocity, direction, temp = xy.getValue() }) => {
      console.log('gesture.isDown ==', down)
      set({
        xy: add(delta, temp),
        immediate: down,
        config: { velocity: scale(direction, velocity), decay: true },
        reset: !down,
      })
      return temp
    }
  )
  return (
    <animated.div
      {...bind()}
      className="movable"
      style={{
        transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
      }}
    />
  )
}
