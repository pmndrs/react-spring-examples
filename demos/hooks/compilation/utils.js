import decamelize from 'decamelize'
import camelcase from 'camelcase'

const filterObjByKey = (obj, key) =>
  Object.entries(obj)
    .filter(([k]) => k.indexOf(key) > -1)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

const prefixWithKey = (obj, prefix) =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => ({ ...acc, [camelcase([prefix, k])]: v || 0 }),
    {}
  )

const unprefix = obj =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => ({ ...acc, [decamelPop(k)]: v }),
    {}
  )

const toFixed = n => (Array.isArray(n) ? n.map(toFixed) : n.toFixed(2))

const decamelPop = s =>
  decamelize(s)
    .split('_')
    .pop()

const filterGestureValues = (v, o, key) =>
  Object.keys(o)
    .filter(k => k.indexOf(key) > -1)
    .reduce((acc, kk) => {
      const val = v[decamelPop(kk)]
      return { ...acc, [kk]: typeof val === 'boolean' ? ~~val : val }
    }, {})

const trans = (x, y) => `translate3d(${x}px,${y}px,0)`
// const trans = (x, y) => (console.log(x, y), `translate3d(${x}px,${y}px,0)`)

export {
  camelcase,
  filterObjByKey,
  prefixWithKey,
  unprefix,
  toFixed,
  filterGestureValues,
  trans,
}
