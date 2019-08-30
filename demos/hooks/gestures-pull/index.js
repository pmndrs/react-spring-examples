import React, { useState, useRef, useEffect } from 'react'
import clamp from 'lodash-es/clamp'
import { useDrag } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'
import { add, scale } from 'vec-la'
import './styles.css'

function Pull() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(({ down, movement: [mx, my], velocity }) => {
    velocity = Math.max(1, velocity)
    set({
      x: down ? mx : 0,
      y: down ? my : 0,
      config: { mass: velocity, tension: 500 * velocity, friction: 50 },
    })
  })
  return <animated.div {...bind()} style={{ x, y }} />
}

export default function App() {
  return (
    <div className="main-gestures">
      <Pull />
    </div>
  )
}
