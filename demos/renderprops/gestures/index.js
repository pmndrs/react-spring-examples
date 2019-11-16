// Inpired by: https://codepen.io/popmotion/pen/xWrbNm?editors=0010

import React, { useState } from 'react'
import { useDrag } from 'react-use-gesture'
import { Spring, animated } from 'react-spring/renderprops'
import './styles.css'

export default function GesturesExample() {
  const [{ down, mx }, setProps] = useState({ down: false, movement: 0 })
  const bind = useDrag(({ down, movement: [mx] }) => setProps({ down, mx }))
  const to = { x: down ? mx : 0 }

  return (
    <div className="gestures-main">
      <Spring native to={to} immediate={n => down && n === 'x'}>
        {({ x }) => (
          <animated.div
            {...bind()}
            className="gestures-item"
            style={{ backgroundColor: mx < 0 ? '#FF1C68' : '#14D790' }}>
            <animated.div
              className="gestures-bubble"
              style={{
                transform: x
                  .interpolate({
                    map: Math.abs,
                    range: [50, 300],
                    output: [0.5, 1],
                    extrapolate: 'clamp',
                  })
                  .interpolate(x => `scale(${x})`),
                justifySelf: mx < 0 ? 'end' : 'start',
              }}
            />
            <animated.div
              className="gestures-fg"
              style={{
                transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
              }}>
              Slide me
            </animated.div>
          </animated.div>
        )}
      </Spring>
    </div>
  )
}
