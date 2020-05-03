// EXTERNAL IMPORTS //
import React, { PureComponent } from 'react'

// CSS STYLING //
import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 93vh;
  background: grey;
  font-size: 10em;
  font-weight: 800;
  color: white;
`

class Home extends PureComponent {
  render() {
    return <Container>Home</Container>
  }
}

export default Home
