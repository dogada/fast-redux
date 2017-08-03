/* global describe, expect, it */

import { createStore, combineReducers } from 'redux'
import { rootReducer } from '../src'

describe('combineReducers', () => {
  it('should allow to use together fast-redux root reducer and Redux reducers', () => {
    const counter = (state = 0, action) => state
    const reducer = combineReducers({testNs: rootReducer, counter})
    const store = createStore(reducer)

    expect(store.getState()).toEqual({
      counter: 0,
      testNs: {}
    })

    const preloadedStore = createStore(reducer, {
      counter: 42,
      testNs: {name: 'value'}
    })

    expect(preloadedStore.getState()).toEqual({
      counter: 42,
      testNs: {name: 'value'}
    })
  })
})
