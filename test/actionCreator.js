/* global describe, expect, it, beforeEach */

import { namespaceConfig } from '../src'

describe('actionCreator', () => {
  const DEFAULT_STATE = 0
  const { actionCreator } = namespaceConfig('my', DEFAULT_STATE)
  const addReducer = (state = DEFAULT_STATE, x) => state + x

  it('accepts reducer and returns function to create actions', () => {
    expect(typeof actionCreator).toBe('function')

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

  it('creates actions with shape {ns, reducer, type, payload}', () => {
    let add = actionCreator(addReducer)
    let addAction = add(2)

    expect(addAction).toEqual({
      ns: 'my',
      reducer: addReducer,
      type: '@@fast-redux/my/addReducer',
      payload: [2]
    })
  })

})

