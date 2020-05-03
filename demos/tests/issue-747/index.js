import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Transition, animated } from 'react-spring'
import Header from './components/Header'
import Home from './containers/Home'
import About from './containers/About'
import Test from './containers/Test'
import styled from 'styled-components'
import './styles.css'

const Container = styled(animated.div)`
  position: absolute;
  width: 100%;
`

// Re-use this class whereever you would normally switch between routes ...
const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{
          opacity: 0,
          transform: 'perspective(900px) rotateY(180deg)',
        }}
        enter={[
          { opacity: 1, transform: 'perspective(1000px) rotateY(0deg)' },
          { transform: 'none', immediate: true },
        ]}
        leave={[
          { transform: 'perspective(1000px) rotateY(0deg)', immediate: true },
          {
            opacity: 0,
            transform: 'perspective(900px) rotateY(-180deg)',
            pointerEvents: 'none',
          },
        ]}>
        {(style, location) => (
          <Container style={style}>{children(location)}</Container>
        )}
      </Transition>
    )}
  />
)

export default class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <AnimatedRoute>
            {location => (
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route path="/Test" component={Test} />
                <Route path="/about" component={About} />
              </Switch>
            )}
          </AnimatedRoute>
        </>
      </Router>
    )
  }
}
