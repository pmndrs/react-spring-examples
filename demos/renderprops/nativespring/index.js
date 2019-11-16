import React, { useState, useCallback } from 'react'
import { Spring, animated } from 'react-spring'

const TRIANGLE = 'M20,380 L380,380 L380,380 L200,20 L20,380 Z'
const RECTANGLE = 'M20,20 L20,380 L380,380 L380,20 L20,20 Z'
const styles = {
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    willChange: 'background',
  },
  shape: { width: 300, height: 300, willChange: 'transform' },
}

export default function() {
  const [flag, setFlag] = useState(true)
  const toggle = useCallback(() => setFlag(f => !f), [])

  return (
    <Spring
      from={{ fill: 'black' }}
      to={{
        fill: flag ? '#247BA0' : '#70C1B3',
        backgroundColor: flag ? '#A29B7F' : '#F3FFBD',
        rotate: flag ? '0deg' : '180deg',
        scale: flag ? 0.3 : 0.7,
        shape: flag ? TRIANGLE : RECTANGLE,
      }}
      toggle={toggle}>
      {({ backgroundColor, fill, rotate, scale, shape }) => (
        <animated.div style={{ ...styles.container, backgroundColor }}>
          <animated.svg
            style={{
              ...styles.shape,
              fill,
              rotateY: rotate,
              scale,
            }}
            version="1.1"
            viewBox="0 0 400 400">
            <g
              style={{ cursor: 'pointer' }}
              fillRule="evenodd"
              onClick={toggle}>
              <animated.path id="path-1" d={shape} />
            </g>
          </animated.svg>
        </animated.div>
      )}
    </Spring>
  )
}
