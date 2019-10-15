import React from 'react'
import ReactDOM from 'react-dom'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function linearGradient(deg, startColor, startPosition, endColor, endPosition) {
  return `linear-gradient(${deg}deg, ${startColor} ${startPosition}, ${endColor} ${endPosition})`
}

const background = linearGradient(180, 'red', '0%', 'blue', '100%')

export default class App extends React.Component {
  render() {
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={2}>
        <ParallaxLayer factor={0.5} offset={0} speed={1}>
          <div
            style={{
              height: '100%',
              background,
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer factor={0.5} offset={0.5} speed={0}>
          <div
            style={{
              height: '100%',
              background,
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer factor={0.5} offset={1} speed={0}>
          <div
            style={{
              height: '100%',
              background,
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer factor={0.5} offset={1.5} speed={1}>
          <div
            style={{
              height: '100%',
              background,
            }}
          />
        </ParallaxLayer>
      </Parallax>
    )
  }
}
