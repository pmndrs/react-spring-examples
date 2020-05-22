import React, { useRef, useMemo, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { withAuto, useO } from 'wana'
import { state, toggleExpand } from './state'
import { Controls, ExpandToggle, ClearLogsButton } from './Controls'
import { clearLogs } from './log'
import rafThrottle from 'raf-schd'

export const Logs = withAuto(() => {
  const scrollRef = useRef()
  const scrollState = useO({
    active: false,
    ignoreScroll: false,
    stickToBottom: true,
    maxScrollTop: 0,
  })

  const onScroll = useMemo(() => {
    const onScrollEnd = debounce(50, () => {
      // console.log('onScrollEnd')
      scrollState.active = false
    })
    return rafThrottle(() => {
      // Useful when setting the scroll position.
      if (scrollState.ignoreScroll) {
        scrollState.ignoreScroll = false
        return
      }

      const { maxScrollTop } = scrollState
      const { scrollTop } = scrollRef.current

      const distanceFromBottom = maxScrollTop - scrollTop
      const stickToBottom = distanceFromBottom < 5

      // console.log('onScroll:', { stickToBottom, scrollTop, maxScrollTop })
      Object.assign(scrollState, {
        active: true,
        stickToBottom,
      })

      onScrollEnd()
    })
  }, [])

  useLayoutEffect(() => {
    const scrollElem = scrollRef.current
    scrollState.maxScrollTop = scrollElem.scrollHeight - scrollElem.clientHeight

    console.log('onLayout:', { ...scrollState })
    if (scrollState.stickToBottom && !scrollState.active) {
      scrollState.ignoreScroll = true
      scrollElem.scrollTop = scrollState.maxScrollTop
    }
  })

  const { logs } = state
  return (
    <Root ref={scrollRef} onScroll={onScroll}>
      {logs.map(({ text, date }, i) => (
        <LogEntry key={i}>
          <LogStamp date={date} prev={logs[i - 1]} />
          <br />
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </LogEntry>
      ))}
      <Controls>
        <ExpandToggle />
        <ClearLogsButton />
      </Controls>
    </Root>
  )
})

function debounce(ms, effect) {
  let timeout = -1
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(effect, ms)
  }
}

const Root = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  margin: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.15);
  }
`

const LogStamp = ({ date, prev }) => {
  let stamp = date.toLocaleTimeString()

  // Add milliseconds.
  let ms = date.getMilliseconds()
  if (ms < 10) ms = '00' + ms
  else if (ms < 100) ms = '0' + ms
  stamp = stamp.replace(/ ([AP]M)$/, `.${ms} $1`)

  // Add time since last log.
  const elapsed = prev ? date - prev.date : null
  return (
    <span className="timestamp">
      {stamp + ' '}
      {elapsed !== null && <span className="elapsed">+{elapsed}ms</span>}
    </span>
  )
}

const LogEntry = styled.div`
  font-size: 0.875em;
  font-family: Menlo, monospace;
  white-space: pre-wrap;
  word-wrap: break-word;

  :not(:first-child) {
    padding-top: 15px;
  }

  span.number,
  span.primitive {
    color: #ffe72f;
  }

  span.string {
    color: #7fff89;
  }

  span.object {
    color: #09ffff;
  }

  span.undefined {
    color: gray;
  }

  .timestamp {
    font-size: 0.8125em;
    color: gray;
    padding: 5px 0;
  }

  .elapsed {
    color: #7fff89;
  }
`
