import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import shuffle from 'lodash/shuffle'
import data from './data'
import './styles.css'

export default function App() {
  const [rows, set] = useState(data)
  useEffect(() => void setInterval(() => set(shuffle), 3000), [])

  let height = 0
  rows.forEach(row => {
    row.y = height
    height += row.height
  })

  const transition = useTransition(rows, {
    from: ({ y }) => ({ y, height: 0, opacity: 0 }),
    leave: { height: 0, opacity: 0 },
    enter: ({ y, height }) => ({ y, height, opacity: 1 }),
    update: ({ y }) => ({ y }),
    config: { mass: 5, tension: 500, friction: 150 },
  })

  return (
    <div className="list-reorder-scroll">
      <div className="list-reorder" style={{ height: height + 15 }}>
        {transition((style, item) => (
          <animated.div className="list-reorder-card" style={style}>
            <div className="list-reorder-cell">
              <div
                className="list-reorder-details"
                style={{ backgroundImage: item.css }}
              />
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
