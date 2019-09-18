import React from 'react'
import { useSprings, a } from 'react-spring'
import { useGesture } from 'react-with-gesture'
import './styles.css'

const pages = ['blue', 'yellow', 'red']

export default function App() {
  const [props, set] = useSprings(pages.length, () => ({ x: 0 }))
  const move = x => {
    set({ x })
    //set(i => ({ x }));
  }

  const bind = useGesture(({ local }) => {
    move(local[0])
  })

  return (
    <>
      <button onClick={() => move(props[0].x.get() + 100)}>Move</button>
      <div className="container">
        {props.map(({ x }, i) => (
          <a.div
            {...bind()}
            key={i}
            className="mover"
            style={{
              transform: x.interpolate(x => `translate(${x}px)`),
              backgroundColor: pages[i],
            }}
          />
        ))}
      </div>
    </>
  )
}
