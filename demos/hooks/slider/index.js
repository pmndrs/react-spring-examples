// Inpired by: https://codepen.io/popmotion/pen/xWrbNm?editors=0010

import React from 'react'
import { useSpring, animated, to } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export default function Slider({ children }) {
  const [{ x, bg, size, justifySelf }, set] = useSpring(() => ({
    x: 0,
    bg: `linear-gradient(120deg, ${'#96fbc4 0%, #f9f586'} 100%)`,
    size: 1,
    justifySelf: 'start',
  }))
  const avSize = x.to({
    map: Math.abs,
    range: [50, 300],
    output: ['scale(0.5)', 'scale(1)'],
    extrapolate: 'clamp',
  })
  const bind = useDrag(({ down, movement: [x] }) =>
    set({
      x: down ? x : 0,
      bg: `linear-gradient(120deg, ${
        x < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'
      } 100%)`,
      size: down ? 1.1 : 1,
      justifySelf: x < 0 ? 'end' : 'start',
      immediate: name => down && name === 'x',
    })
  )
  return (
    <div className="slider-main">
      <animated.div
        {...bind()}
        className="slider-item"
        style={{ background: bg }}>
        <animated.div
          className="slider-av"
          style={{ transform: avSize, justifySelf }}
        />
        <animated.div className="slider-fg" style={{ x, scale: size }}>
          Slide
        </animated.div>
      </animated.div>
    </div>
  )
}
