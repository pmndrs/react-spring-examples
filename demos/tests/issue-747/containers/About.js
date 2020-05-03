import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  width: 100%;
  background: rgba(103, 128, 159, 1);
  font-size: 10em;
  font-weight: 800;
  color: white;
`

class About extends Component {
  render() {
    return <Container style={this.props.style}>About</Container>
  }
}

export default About
