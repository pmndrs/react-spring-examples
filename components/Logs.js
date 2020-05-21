import styled, { createGlobalStyle } from 'styled-components'
import { o, withAuto } from 'wana'
import stringifyObject from 'stringify-object'
import fabulous from 'fabulous'
import syntaxJs from 'fabulous/lib/rules/javascript'
import React from 'react'

const state = o({
  expand: false,
})

export const logs = o([])

export const log = (...args) => {
  const parts = args.map(arg =>
    typeof arg == 'string'
      ? arg
      : fabulous(stringify(arg), {
          ...syntaxJs,
          function: /\[object Function\]/,
          undefined: /undefined/,
        })
  )
  logs.push(parts.join(' '))
}

export const clearLogs = () => {
  logs.length = 0
  logs.push('Log cleared.')
}

export const toggleExpandedLogs = () => {
  state.expand = !state.expand
}

export const Logs = withAuto(() => {
  const reversedLogs = logs.slice().reverse()
  return (
    <div
      className="logs"
      style={{
        height: state.expand ? '80vh' : '30vh',
      }}>
      <LogStyles />
      <div className="controls">
        <Button onClick={toggleExpandedLogs}>
          {state.expand ? 'Collapse' : 'Expand'}
        </Button>
        <Button onClick={clearLogs}>Clear</Button>
      </div>
      <div className="scroll">
        {reversedLogs.map((log, i) => (
          <div
            key={i}
            className="log"
            dangerouslySetInnerHTML={{ __html: log }}
          />
        ))}
      </div>
    </div>
  )
})

const stringify = val =>
  stringifyObject(val, {
    indent: '  ',
    transform(obj, prop, str) {
      return typeof obj[prop] == 'function'
        ? Object.prototype.toString.call(obj[prop])
        : str
    },
  })

const Button = styled.div`
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

const LogStyles = createGlobalStyle`
  .logs {
    position: fixed;
    bottom: 0;
    width: calc(100% - 20px);
    left: 0;
    color: white;
    background: black;
    border-radius: 8px;
    margin: 10px;
    max-width: 100%;
  }

  .logs .controls {
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
  }

  .logs .scroll {
    overflow: scroll;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column-reverse;
  }

  .log {
    font-size: 0.875em;
    font-family: Menlo, monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding-top: 15px;
  }

  .log .number, .log .primitive {
    color: #ffe72f;
  }

  .log .string {
    color: #7fff89;
  }

  .log .function {
    color: #09ffff;
  }

  .log .undefined {
    color: gray;
  }
`
