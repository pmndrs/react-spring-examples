import React, { useState, useEffect, useRef, useReducer } from 'react'
import { Spring, animated } from 'react-spring'
import { GradientPinkRed as Gradient } from '@vx/gradient'
import * as easings from 'd3-ease'

export default function() {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const [offset, setOffset] = useState(0)
  const path = useRef(null)
  useEffect(() => {
    setOffset(path.current.getTotalLength())
  })
  return (
    <div
      style={{
        background: '#272727',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => forceUpdate()}>
      <svg width="180" viewBox="0 0 23 23">
        <Gradient id="gradient-dashoffset" />
        <g fill="#373737" stroke="url(#gradient-dashoffset)" strokeWidth="0.5">
          <Spring
            reset
            from={{ dash: offset }}
            to={{ dash: 0 }}
            config={{
              delay: 1000,
              duration: 3000,
              easing: easings.easeCubic,
            }}>
            {props => (
              <animated.path
                ref={path}
                strokeDasharray={offset}
                strokeDashoffset={props.dash}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            )}
          </Spring>
        </g>
      </svg>
    </div>
  )
}
