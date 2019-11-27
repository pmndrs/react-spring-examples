import React, { useState } from 'react'
import { a, useSprings } from 'react-spring'

const items = ['A', 'B', 'C']
const colors = ['#8d8741', '#659dbd', '#bc986a']

const itemMargin = 10
const itemSize = 100
const itemStyle = {
  width: itemSize,
  height: itemSize,
  color: 'white',
  fontSize: 30,
  fontWeight: 500,
  fontFamily: 'Roboto Condensed',
  borderRadius: 18,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
}

export default function App() {
  const [counts, setCounts] = useState(() => items.map(() => 0))

  // The ordered item indices
  const order = items.map((_, i) => i).sort((a, b) => counts[b] - counts[a])

  // The animated Y-positions
  const springs = useSprings(
    items.length,
    items.map((_, i) => ({
      y: order.indexOf(i) * (itemSize + itemMargin),
    }))
  )

  return (
    <div>
      <Instructions />
      {springs.map(({ y }, i) => (
        <a.div
          key={i}
          onClick={() => {
            setCounts(counts => {
              counts = [...counts]
              counts[i]++
              return counts
            })
          }}
          style={{
            // The "style.y" prop is specially supported by react-spring since v9.
            y,

            // An absolute position is needed for all boxes to have the same origin.
            position: 'absolute',

            // Ensure the higher count is always on top.
            zIndex: order.length - order.indexOf(i),

            // Aesthetics
            background: colors[i],
            ...itemStyle,
          }}>
          {items[i] + counts[i]}
        </a.div>
      ))}
    </div>
  )
}

function Instructions() {
  return (
    <div
      style={{
        fontFamily: 'Roboto Condensed',
        fontSize: 30,
        marginBottom: 20,
      }}>
      Click a box to increment its count!
    </div>
  )
}
