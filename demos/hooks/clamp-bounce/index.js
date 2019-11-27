import React from 'react'
import { useSpring, animated } from 'react-spring'
import './styles.css'

export default function ClampBounce() {
  const [toggle, setToggle] = React.useState(false)
  const { y } = useSpring({
    y: toggle ? 250 : -250,
    config: { tension: 120, friction: 12, clamp: 2 },
  })

  return (
    <div className="clamp-bounce">
      <animated.div onClick={() => setToggle(t => !t)} style={{ y }} />
    </div>
  )
}
