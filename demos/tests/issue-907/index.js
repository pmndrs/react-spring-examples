import React from 'react'
import { Canvas, Dom } from 'react-three-fiber'

import { useSpring } from '@react-spring/core'
import { a as aW } from '@react-spring/web'
import { a as aT } from '@react-spring/three'

const a = { ...aW, ...aT }

import './styles.css'

function Box({ y }) {
  return (
    <a.mesh rotation-y={y.to(y => (y * Math.PI) / 180)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="orange" />
    </a.mesh>
  )
}

export default function App() {
  const props = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  })
  return (
    <Canvas colorManagement>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box y={props.rotateZ} />
      <Dom center>
        <a.div
          className="box"
          style={{
            rotateZ: props.rotateZ,
          }}
        />
      </Dom>
    </Canvas>
  )
}
