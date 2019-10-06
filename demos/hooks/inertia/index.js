import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

const modes = {
  pong: 0, // The min/max values deflect the decay animation
  bounce: 0, // The animation bounces instead of overshooting. Try both directions
  skipFinish: 0, // This demonstrates "from !== to" when truthy, else "from === to" (it should work either way)
}

const [min, max] = [-250, 250]
const clamp = value => Math.max(min, Math.min(max, value))

export default function Inertia() {
  const { y } = useSpring({ y: 0 })

  const bind = useDrag(
    ({ down, movement: [, dy], vxvy: [, vy], memo = y.get() }) => {
      if (down) y.set(clamp(dy + memo))
      else inertia(dy + memo + 1, vy)
      return memo
    }
  )

  const springBounce = velocity =>
    y.start({
      to: velocity > 0 ? max : min,
      config: {
        velocity: velocity,
        tension: 30,
        friction: 2,
        clamp: modes.bounce ? 0.7 : false,
        precision: 0.005,
      },
      onRest: () => console.log('BOUNCE END'),
    })

  const inertia = (position, velocity) =>
    y.start({
      y: position,
      onChange: async val => {
        const vel = y.velocity
        if ((val > max && vel > 0) || (val < min && vel < 0)) {
          if (modes.pong) {
            inertia(y.get(), -vel)
          } else {
            if (!modes.skipFinish) {
              y.finish(vel > 0 ? max : min)
            }
            springBounce(vel)
          }
        }
      },
      config: { decay: true, velocity },
      onRest: () => console.log('INERTIA END'),
    })

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="inertia">
      <animated.div {...bind()} style={{ y }} />
    </div>
  )
}
