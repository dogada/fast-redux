import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from 'fast-redux'

import App from './containers/App'

const preloadedState = {selectedReddit: 'javascript'}
const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunkMiddleware)))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
