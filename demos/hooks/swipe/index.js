import React, { useState } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export default function Swipe() {
  const [xPos, setXPos] = useState(0)
  const [yPos, setYPos] = useState(0)
  const props = useSpring({ x: xPos * 300, y: yPos * 300 })
  const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
    if (last) {
      if (Math.abs(vx) > Math.abs(vy)) {
        // swipe left
        if (vx < -0.3 && xPos > -1) setXPos(xp => xp - 1)
        // swipe right
        else if (vx > 0.3 && xPos < 1) setXPos(xp => xp + 1)
      } else {
        // swipe up
        if (vy < -0.3 && yPos > -1) setYPos(yp => yp - 1)
        // swipe down
        else if (vy > 0.3 && yPos < 1) setYPos(yp => yp + 1)
      }
    }
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="swipe flex-content">
      <animated.div {...bind()} style={props} />
      <div className="grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
