# fast-redux - O(1) speed and dynamic importing of actions/reducers

Fully compatible with Redux but works with O(1) speed when Redux itself works with O(N) speed (N is number of reducers). You can use standard Redux devtools with fast-redux actions.

When you dispatch an action, Redux invokes all reducers and passes the state and the action to each reducer.
Usually it's not a problem but in complex applications when you have hundreds of reducers and will dispatch an action for every `onChange` of an input field in a form, 
you may observe performance issues. fast-redux solves this problem by using actions bound directly to reducers. Using this approach, for every action is executed exactly 
one reducer and you don't need to use constants for action types to match actions with reducers. You may see such fast-redux actions using well-known Redux DevTools and use
its time traveling capabilities. [More about performance issues](https://github.com/dogada/fast-redux/issues/1#issuecomment-320465448) that fast-redux aims to solve.

Plays well with code splitting. You can dynamically import actions/reducers to the store during lifetime of the applications.

Don't repeat yourself. Constants for action types aren't need (say goodbye to `switch` statements as well).


### Installation

To install the stable version:

```
npm install --save fast-redux
```

The Redux source code is written in ES2015 but we precompile both CommonJS and UMD builds to ES5 so they work in [any modern browser](http://caniuse.com/#feat=es5).


You can use fast-redux together with [React](https://facebook.github.io/react/), or with any other view library.  
It is tiny (1kB, including dependencies).

fast-redux is simpler and IMO better version of [Edux](https://github.com/dogada/edux) (my first attempt to make Redux more developer friendly).

### Example
```
// reducers.js

export const DEFAULT_STATE = 'reactjs'

export function selectReddit (state, reddit) {
  return reddit
}


// actions.js

import { namespaceConfig } from 'fast-redux'
import * as reducers from '../reducers/selectedReddit'

const { action, getState: getSelectedReddit } = namespaceConfig(
  'selectedReddit', reducers.DEFAULT_STATE)

export { getSelectedReddit }
export const selectReddit = action(reducers.selectReddit)
```

Please look at `examples` directory for more complex use cases.

### License

MIT

