/* global describe, expect, it */

import { createStore } from 'redux'
import { rootReducer } from '../src'

function initStore (preloadedState) {
  const store = createStore(rootReducer, preloadedState)
  return store
}

describe('createStore', () => {
  it('should restore primitive state from initial value', () => {
    const state = {
      ns1: 1,
      ns2: 'name'
    }
    const store = initStore(state)
    expect(store.getState()).toEqual(state)
  })

  it('should restore state from initial value', () => {
    const state = {
      ns1: {id: 1, text: 'First'},
      ns2: {id: 2, text: 'Second'}
    }
    const store = initStore(state)
    expect(store.getState()).toEqual(state)
  })

  it('should restore 2-level state from initial value', () => {
    const state = {
      ns1: {data: [{id: 1, value: 'First'}]},
      ns2: {data: [{id: 2, value: 'Second'}]}
    }
    const store = initStore(state)
    expect(store.getState()).toEqual(state)
  })
})
