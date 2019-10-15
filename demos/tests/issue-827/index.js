import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated, config } from 'react-spring'

function linearGradient(deg, startColor, startPosition, endColor, endPosition) {
  return `linear-gradient(${deg}deg, ${startColor} ${startPosition}, ${endColor} ${endPosition})`
}

function useLinearGradient(from, to) {
  return useSpring(() => ({
    from: { background: from },
    to: async next => {
      let i = 500
      let reverse = false
      while (--i > 0) {
        reverse = !reverse
        await next({
          to: { background: to },
          from: { background: from },
          reverse,
          config: config.slow,
        })
      }
    },
  }))
}

export default function App() {
  // The background gradient
  const [gradient] = useLinearGradient(
    linearGradient(135, 'rgb(185, 198, 109)', '0%', 'rgb(34, 48, 17)', '100%'),
    linearGradient(45, 'rgb(85, 69, 47)', '0%', 'rgb(218, 102, 92)', '100%')
  )

  return (
    <animated.div
      style={{
        ...gradient,
        height: '100%',
        width: '100%',
      }}
    />
  )
}
