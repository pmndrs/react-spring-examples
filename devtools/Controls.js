import React from 'react'
import styled from 'styled-components'
import { withAuto } from 'wana'
import { state, toggleExpand, resetInspector } from './state'
import { clearLogs } from './log'

export const Controls = styled.div`
  position: absolute;
  bottom: 8px;
  right: 17px;
  display: flex;
  z-index: 2;
`

export const Button = styled.div`
  display: block;
  padding: 6px;
  font-size: 0.875em;
  color: hsl(0, 0%, 70%);
  background-color: black;
  border: 1px solid hsl(0, 0%, 25%);
  border-radius: 6px;
  transition: all ease-out 200ms;
  cursor: pointer;

  :not(:last-child) {
    margin-right: 8px;
  }

  :hover {
    color: hsl(0, 0%, 90%);
    border-color: hsl(0, 0%, 40%);
  }
`

export const ExpandToggle = withAuto(props => (
  <Button
    {...props}
    onClick={toggleExpand}
    children={state.expand ? 'Collapse' : 'Expand'}
  />
))

export const ClearLogsButton = props => (
  <Button onClick={clearLogs}>Clear</Button>
)

export const ClearInspectorButton = props => (
  <Button onClick={resetInspector}>Clear</Button>
)
