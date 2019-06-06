import React from 'react'
import { useSpring, animated as a, interpolate } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import {
  camelcase,
  prefixWithKey,
  unprefix,
  filterObjByKey,
  filterGestureValues,
  toFixed,
  trans,
} from './utils'
import './styles.css'

// creates events
const events = ['window scroll', 'wheel', 'drag', 'div scroll', 'hover']
const initialValues = {
  xy: [0, 0],
  velocity: 0,
  vxvy: [0, 0],
  delta: [0, 0],
  active: false,
  direction: [0, 0],
}
const springs = events.map(title => ({
  key: camelcase(title),
  title,
  values: { ...initialValues },
}))

const Counter = ({ className, title, active, log, ...props }) => (
  <a.div
    className={className}
    style={{ background: active.interpolate([0, 1], ['lightgray', 'pink']) }}>
    <div>{title}</div>
    {Object.entries(props).map(([k, v]) => (
      <div key={k}>
        {k}: <a.span>{interpolate([v], toFixed)}</a.span>
      </div>
    ))}
    <div>{log}</div>
  </a.div>
)

export default function Compilation() {
  const prefixed = springs.reduce(
    (acc, { key, values }) => ({ ...acc, ...prefixWithKey(values, key) }),
    {}
  )
  const [infoValues, setInfoValues] = useSpring(() => ({
    ...prefixed,
    immediate: k => k.toLowerCase().indexOf('active') === -1,
  }))
  const [uiValues, setUiValues] = useSpring(() => prefixed)
  const {
    dragDelta,
    windowScrollXy,
    wheelXy,
    hoverDelta,
    divScrollVxvy,
  } = uiValues

  const [{ hoverSize }, setHoverSize] = useSpring(() => ({ hoverSize: 1 }))
  const [{ dragColor, dragSize }, setDrag] = useSpring(() => ({
    dragColor: 'lightskyblue',
    dragSize: 1,
  }))

  const [logs, setLogs] = React.useState({})

  const hoverBind = useGesture({
    onMoveStart: () => setLogs(logs => ({ ...logs, hover: 'Move started' })),
    onMoveEnd: () => {
      setUiValues({ hoverDelta: [0, 0] })
      setLogs(logs => ({ ...logs, hover: 'Move ended' }))
    },
    onMove: v => {
      const { delta, type } = v
      setInfoValues(filterGestureValues(v, uiValues, 'hover'))
      setUiValues({ hoverDelta: delta })
    },
    onHover: ({ hovering }) => setHoverSize({ hoverSize: hovering ? 1.2 : 1 }),
  })

  const dragBind = useGesture(
    {
      onDragStart: () => setLogs(logs => ({ ...logs, drag: 'Drag started' })),
      onDragEnd: v => setLogs(logs => ({ ...logs, drag: 'Drag ended' })),
      onDrag: v => {
        v.event.preventDefault()
        const { dragging, velocity, delta, cancel, canceled } = v

        if (delta[0] > 100) cancel()
        setInfoValues(filterGestureValues(v, uiValues, 'drag'))
        // setDrag({ dragSize: dragging ? 2 : 1 })
        const mass = Math.max(1, Math.min(8, velocity))
        setUiValues({
          dragDelta: dragging ? delta : [0, 0],
          config: { mass, tension: 500 * mass, friction: 50 },
        })
      },
      onHover: ({ hovering, dragging }) => {
        setDrag({ dragColor: dragging || hovering ? 'red' : 'lightskyblue' })
      },
    },
    { event: { passive: false } }
  )

  const divScrollBind = useGesture({
    onScrollStart: () =>
      setLogs(logs => ({ ...logs, divScroll: 'Scroll started' })),
    onScrollEnd: () =>
      setLogs(logs => ({ ...logs, divScroll: 'Scroll ended' })),
    onScroll: v => {
      const { vxvy, velocity, scrolling } = v
      setInfoValues(filterGestureValues(v, uiValues, 'divScroll'))
      setUiValues({ divScrollVxvy: scrolling ? vxvy : [0, 0] })
    },
  })

  const windowScrollBind = useGesture(
    {
      onScrollStart: () =>
        setLogs(logs => ({ ...logs, windowScroll: 'Scroll started' })),
      onScrollEnd: v => {
        setLogs(logs => ({ ...logs, windowScroll: 'Scroll ended' }))
      },
      onScroll: v => {
        const { xy } = v
        setInfoValues(filterGestureValues(v, uiValues, 'windowScroll'))
        setUiValues({
          windowScrollXy: [
            (xy[0] / document.body.scrollWidth) * window.innerWidth,
            (xy[1] / document.body.scrollHeight) * window.innerHeight,
          ],
        })
      },
    },
    { domTarget: window }
  )

  const wheelBind = useGesture({
    onWheelStart: () => setLogs(logs => ({ ...logs, wheel: 'Wheel started' })),
    onWheelEnd: () => setLogs(logs => ({ ...logs, wheel: 'Wheel ended' })),
    onWheel: v => {
      const { xy } = v
      setInfoValues(filterGestureValues(v, uiValues, 'wheel'))
      setUiValues({ wheelXy: xy })
    },
  })

  React.useEffect(windowScrollBind, [windowScrollBind])

  return (
    <>
      <div className="compilation flex-content">
        <div className="counters">
          {springs.map(({ title, key }) => (
            <Counter
              key={key}
              className={`counter ${key}`}
              title={title}
              log={logs[key]}
              {...unprefix(filterObjByKey(infoValues, key))}
            />
          ))}
        </div>
        <div className="boxes flex">
          <a.div
            className="box flex drag"
            {...dragBind()}
            style={{
              background: dragColor,
              transform: interpolate(
                [dragDelta, dragSize],
                ([x, y], s) => `${trans(x, y)} scale(${s})`
              ),
            }}>
            <b>Drag Me</b>
          </a.div>
          <div className="flex wheel" {...wheelBind()}>
            Wheel Me
            <a.div
              className="flex squares"
              style={{
                transform: wheelXy.interpolate(
                  (x, y) => `translateY(${-20 - (y % 24)}px)`
                ),
              }}>
              {Array(5)
                .fill(0)
                .map((a, i) => (
                  <div key={i} />
                ))}
            </a.div>
          </div>
          <a.div
            className="flex hover"
            {...hoverBind()}
            style={{
              transform: hoverSize.interpolate(s => `scale(${s})`),
            }}>
            Hover Me
            <a.div
              className="dot"
              style={{ transform: hoverDelta.interpolate(trans) }}
            />
          </a.div>
          <div className="flex scroll">
            Scroll Me
            <a.div
              className="indicator"
              style={{
                transform: divScrollVxvy.interpolate(
                  (x, y) => `scaleY(${1 + Math.abs(y * 20)})`
                ),
              }}
            />
            <div className="content" {...divScrollBind()}>
              <div />
            </div>
          </div>
        </div>
        <a.div
          style={{
            height: windowScrollXy.interpolate((x, y) => `${y + 10}px`),
          }}
          className="scroll-indicator y"
        />
        <a.div
          style={{ width: windowScrollXy.interpolate(x => `${x + 10}px`) }}
          className="scroll-indicator x"
        />
      </div>
      <div style={{ height: '400vh', width: '400vw' }} />
    </>
  )
}
