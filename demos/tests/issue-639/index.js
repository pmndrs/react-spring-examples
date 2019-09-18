import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'
import slides from './slides.json'
import './styles.css'

export default function App() {
  const [index, set] = useState(0)
  useEffect(() => {
    setInterval(() => set(state => (state + 1) % 4), 2000)
  }, [])

  const transition = useTransition(
    slides[index],
    index % 2
      ? {
          leave: { transform: `translateX(100%)` },
          enter: { transform: `translateX(0)` },
          from: { transform: `translateX(100%)` },
        }
      : {
          leave: { transform: `rotateX(40deg) translateX(-20%)` },
          enter: { transform: `rotateX(0) translateX(0)` },
          from: { transform: `rotateX(40deg) translateY(-20%)` },
          config: config.molasses,
        }
  )

  return transition((style, item) => (
    <animated.div
      className="bg"
      style={{
        ...style,
        backgroundImage: `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`,
      }}
    />
  ))
}
