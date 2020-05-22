import { Globals as G } from 'react-spring'
import { o } from 'wana'

export const state = o({
  /** The current focused tab */
  tab: 0,
  /** The fixed devtools panel is expanded */
  expand: false,
  /** The log history */
  logs: o([]),
  /** Inspector state */
  inspector: o({
    nodes: o(new Map()),
    selection: null,
  }),
})

export const toggleExpand = () => {
  state.expand = !state.expand
}

export const resetInspector = () => {
  state.inspector.nodes.clear()
  state.inspector.selection = null
}

export const inspectFrame = springs => {
  const { nodes } = state.inspector
  for (const spring of springs) {
    if (spring.is('DISPOSED')) {
      nodes.delete(spring)
      continue
    }
    let node = nodes.get(spring)
    if (!node) {
      if (!spring.animation.debug) {
        continue
      }
      nodes.set(
        spring,
        (node = o({
          animation: null,
          animations: o([]),
        }))
      )
      const observer = {
        onParentChange(e) {
          if (!spring.animation.debug) {
            nodes.delete(spring)
            return
          }
          let anim = node.animation
          if (e.type == 'change') {
            // When the animation starts:
            if (!anim) {
              const { toValues, fromValues } = spring.animation
              node.animations.push(
                (anim = node.animation = o({
                  to: toValues[0],
                  from: fromValues[0],
                  value: undefined,
                  startTime: G.now(),
                  endTime: undefined,
                  frames: o([]),
                  finished: undefined,
                  cancelled: undefined,
                }))
              )
            }
            // When the animation updates:
            anim.value = spring.get()
            anim.frames.push(anim.value)
          }
          // When the animation ends:
          else if (anim && e.type == 'idle') {
            anim.finished = e.result.finished === true
            anim.cancelled = e.result.cancelled === true
            anim.endTime = G.now()
            node.animation = null
          }
        },
      }
      spring.addChild(observer)
    }
  }
}
