import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

const [min, max] = [-250, 250]

export default function Inertia() {
  const [{ y }, set] = useSpring(() => ({ y: 0 }))

  const bind = useDrag(
    ({ down, movement: [, dy], vxvy: [, vy], memo = y.getValue() }) => {
      if (down) set({ y: dy + memo, onFrame: () => {}, immediate: true })
      else inertia(dy + memo + 1, vy)
      return memo
    }
  )

  const springBounce = React.useCallback(
    velocity => {
      set({
        y: velocity > 0 ? max : min,
        onFrame: () => {}, // <-- this is annoying :)
        config: { velocity: velocity * 3 },
      })
    },
    [set]
  )

  const inertia = React.useCallback(
    (position, velocity) => {
      set({
        to: async (next, stop) => {
          await next({
            y: position,
            onFrame: async v => {
              const vel = y.lastVelocity

              if ((v.y > max && vel > 0) || (v.y < min && vel < 0)) {
                stop()
                springBounce(vel)
              }
            },
            config: { decay: true, velocity },
          })
        },
      })
    },
    [y, set, springBounce]
  )
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="inertia">
      <animated.div {...bind()} style={{ y }} />
    </div>
  )
}
