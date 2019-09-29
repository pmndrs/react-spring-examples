import React, { useState, useEffect } from 'react'
import { useSprings, useTransition, a } from 'react-spring'
import './styles.css'

const pages = [
  ({ style }) => <a.div style={{ ...style, background: 'lightpink' }}>A</a.div>,
  ({ style }) => <a.div style={{ ...style, background: 'lightblue' }}>B</a.div>,
  ({ style }) => (
    <a.div style={{ ...style, background: 'lightgreen' }}>C</a.div>
  ),
]

export default function App() {
  //const [, fU] = useState()
  // It should not matter if the component is re-rendered, it shouldn't drop out of sync
  //useEffect(() => void setInterval(fU, 100), [])

  const [index, set] = useState(0)
  const transition = useTransition(index, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    initial: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

  return (
    <div className="simple-trans-main" onClick={() => set(state => state + 1)}>
      {transition((props, item) => {
        const Page = pages[item % 3]
        return <Page style={props} />
      })}
    </div>
  )
}
