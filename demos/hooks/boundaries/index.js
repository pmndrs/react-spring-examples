import React from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { clamp } from 'lodash'
import './styles.css'

const boundaries = [-100, 100, 100, -100]

export default function Boundaries() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useDrag(
    ({ movement: [mx, my], memo = [x.getValue(), y.getValue()] }) => {
      const [top, right, bottom, left] = boundaries
      set({
        x: clamp(memo[0] + mx, left, right),
        y: clamp(memo[1] + my, top, bottom),
      })
      return memo
    }
  )
  return (
    <div className="flex-content boundaries">
      <div>
        <animated.div {...bind()} style={{ x, y }} />
      </div>
    </div>
  )
}
