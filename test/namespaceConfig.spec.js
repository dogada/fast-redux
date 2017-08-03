/* global describe, expect, it, beforeEach */

import { bindActionCreators, createStore } from 'redux'
import { namespaceConfig, rootReducer } from '../src'

const INITIAL = { todos: [] }

describe('namespaceConfig', () => {

  it('returns namespace id NS passed as argument', () => {
    const { NS } = namespaceConfig('my', INITIAL)
    expect(NS).toBe('my')
  })

  it('returns DEFAULT_STATE passed as argument', () => {
    const { DEFAULT_STATE } = namespaceConfig('my', INITIAL)
    expect(DEFAULT_STATE).toBe(INITIAL)
  })

  it('returns actionCreator function bound to namespace', () => {
    const DEFAULT_STATE = 0
    const { actionCreator } = namespaceConfig('my', DEFAULT_STATE)
    expect(typeof actionCreator).toBe('function')

    let addReducer = (state = DEFAULT_STATE, x) => state + x
    let add = actionCreator(addReducer)
    expect(typeof add).toBe('function')
    let addAction = add(2)

    expect(addAction).toEqual({
      ns: 'my',
      reducer: addReducer,
      type: '@@fast-redux/my/addReducer',
      payload: [2]
    })
  })
})

