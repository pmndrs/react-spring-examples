import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useWheel } from 'react-use-gesture'
import { clamp } from 'lodash'
import './styles.css'

export default function Wheel() {
  const [{ clampY, localY }, set] = useSpring(() => ({ clampY: 0, localY: 0 }))

  const bind = useWheel(
    ({ first, local: [, ly], delta: [, dy], memo = clampY.getValue() }) => {
      set({ clampY: clamp(dy + memo, -500, 500), localY: ly, immediate: true })
      return memo
    }
  )
  return (
    <div className="wheel" {...bind()}>
      <animated.div>{clampY}</animated.div>
      <animated.div>{localY}</animated.div>
    </div>
  )
}
