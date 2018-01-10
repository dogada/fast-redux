/* global describe, expect, it */

import { namespaceConfig } from '../src'

describe('action', () => {
  const DEFAULT_STATE = 0
  const { action } = namespaceConfig('my', DEFAULT_STATE)
  const addReducer = (state = DEFAULT_STATE, x) => state + x

  it('accepts reducer and returns function to create actions', () => {
    expect(typeof action).toBe('function')

    let add = action(addReducer)
    expect(typeof add).toBe('function')
    let addAction = add(2)

    expect(addAction).toEqual({
      ns: 'my',
      reducer: addReducer,
      type: '@@fast-redux/my/addReducer',
      payload: [2]
    })
  })

  it('creates actions with shape {ns, reducer, type, payload}', () => {
    let add = action(addReducer)
    let addAction = add(2)

    expect(addAction).toEqual({
      ns: 'my',
      reducer: addReducer,
      type: '@@fast-redux/my/addReducer',
      payload: [2]
    })
  })
})
