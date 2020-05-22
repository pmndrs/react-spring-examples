import React from 'react'
import styled from 'styled-components'
import { useTransition, a } from 'react-spring'
import { useO, withAuto } from 'wana'

import { Logs } from './Logs'
import { Inspector } from './Inspector'
import { state, toggleExpand } from './state'
import { clearLogs } from './log'
import './globals'

const tabs = [
  { name: 'Logs', render: Logs },
  { name: 'Inspector', render: Inspector },
]

export * from './log'

export const DevTools = withAuto(() => {
  const tabTransition = useTransition(tabs[state.tab], {
    from: { opacity: 0 },
    enter: { opacity: 1, config: { frequency: 1.2 }, delay: 100 },
    leave: { opacity: 0, config: { frequency: 0.3 } },
  })
  return (
    <Root
      style={{
        height: state.expand ? '80vh' : '30vh',
      }}>
      <Tabs>
        {tabs.map((tab, i) => {
          const selected = state.tab == i
          return (
            <Tab
              key={i}
              style={{
                color: `hsl(0, 0%, ${selected ? 100 : 40}%)`,
                borderColor: `hsl(0, 0%, ${selected ? 25 : 0}%)`,
              }}
              onClick={() => (state.tab = i)}>
              {tab.name}
            </Tab>
          )
        })}
      </Tabs>
      <Content>
        {tabTransition(
          (style, { render: Component }) =>
            Component && (
              <a.div
                style={{
                  ...style,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                }}>
                <Component />
              </a.div>
            )
        )}
      </Content>
    </Root>
  )
})

const Root = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 20px);
  left: 0;
  color: white;
  background: black;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`

const Content = styled.div`
  position: relative;
  flex: 1;
`

const Tab = styled.div`
  font-weight: 600;
  font-size: 0.75em;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 4px 10px;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;

  :not(:first-child) {
    margin-left: 5px;
  }
`

const Tabs = styled.div`
  width: 100%;
  padding: 10px;
  background: black;
  border-bottom: 1px solid hsl(0, 0%, 5%);
  display: flex;
  z-index: 1;
`
