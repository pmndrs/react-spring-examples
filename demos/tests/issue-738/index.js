import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Trail, animated } from 'react-spring'

export default function App() {
  //Hints database for test 1
  const db_test1 = [
    [],
    [1, 2, 3],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4],
    [1, 2],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 6, 7], //when those hints are show no animation occurs
    [1, 2, 3, 7, 5, 6], //same as above
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ]

  //Hints database for test 2
  const db_test2 = [
    [],
    [1, 2, 3],
    [4, 5, 6],
    [1, 2, 3],
    [4, 5, 6],
    [1, 2, 3, 4],
    [1, 2, 4, 5],
    [1, 2, 4, 6],
    [1, 2, 4, 7],
  ]

  const [hints, setHints] = useState([]) //state and handler for test 1
  const [hints2, setHints2] = useState([]) //state and handler for test 2

  /**
   * On input field change we pass which database to update from (_db_testX) and which state update handler to use (_setHintsX)
   */
  function onSearchFieldChange(e, _db_testX, _setHintsX) {
    _setHintsX(_db_testX[e.target.value.length])
  }

  return (
    <div className="App">
      <h1>Trail Issue in react-spring v.9 beta.31</h1>
      <ul>
        <li>
          Companion sandbox for a reported bug and discussion on github:{' '}
          <a href="https://github.com/react-spring/react-spring/issues/738#issue-463649732">
            https://github.com/react-spring/react-spring/issues/738#issue-463649732
          </a>
        </li>
        <li>
          If you type very slow and wait a bit after all animations finish then
          all works good.
        </li>
        <li>
          <strong>ISSUE 1. Typing too fast causes error. </strong>
          <br />
          If you type fast, and items in the hints list will get reduced before
          animations from previous trail end it, might cause an error: <br />
          <strong>
            Uncaught TypeError: Cannot read property 'props' of undefined
          </strong>
          <br />
          All tests below suffer from this issue.
        </li>
        <li>
          The original issue from v.8 reported on github seems to be fixed in
          v.9.
        </li>
        <li>
          <strong>
            ISSUE 2. V9 always re-animates all list items from scratch.
          </strong>
          <br />
          Here is link to v.8{' '}
          <a href="https://codesandbox.io/s/trail-issue-9wtvj">
            https://codesandbox.io/s/trail-issue-9wtvj
          </a>
          <br />
          This issue is mostly evident in TEST 1. Compare animation in Sanbox
          for v8 and v9. <br />
          Compared to v8 in v9 entire list gets always re-animated i.e. if you
          type 2 chars in TEST 1 in v8 then only hint with 4,5 and 6 gets
          animated. In v9 entire list is animated from scratch. Not sure if it's
          intentional.
        </li>
        <li>
          <strong>
            ISSUE 3. When item list is replaced with new one array of the same
            length the spring animations don't occur at all.
          </strong>
          <br />
          TEST 2 shows it the most. Here, length of many neighbouring lists is
          same.
          <br />
          If you type 2,3 or 4 chars the animations don't occur at all even
          though some list items are different in each invoked hints list.{' '}
          <br />
          If you type 5 chars the list is animated because hints list length
          differs for 5 chars. <br />
          Compare it to the TEXT 2 in v8 sandbox and you can see that in there
          animations are not missing and it properly animates only the replaced
          items.
        </li>
      </ul>
      <div className="container-fluid">
        <div className="row">
          {/*
              TEST 1
          */}
          <div className="col-3">
            <h5>Test 1</h5>

            <input
              placeholder="Type here"
              onChange={e => onSearchFieldChange(e, db_test1, setHints)}
              maxLength={8}
              className="form-control"
            />
            <Trail
              items={hints}
              from={{ y: 20, opacity: 0 }}
              to={{ y: 0, opacity: 1 }}>
              {item => props => (
                <animated.div key={item} className="hint" style={props}>
                  <span>{item}</span>
                </animated.div>
              )}
            </Trail>
          </div>

          {/*
              TEST 2
          */}
          <div className="col-3">
            <h5>Test 2</h5>

            <input
              placeholder="Type here"
              onChange={e => onSearchFieldChange(e, db_test2, setHints2)}
              maxLength={8}
              className="form-control"
            />
            <Trail
              items={hints2}
              from={{ y: 20, opacity: 0 }}
              to={{ y: 0, opacity: 1 }}>
              {item => props => (
                <animated.div key={item} className="hint" style={props}>
                  <span>{item}</span>
                </animated.div>
              )}
            </Trail>
          </div>
        </div>
      </div>
    </div>
  )
}
