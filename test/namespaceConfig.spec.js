/* global describe, expect, it */

import { namespaceConfig } from '../src'

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
    const { action } = namespaceConfig('my', DEFAULT_STATE)
    expect(typeof action).toBe('function')

    let addReducer = (state = DEFAULT_STATE, x) => state + x
    let add = action(addReducer)
    expect(typeof add).toBe('function')
    let addAction = add(2)

    expect(addAction).toEqual({
      ns: 'my',
      reducer: addReducer,
      type: 'my/addReducer',
      payload: [2],
      defaultState: 0
    })

    expect(Object.keys(addAction)).toEqual([
      'ns',
      'reducer',
      'type',
      'payload',
      'defaultState'
    ])
  })
})

