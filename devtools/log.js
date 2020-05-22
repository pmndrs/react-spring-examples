import fabulous from 'fabulous'
import syntaxJs from 'fabulous/lib/rules/javascript'
import stringifyObject from 'stringify-object'
import { state } from './state'

const { logs } = state

export const log = (...args) => {
  const parts = args.map(arg =>
    typeof arg == 'string'
      ? arg
      : fabulous(stringify(arg), {
          ...syntaxJs,
          object: /\[object (.+)\]/,
          undefined: /undefined/,
        })
  )
  logs.push({
    text: parts.join(' '),
    date: new Date(),
  })
}

export const clearLogs = () => {
  logs.length = 0
  log('Logs cleared.')
  state.expand = false
}

export const stringify = val =>
  stringifyObject(val, {
    indent: '  ',
    transform(obj, prop, str) {
      const val = obj[prop]
      return val &&
        /^(object|function)$/.test(typeof val) &&
        ![Object, Array].includes(val.constructor)
        ? `[object ${val.constructor.name || 'Object'}]`
        : str
    },
  })
