import React, { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Frame, Content, toggle } from './styles'
import ResizeObserver from 'resize-observer-polyfill'
import * as Icons from './icons'

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

function useMeasure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}

function Tree({ children, name, style, open = false }) {
  const [isOpen, setOpen] = useState(open)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
    },
  })
  const Icon =
    Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <span style={{ verticalAlign: 'middle', ...style }}>{name}</span>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}>
        <animated.div style={{ transform }} {...bind}>
          {children}
        </animated.div>
      </Content>
    </Frame>
  )
}

export default function App() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        boxSizing: 'border-box',
        padding: 20,
      }}>
      <Tree name="main" open>
        <Tree name="hello" />
        <Tree name="subtree with children">
          <Tree name="hello" />
          <Tree name="sub-subtree with children">
            <Tree name="child 1" style={{ color: '#37ceff' }} />
            <Tree name="child 2" style={{ color: '#37ceff' }} />
            <Tree name="child 3" style={{ color: '#37ceff' }} />
          </Tree>
          <Tree name="hello" />
        </Tree>
        <Tree name="world" />
        <Tree name={<span>🙀 something something</span>} />
      </Tree>
    </div>
  )
}
