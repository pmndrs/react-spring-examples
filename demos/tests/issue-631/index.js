import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { useSpring, animated, useChain } from 'react-spring'
import styled from 'styled-components'

const Logo = ({ toggle, colors }) => {
  const farTrailRef = useRef(null)
  const closeTrailRef = useRef(null)
  const ballRef = useRef(null)

  const farTrailProps = useSpring({
    from: { y: toggle ? 0 : -394 },
    to: { y: toggle ? 394 : 0 },
    ref: farTrailRef,
  })

  const closeTrailProps = useSpring({
    from: { y: toggle ? 0 : 394 },
    to: { y: toggle ? -394 : 0 },
    ref: closeTrailRef,
  })

  const ballProps = useSpring({
    from: {
      fillOpacity: toggle ? 1 : 0,
    },
    to: {
      fillOpacity: toggle ? 0 : 1,
    },
    ref: ballRef,
  })

  useChain(
    [farTrailRef, closeTrailRef, ballRef],
    toggle ? [0, 0.48, 0.49] : [0, 0.38, 0.6]
  )

  return (
    <Wrapper>
      <animated.svg viewBox="-1 -1 645 394" width="400">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
            <stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors[1]} stopOpacity="1" />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors[2]} stopOpacity="1" />
            <stop offset="100%" stopColor={colors[3]} stopOpacity="1" />
          </linearGradient>
          <mask id={'farTrailMask' + colors[0]} maskUnits="userSpaceOnUse">
            <animated.rect
              width="645"
              height="394"
              fill="white"
              style={farTrailProps}
            />
          </mask>
          <mask id="closeTrailAndBallMask" maskUnits="userSpaceOnUse">
            <animated.rect
              width="645"
              height="420"
              fill="white"
              style={closeTrailProps}
              y="394"
            />
          </mask>
        </defs>
        <path
          id="far-trail"
          d="M437.5 390C419.5 390 276 390 258 390C229.5 334 194 276.5 151 217C108 157.5 57.5 96 0 32.5C91 87.5 173.5 145 246.5 204.5C319.5 264.5 383 326 437.5 390Z"
          mask={`url(#${'farTrailMask' + colors[0]})`}
          fill="url(#grad2)"
        />
        <path
          id="close-trail"
          d="M335.9 234C364.5 184.5 394.5 140 426 100C433 137.5 447.5 166 470 185C492 204 518.5 212.5 550 211.5C527 235 505 261.5 483.5 291C462 320.5 446.5 353.5 437.5 390L257.5 390C281 335.5 307.5 283.5 336 234Z"
          mask="url(#closeTrailAndBallMask)"
          fill="url(#grad1)"
        />
        <animated.path
          id="ball"
          d="M540 200C484.81 200 440 155.17 440 100C440 44.81 484.81 0 540 0C595.19 0 640 44.81 640 100C640 155.17 595.19 200 540 200Z"
          fill="url(#grad3)"
          fillOpacity="0"
          style={ballProps}
        />
      </animated.svg>
    </Wrapper>
  )
}

Logo.defaultProps = {
  toggle: false,
  colors: ['red', 'yellow', '#aaa', 'white'],
}

const Wrapper = styled(animated.div)`
  display: flex;
  width: 100%;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default function App() {
  const [hide, setHide] = useState(false)
  const [hide2, setHide2] = useState(true)

  return (
    <>
      <button onClick={() => setHide(x => !x)}>toggle animation</button>
      <button onClick={() => setHide2(x => !x)}>hide first one</button>

      {hide2 && <Logo key="black" toggle={hide} />}
      <Logo
        key="color"
        toggle={hide}
        colors={['black', 'gray', 'gray', 'black']}
      />
    </>
  )
}
