import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'

import App from './containers/App'
import * as actionCreators from './actions'
import * as changes from './changes'
import { createReducer } from 'edux'

const middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const preloadedState = {selectedReddit: 'javascript'}
let enhancer = applyMiddleware(...middleware)
const devTools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (devTools) enhancer = devTools({actionCreators})(enhancer)

/* eslint-disable */
const futureDispatch = (action) => store.dispatch(action)
const futureGetState = () => store.getState()
/* eslint-disable */

const reducer = createReducer(changes, futureDispatch, futureGetState)
const store = createStore(reducer, preloadedState, enhancer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
