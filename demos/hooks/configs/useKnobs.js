import React, { useState } from 'react'

function Knob({ name, value, onChange, min = 1, max = 500 }) {
  return (
    <div style={{ position: 'relative', margin: 10 }}>
      <label>
        {name}: {value}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
        />
      </label>
    </div>
  )
}

export default function useKnobs(initialValues, options) {
  const [values, setValues] = useState(
    () => new Map(Object.entries(initialValues))
  )

  const valuesObject = {}
  const knobs = []
  values.forEach((value, key) => {
    valuesObject[key] = value

    knobs.push(
      <Knob
        {...options}
        key={key}
        name={key}
        value={value}
        onChange={newValue => {
          const newValues = new Map(values)
          newValues.set(key, newValue)
          setValues(newValues)
        }}
      />
    )
  })

  return [
    valuesObject,
    <div
      style={{
        top: 20,
        left: 20,
        width: 150,
        zIndex: 999999,
        position: 'absolute',
        padding: 20,
      }}>
      {knobs}
    </div>,
  ]
}
