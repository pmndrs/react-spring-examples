import React, { useRef, useState } from 'react'
import { useSpring, useChain, animated } from 'react-spring'
import classnames from 'classnames'
import './styles.scss'

export const animationConfig = { mass: 2, tension: 3500, friction: 250 }

export default function Chain() {
  const [toggle, setToggle] = useState(false)

  const animation1Ref = useRef()
  const animation1Props = useSpring({
    width: toggle ? 100 : 50,
    ref: animation1Ref,
  })

  const animation2Ref = useRef()
  const animation2Props = useSpring({
    width: toggle ? '100%' : '50%',
    ref: animation2Ref,
  })

  // Chain animation order
  useChain([animation1Ref, animation2Ref])

  return (
    <>
      <button onClick={() => setToggle(x => !x)}>
        {toggle ? 'Hide' : 'Release'} the box!
      </button>
      <animated.div
        style={{
          ...animation1Props,
          backgroundColor: 'yellow',
          width: animation1Props.width.interpolate(value => `${value}%`),
        }}>
        <div className="the-box" />
      </animated.div>
      <animated.div
        style={{
          ...animation2Props,
          backgroundColor: 'pink',
        }}>
        <div className="the-box" />
      </animated.div>
    </>
  )
}
