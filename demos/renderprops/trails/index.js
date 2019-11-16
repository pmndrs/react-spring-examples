import React, { useState } from 'react'
import { Trail, animated } from 'react-spring/renderprops'
import './styles.css'

const items = ['item1', 'item2', 'item3', 'item4', 'item5']

export default function TrailsExample() {
  const [toggle, setToggle] = useState(true)
  return (
    <div
      style={{
        backgroundColor: '#247BA0',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
      <Trail
        native
        reverse={toggle}
        initial={null}
        items={items}
        from={{ opacity: 0, x: -100 }}
        to={{ opacity: toggle ? 1 : 0.25, x: toggle ? 0 : 100 }}>
        {item => ({ x, opacity }) => (
          <animated.div
            className="box"
            onClick={() => setToggle(t => !t)}
            style={{
              opacity,
              transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
            }}
          />
        )}
      </Trail>
    </div>
  )
}
