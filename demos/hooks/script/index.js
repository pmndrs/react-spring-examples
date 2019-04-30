import React, { useCallback, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import './styles.css'

const initialStyles = {
  left: '0%',
  top: '0%',
  width: '100%',
  height: '100%',
  background: 'lightgreen',
  color: 'white',
}

export default function App() {
  const [isAnimating, setIsAnimating] = useState(true)
  const props = useSpring({
    cancel: !isAnimating,
    from: initialStyles,
    to: useCallback(async next => {
      while (1) {
        await next(initialStyles)
        await next({
          height: '50%',
          background: 'lightseagreen',
        })
        await next({
          width: '50%',
          left: '50%',
          background: 'lightblue',
          color: '#42657A',
        })
        await next({
          top: '0%',
          height: '100%',
          background: 'lightcoral',
          color: '#703B3B',
        })
        await next({
          top: '50%',
          height: '50%',
          background: 'lightgoldenrodyellow',
          color: '#7A7A67',
        })
        await next({
          width: '100%',
          left: '0%',
          background: 'lightpink',
          color: 'white',
        })
        await next({
          width: '50%',
          background: 'lightsalmon',
        })
        await next({
          top: '0%',
          height: '100%',
          background: 'lightskyblue',
        })
        await next({
          width: '100%',
          background: 'lightslategrey',
        })
      }
    }, []),
  })

  const { color, ...boxStyle } = props
  return (
    <div className="script-main" onClick={() => setIsAnimating(x => !x)}>
      <animated.div className="script-box" style={boxStyle}>
        <animated.div className="script-running" style={{ color }}>
          {isAnimating ? 'Click to stop' : 'Click to start over'}
        </animated.div>
      </animated.div>
    </div>
  )
}
