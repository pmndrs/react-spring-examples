import React from 'react'
import { animated, Transition } from 'react-spring'
import './styles.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyToAdd: 1,
      items: [{ key: 0 }],
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({ items, keyToAdd }) => {
        return {
          keyToAdd: keyToAdd + 1,
          items: items.concat({ key: keyToAdd }),
        }
      })
    }, 5000)
  }

  getChildren = items => items.map(item => <div>{item.key}</div>)

  render() {
    const { items } = this.state
    const children = this.getChildren(items)
    return (
      <div className="App">
        <h2>Animated items are not removed properly</h2>
        <AnimatedList items={children} />
      </div>
    )
  }
}

class AnimatedList extends React.Component {
  render() {
    const fromLeave = {
      opacity: 0,
    }
    const enter = {
      opacity: 1,
    }

    return (
      <Transition
        items={this.props.items}
        config={{ duration: 3000 }}
        initial={enter}
        from={fromLeave}
        enter={enter}
        leave={fromLeave}>
        {(animatedProps, item) => {
          return <animated.li style={animatedProps}>{item}</animated.li>
        }}
      </Transition>
    )
  }
}
