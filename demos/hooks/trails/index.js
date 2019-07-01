import React, { useState, useRef } from 'react'
import { useTrail, animated } from 'react-spring'
import './styles.css'

const items = ['Lorem', 'ipsum', 'dolor', 'sit']

export default function Trail() {
  const [toggle, set] = useState(true)
  const trail = useTrail(items.length, {
    to: { opacity: 1, x: 0, height: 50 },
    from: { opacity: 0, x: 20, height: 0 },
    config: { mass: 5, tension: 2000, friction: 200 },
    reverse: !toggle,
  })

  return (
    <div className="trails-main" onClick={() => set(state => !state)}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            className="trails-box"
            key={items[index]}
            style={{
              ...rest,
              transform: x.to(x => `translate3d(0,${x}px,0)`),
            }}>
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
