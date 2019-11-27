import React from 'react'
import ReactDOM from 'react-dom'
import DemoGrid from './components/DemoGrid'
import Demo from './components/Demo'
import examples from './components/examples-hooks'
// import examples from './components/examples-renderprops'
// import examples from './components/examples-tests'
import './styles.css'

let DEBUG = false
// DEBUG = 'multi'

ReactDOM.render(
  <DemoGrid fullscreen={!!DEBUG}>
    {examples
      .filter(item => (DEBUG ? item.name.includes(DEBUG) : true))
      .map(data => (
        <Demo
          overlayCode={DEBUG === false}
          fullscreen={!!DEBUG}
          key={data.name}
          {...data}
          import={import('./demos/' + data.name)}
        />
      ))}
  </DemoGrid>,
  document.getElementById('root')
)
