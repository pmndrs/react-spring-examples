import React, { useState, useEffect } from 'react'
import { useTransition, animated as a, config, to } from 'react-spring'
import shuffle from 'lodash/shuffle'
import { useMeasure, useMedia } from './helpers'
import data from './data'
import './styles.css'

const FAST_MODE = false

export default function App() {
  const columns = 6
  const [bind, { width }] = useMeasure()
  const [items, set] = useState(data)

  const heights = new Array(columns).fill(0)
  const gridItems = width
    ? items.map((child, i) => {
        const column = heights.indexOf(Math.min(...heights))
        const height = child.height / 2
        return {
          ...child,
          xy: [
            (width / columns) * column,
            (heights[column] += height) - height,
          ],
          width: width / columns,
          height,
        }
      })
    : []

  const trail = FAST_MODE ? 25 : 80
  const transition = useTransition(gridItems, {
    key: item => item.css,
    from: ({ xy, width, height }) => ({
      xy,
      width,
      height,
      opacity: 0,
      scale: 0.8,
    }),
    enter: (_, i) => ({ scale: 1, opacity: 1, delay: i * trail }),
    update: ({ xy }) => ({ xy }),
    leave: { scale: 0.8, opacity: 0 },
    config: config.stiff,
    expires: false,
  })

  useEffect(() => every(FAST_MODE ? 1000 : 2500, () => set(shuffle)), [
    gridItems.length,
  ])

  return (
    <div
      className="mgrid"
      onClick={() => {
        set(items.length ? [] : data)
      }}>
      <div {...bind} className="mgrid-list">
        {transition(({ xy, scale, ...rest }, item) => (
          <a.div
            style={{
              transform: to(
                [xy, scale],
                ([x, y], s) => `translate3d(${x}px,${y}px,0) scale(${s})`
              ),
              ...rest,
            }}>
            <div style={{ backgroundImage: item.css }} />
          </a.div>
        ))}
      </div>
    </div>
  )
}

function every(ms, cb) {
  const id = setInterval(cb, ms)
  return () => clearInterval(id)
}
