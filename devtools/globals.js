import { Globals as G } from 'react-spring'
import { inspectFrame } from './state'

G.assign({
  willAdvance(springs) {
    G.frameLoop.onFrame(() => inspectFrame(springs))
  },
})
