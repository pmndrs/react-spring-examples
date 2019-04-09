import React, { useRef, useState, useEffect } from 'react'
import lorem from 'lorem-ipsum'
import { X } from 'react-feather'
import { useTransition } from 'react-spring'
import { Main, Container, Message, Button, Content, Life } from './styles.js'

const DEBUG = false

let id = 0

function MessageHub({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  children,
}) {
  const [refMap] = useState(() => new WeakMap())
  const [cancelMap] = useState(() => new WeakMap())
  const [items, setItems] = useState([])

  const transitions = useTransition(items, item => item.key, {
    from: { opacity: 0, height: 0, life: '100%' },
    enter: item => async (next, stop) => {
      cancelMap.set(item, () => {
        stop()
        setItems(state => state.filter(i => i.key !== item.key))
      })
      if (DEBUG) console.log(`  Entering:`, item.key)
      await next({
        opacity: 1,
        height: refMap.get(item).offsetHeight,
        config,
      })
      if (DEBUG)
        console.log(`  Animating "life" to zero over ${timeout}ms:`, item.key)
      await next({ life: '0%', config: { duration: timeout } })
      if (DEBUG) console.log(`  End of sequence:`, item.key)
      cancelMap.get(item)()
    },
    leave: item => async next => {
      if (DEBUG) console.log(`  Animating "opacity" to zero:`, item.key)
      await next({ opacity: 0, config })
      if (DEBUG) console.log(`  Animating "height" to zero:`, item.key)
      await next({ height: 0, config })
      if (DEBUG) console.log(`  End of sequence:`, item.key)
    },
  })

  useEffect(
    () =>
      void children(msg => setItems(state => [...state, { key: id++, msg }])),
    []
  )

  return (
    <Container>
      {transitions.map(({ key, item, props: { life, ...style } }) => (
        <Message key={key} style={style}>
          <Content ref={ref => ref && refMap.set(item, ref)}>
            <Life style={{ right: life }} />
            <p>{item.msg}</p>
            <Button
              onClick={e => {
                e.stopPropagation()
                if (cancelMap.has(item)) {
                  if (DEBUG) console.log(`  Cancelled item:`, item)
                  cancelMap.get(item)()
                }
              }}>
              <X size={18} />
            </Button>
          </Content>
        </Message>
      ))}
    </Container>
  )
}

export default function App() {
  const ref = useRef(null)
  return (
    <Main onClick={() => ref.current(lorem())}>
      Click here
      <br />
      to create notifications
      <MessageHub children={add => (ref.current = add)} />
    </Main>
  )
}
