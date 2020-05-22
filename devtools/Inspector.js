import React from 'react'
import styled from 'styled-components'
import { a, useTransition, useSpring } from 'react-spring'
import { withAuto } from 'wana'
import { stringify } from './log'
import { state } from './state'
import { Controls, ClearInspectorButton } from './Controls'

export const Inspector = withAuto(() => {
  const { nodes } = state.inspector
  const entries = Array.from(nodes.entries())
  console.log('Inspector.render:', entries)
  const rowTransition = useTransition(entries, {
    keys: entry => entry[0].id,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 30 },
    leave: { reverse: true },
    config: { frequency: 1.2 },
  })
  return (
    <Root>
      <Controls>
        <ClearInspectorButton />
      </Controls>
      {rowTransition((style, [spring, node]) => {
        const SpringRowAnimated = a(SpringRow)
        return (
          <SpringRowAnimated style={style}>
            <SpringNode spring={spring} node={node} />
          </SpringRowAnimated>
        )
      })}
    </Root>
  )
})

const SpringNode = withAuto(({ spring, node: { animations } }) => {
  return (
    <div style={{ display: 'flex' }}>
      {animations.map((animation, i) => (
        <Animation
          key={i}
          spring={spring}
          animation={animation}
          prev={animations[i - 1]}
        />
      ))}
    </div>
  )
})

const TimelineNode = styled.div`
  width: 24px;
  height: 24px;
  color: ${props => (props.finished ? 'white' : 'gray')};
  font-size: 10px;
  font-weight: 500;
  font-family: 'Source Sans Pro', sans-serif;
  background: black;
  border: 1px solid hsl(0, 0%, 30%);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Animation = withAuto(({ spring, animation = {}, prev }) => {
  const { from, to, value, finished } = animation
  const { scale, opacity } = useSpring({
    to: { scale: 1, opacity: 1 },
    from: { scale: 0.3, opacity: 0 },
  })
  const lineWidth = 50
  const progress = (value - from) / (to - from)
  const { x, scaleX } = useSpring({
    // x: -lineWidth * (1 - progress),
    scaleX: progress,
    config: { frequency: 0.3 },
  })
  return (
    <a.div
      style={{ display: 'flex', scale, opacity, marginLeft: prev ? -24 : 0 }}>
      <TimelineNode finished={true}>{Math.round(from)}</TimelineNode>
      <div
        style={{
          position: 'relative',
          top: 11.5,
          width: lineWidth,
          height: 1,
          borderRadius: 1,
          backgroundColor: 'gray',
        }}>
        <a.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            scaleX,
            x,
          }}
        />
      </div>
      <TimelineNode finished={finished}>{Math.round(to)}</TimelineNode>
    </a.div>
  )
})

const Root = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column-reverse;
`

const SpringRow = styled.div`
  margin: 5px;
  white-space: pre-wrap;
`
