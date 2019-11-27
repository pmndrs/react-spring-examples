import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import './styles.css'

export default function MultiStageTransition() {
  const ref = useRef([])
  const [items, set] = useState([])

  const transition = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      rotateX: 0,
      color: '#8fa5b6',
    },
    enter: () => [
      {
        opacity: 1,
        height: 50,
        innerHeight: 50,
        color: '#8fa5b6',
      },
      { rotateX: 180, color: '#28d79f' },
      { rotateX: 0 },
    ],
    leave: () => [
      { color: '#c23369', rotateX: 0 },
      { opacity: 0, innerHeight: 0 },
      { height: 0 },
    ],
    update: { color: '#28b4d7' },
  })

  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(
      setTimeout(() => set(['Apples', 'Oranges', 'Kiwis']), 2000)
    )
    ref.current.push(setTimeout(() => set(['Apples', 'Kiwis']), 5000))
    ref.current.push(
      setTimeout(() => set(['Apples', 'Bananas', 'Kiwis']), 8000)
    )
  }, [])

  useEffect(() => void reset(), [])

  return (
    <div className="transitions-main">
      <div>
        {transition(({ innerHeight, ...style }, item) => (
          <animated.div
            className="transitions-item"
            style={{ ...style, transform: 'perspective(600px)' }}
            onClick={reset}>
            <animated.div style={{ overflow: 'hidden', height: innerHeight }}>
              {item}
            </animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
