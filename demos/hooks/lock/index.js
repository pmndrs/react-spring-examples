import React from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export default function Lock() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const axis = React.useRef()
  const bind = useDrag(
    ({ delta, last, direction, memo = [x.getValue(), y.getValue()] }) => {
      if (!axis.current) {
        if (Math.abs(direction[0]) > Math.abs(direction[1])) axis.current = 'x'
        else if (Math.abs(direction[1]) > Math.abs(direction[0]))
          axis.current = 'y'
      }

      if (axis.current === 'x') set({ x: memo[0] + delta[0], immediate: true })
      else if (axis.current === 'y')
        set({ y: memo[1] + delta[1], immediate: true })

      if (last) axis.current = null
      return memo
    }
  )
  return (
    <div className="lock flex-content">
      <animated.div
        {...bind()}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          ),
        }}
      />
    </div>
  )
}
