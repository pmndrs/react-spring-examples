import React from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './styles.css'
import imgs from './imgs'

const calc = (x, y, lx, ly) => [
  -(y - ly - window.innerHeight / 2) / 20,
  (x - lx - window.innerWidth / 2) / 20,
  1.1,
]
const trans = ([x, y], [rx, ry, rs], [s, a]) =>
  `perspective(600px) translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${a}deg) scale(${rs +
    s})`

const wheel = y => {
  const imgHeight = window.innerWidth * 0.3 - 20
  return `translateY(${-imgHeight * (y < 0 ? 6 : 1) - (y % (imgHeight * 5))}px`
}

export default function Card() {
  const root = React.useRef(null)
  const domTarget = React.useRef(null)
  const [{ rxrys, coord, pinch }, set] = useSpring(() => ({
    rxrys: [0, 0, 1],
    coord: [0, 0],
    pinch: [0, 0],
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  const [{ wheelY }, setWheel] = useSpring(() => ({ wheelY: 0 }))
  const [drag, setDrag] = React.useState(false)

  const bind = useGesture(
    {
      onDragStart: () => setDrag(true),
      onDrag: ({ local }) => set({ coord: local, rxrys: [0, 0, 1] }),
      onDragEnd: () => setDrag(false),
      onPinch: ({ local: [d, a] }) => set({ pinch: [d / 200, a] }),
      onMove: ({ xy, dragging }) =>
        !dragging && set({ rxrys: calc(...xy, ...coord.getValue()) }),
      onHover: ({ hovering }) => !hovering && set({ rxrys: [0, 0, 1] }),
      onWheel: ({ local: [, y], last }) => {
        setWheel({ wheelY: y })
      },
    },
    { domTarget }
  )

  React.useEffect(bind, [bind])

  React.useEffect(() => {
    root.current.addEventListener('gesturestart', e => e.preventDefault(), {
      passive: false,
    })
    return () =>
      root.current.removeEventListener(
        'gesturestart',
        e => e.preventDefault(),
        { passive: false }
      )
  }, [])

  return (
    <div ref={root} className="card flex-content">
      <animated.div
        ref={domTarget}
        className={`${drag ? 'dragging' : ''}`}
        // {...bind()}
        style={{ transform: interpolate([coord, rxrys, pinch], trans) }}>
        <animated.div style={{ transform: wheelY.interpolate(wheel) }}>
          {imgs.map((img, i) => (
            <div key={i} style={{ backgroundImage: `url(${img})` }} />
          ))}
        </animated.div>
      </animated.div>
    </div>
  )
}
