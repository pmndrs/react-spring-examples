import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Trail, animated } from 'react-spring'

const AnimatedItem = styled(animated.div)`
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
`

const items = [
  { name: 'first row' },
  { name: 'second row' },
  { name: 'third row' },
  { name: 'fourth row' },
  { name: 'fifth row' },
  { name: 'sixth row' },
  { name: 'seventh row' },
  { name: 'eighth row' },
]

export default function App() {
  return (
    <div className="App">
      <Trail
        native
        items={items}
        key={change => change.date}
        from={{ opacity: 0, transform: 'translate3d(0%, -20%, 0%)' }}
        to={{ opacity: 1, transform: 'translate3d(0%, 0%, 0%)' }}
        config={{ mass: 1, tension: 500, friction: 47 }}>
        {(item, index) => styles => (
          <AnimatedItem key={item.name} style={styles}>
            {item.name}
          </AnimatedItem>
        )}
      </Trail>
    </div>
  )
}
