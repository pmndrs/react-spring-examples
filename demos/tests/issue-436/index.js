import React, { useState } from 'react'
import { useTransition, animated as a } from 'react-spring'

/**
 * Click the centered text to trigger a transition.
 *
 * When the `reset` prop is enabled, `enter` transitions are repeated on click.
 * Otherwise, the `leave` transition is performed on click.
 *
 * https://github.com/react-spring/react-spring/issues/436
 */
export default function App() {
  const [reset, setReset] = useState(false)
  const [item, setItem] = useState(0)
  const t = useTransition(item, null, {
    keys: i => i,
    initial: null,
    reset,
    from: { transform: 'translate(-100%)' },
    enter: { transform: 'translate(0%)' },
    leave: { transform: 'translate(100%)' },
  })
  const items = t.map(({ item, key, props }) => (
    <a.div
      key={key}
      style={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        top: 50,
        justifyContent: 'center',
        ...props,
      }}
      onClick={() => {
        setItem(i => i + 1)
      }}>
      clicks: {item}
    </a.div>
  ))
  return (
    <>
      {items}
      <button
        onClick={() => {
          setReset(reset => !reset)
        }}>
        {reset ? 'Disable' : 'Enable'} "reset" prop
      </button>
    </>
  )
}
