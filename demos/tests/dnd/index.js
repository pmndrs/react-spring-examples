import React, { useRef } from 'react'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'

import './styles.css'

const BASE_HEIGHT = 50

function swap(source, startIndex, endIndex) {
  const arry = Array.from(source)
  const [moved] = arry.splice(startIndex, 1)

  arry.splice(endIndex, 0, moved)

  return arry
}

function clamp(min, mid, max) {
  return Math.min(Math.max(min, mid), max)
}

const style = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? {
        y: curIndex * BASE_HEIGHT + y,
        pointerEvents: 'none',
        scale: 1.01,
        zIndex: '1',
        shadow: 5,
        immediate: n => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * BASE_HEIGHT,
        pointerEvents: 'auto',
        scale: 1,
        zIndex: '0',
        shadow: 1,
        immediate: false,
      }

export default function DraggableList({
  items = 'Lorem Ipsum Dolor Sit Amet'.split(' '),
}) {
  const order = useRef(items.map((_, index) => index))
  const [springs, setSprings] = useSprings(items.length, style(order.current))

  const bind = useGesture({
    onDrag: ({ args: [originalIndex], down, delta: [, y] }) => {
      const curIndex = order.current.indexOf(originalIndex)
      const curRow = clamp(
        Math.round((curIndex * BASE_HEIGHT + y) / BASE_HEIGHT),
        0,
        items.length - 1
      )
      const newOrder = swap(order.current, curIndex, curRow)

      setSprings(style(newOrder, down, originalIndex, curIndex, y))
      if (!down) order.current = newOrder
    },
  })

  return (
    <div className="dnd flex-content" style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale, pointerEvents }, index) => {
        return (
          <animated.div
            {...bind(index)}
            key={index}
            onTouchStartCapture={e => console.log('ontouchstart')}
            style={{
              zIndex,
              pointerEvents,
              boxShadow: shadow.interpolate(
                s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${s}px 0px`
              ),
              transform: interpolate([y, scale], (y, s) => {
                return `translate3d(0,${y}px,0) scale(${s})`
              }),
            }}>
            {items[index]}
          </animated.div>
        )
      })}
    </div>
  )
}
