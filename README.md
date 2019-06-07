# Installation

    npm install
    npm start

Demos will be live at http://localhost:8080

# Contributors

1. clone react-spring and react-spring-examples under the same root folder

```
/root
  /react-spring
  /react-spring-examples
```

2. yarn/npm install both
3. cd react-spring-examples
4. edit index.js

```
import examples from './components/examples-tests'

//const DEBUG = false
const DEBUG = 'latestbug'
```

5. go to /demos/tests/latestbug and set up a demo that reproduces the problem
6. npm start, you can now make hot-reload edits in both repos (react-spring and react-spring-examples)
7. you can test integrity by running all examples, edit index.js again:

```
import examples from './components/examples-hooks'

const DEBUG = false
//const DEBUG = 'latestbug'
```
