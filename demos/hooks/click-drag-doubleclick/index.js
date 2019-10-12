import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'
import { DRAG_STATUS, getDragStatusColor } from './helper.js'

const DOUBLE_CLICK_TIME_THRESHOLD = 250

export default function ClickDragDoubleClick() {
  const [clickCount, setClickCount] = React.useState(0)
  const [dragStatus, setDragStatus] = React.useState(DRAG_STATUS.NONE)
  const isDragging = React.useRef(false)
  const isDoubleClicked = React.useRef(false)
  const previousClickTimestamp = React.useRef(performance.now())
  const [springProps, setSpring] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const gestureBinds = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], first, last }) => {
        if (first) {
          isDragging.current = true
          setDragStatus(DRAG_STATUS.DRAG_STARTED)
        } else if (last) {
          requestAnimationFrame(() => (isDragging.current = false))
          setDragStatus(DRAG_STATUS.DRAG_ENDED)
        }
        setSpring({
          x: down ? mx : 0,
          y: down ? my : 0,
          scale: down ? 1.4 : 1,
        })
      },
      onClick: e => {
        if (isDragging.current) return
        e.stopPropagation()
        const now = performance.now()
        const clickDeltaTime = now - previousClickTimestamp.current
        if (
          isDoubleClicked.current ||
          clickDeltaTime >= DOUBLE_CLICK_TIME_THRESHOLD
        ) {
          isDoubleClicked.current = false
          setDragStatus(DRAG_STATUS.CLICKED)
        } else {
          isDoubleClicked.current = true
          setDragStatus(DRAG_STATUS.DOUBLE_CLICKED)
        }
        previousClickTimestamp.current = now
        setClickCount(c => c + 1)
      },
    },
    { dragDelay: 1000 }
  )

  return (
    <>
      <animated.div
        className="square"
        {...gestureBinds()}
        style={{
          ...springProps,
          backgroundColor: getDragStatusColor(dragStatus),
          cursor:
            dragStatus === DRAG_STATUS.DRAG_STARTED ? 'grabbing' : 'pointer',
        }}
      />
      <aside className="status">
        <div>Drag Status: {dragStatus}</div>
        <div>Click Count: {clickCount}</div>
      </aside>
    </>
  )
}
