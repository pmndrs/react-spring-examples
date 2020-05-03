import React from 'react'
import ReactDOM from 'react-dom'
import { animated, useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import './styles.css'

const imgs = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=750',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=750',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=750',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=750',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=750',
]

export default function App() {
  const [{ y }, set] = useSpring(() => ({ y: 0 }))

  const bind = useDrag(
    ({ last, down, movement: [, my], vxvy: [, vy] }) => {
      if (down) {
        console.log('no decay', my, last)
        set({
          y: my,
          config: { decay: false, velocity: 0 },
          onProps(props, { animation }) {
            console.log('spring:', { ...animation })
          },
        })
      } else {
        console.log('decay', my, vy, last)
        set({
          config: { decay: true, velocity: vy },
          onProps(props, { animation }) {
            console.log('decay:', { ...animation })
          },
        })
      }
    },

    {
      initial: () => {
        const b = y.get()
        console.log('---INITIAL---', b)
        return [0, b]
      },
    }
  )

  return (
    <animated.div
      className="wrapper"
      {...bind()}
      style={{
        transform: y.to(v => {
          return `translateY(${v}px)`
        }),
      }}>
      {imgs.map((img, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
      ))}
    </animated.div>
  )
}
