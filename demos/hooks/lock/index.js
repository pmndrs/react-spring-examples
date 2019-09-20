import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export default function Lock() {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }))
  const axis = React.useRef()
  const bind = useDrag(
    ({
      last,
      movement: [mx, my],
      direction: [dx, dy],
      memo = [x.getValue(), y.getValue()],
    }) => {
      if (!axis.current) {
        if (Math.abs(dx) > Math.abs(dy)) axis.current = 'x'
        else if (Math.abs(dy) > Math.abs(dx)) axis.current = 'y'
      }

      if (axis.current === 'x') set({ x: memo[0] + mx, immediate: true })
      else if (axis.current === 'y') set({ y: memo[1] + my, immediate: true })

      if (last) axis.current = null
      return memo
    }
  )
  return (
    <div className="lock flex-content">
      <animated.div {...bind()} style={{ x, y }} />
    </div>
  )
}
