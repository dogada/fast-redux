/* global describe, expect, it */

import { namespaceConfig } from '../src'

const INITIAL = { todos: [] }

describe('namespaceConfig', () => {

  it('returns action function bound to namespace', () => {
    const DEFAULT_STATE = 0
    const { action } = namespaceConfig('my', DEFAULT_STATE)
    expect(typeof action).toBe('function')

    let addReducer = (state = DEFAULT_STATE, x) => state + x
    let add = action('addReducer', addReducer)
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
