import { SpringContext, useSpring, a } from 'react-spring'
import React from 'react'

export default function App() {
  const [state, setState] = React.useState({})
  const bindChange = key => () => {
    setState(state => ({ ...state, [key]: !state[key] }))
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SpringContext {...state}>
        <Darkness />
      </SpringContext>
      <div style={{ padding: 20 }}>
        <button onClick={bindChange('pause')}>
          {state.pause ? 'Resume' : 'Pause'}
        </button>
        <button onClick={bindChange('cancel')}>
          {state.cancel ? 'Allow' : 'Cancel'}
        </button>
        <button onClick={bindChange('immediate')}>
          {state.immediate ? 'Remove Immediate' : 'Immediate'}
        </button>
      </div>
    </div>
  )
}

function Darkness() {
  const [{ rotateZ }] = useSpring(() => ({
    loop: true,
    config: { frequency: 0.7, damping: 0.8 },
    from: { rotateZ: 0 },
    to: [
      { rotateZ: 90, delay: 200 },
      { rotateZ: 180, delay: 200 },
      { rotateZ: 270, delay: 200 },
      { rotateZ: 360, delay: 200 },
    ],
    default: false,
    onRest() {
      console.log('onRest')
    },
  }))
  return (
    <a.div
      style={{
        width: 100,
        height: 100,
        background: 'black',
        borderRadius: 6,
        rotateZ,
      }}>
      <div style={{ display: 'flex', width: '100%' }}>
        {['blanchedalmond', 'lightseagreen'].map(renderColor)}
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        {['crimson', 'deeppink'].map(renderColor)}
      </div>
    </a.div>
  )
}

function renderColor(color) {
  return (
    <div
      key={color}
      style={{
        width: 12,
        height: 12,
        margin: (50 - 12) / 2,
        borderRadius: 999,
        backgroundColor: color,
      }}
    />
  )
}
