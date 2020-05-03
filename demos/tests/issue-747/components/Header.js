import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(228, 233, 237, 1);
  box-shadow: 0px 12px 20px -5px rgba(0, 0, 0, 0.4);
  z-index: 11;
`

const Nav = styled(NavLink)`
  text-decoration: none;
  font-size: 24px;
  padding: 0 7px;
`

const Header = () => {
  return (
    <Wrapper>
      <Nav to="/">Home</Nav>
      <Nav to="/test">Test</Nav>
      <Nav to="/about">About</Nav>
    </Wrapper>
  )
}

export default Header
