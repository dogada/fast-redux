/* global describe, expect, it, beforeEach */

import { bindActionCreators, createStore } from 'redux'
import { namespaceConfig, rootReducer } from '../src'

const DEFAULT_STATE = []
const {action, getState: getTestState} = namespaceConfig('test', DEFAULT_STATE)

function nextId (state) {
  return Math.max(0, ...state.map(todo => todo.id)) + 1
}

const addTodo = action(function addTodo (state = DEFAULT_STATE, text) {
  return [...state, {id: nextId(state), text}]
})

function addTodoAsync (text) {
  return dispatch => setTimeout(() => {
    dispatch(addTodo(text))
  }, 1000)
}

const actionCreators = {addTodo, addTodoAsync}

function cloneOnlyFunctions (obj) {
  let clone = { ...obj }
  Object.keys(clone).forEach(key => {
    if (typeof clone[key] !== 'function') {
      delete clone[key]
    }
  })
  return clone
}

function initStore () {
  return createStore(rootReducer)
}

describe('bindActionCreators', () => {
  let store, actionCreatorFunctions

  beforeEach(() => {
    store = initStore()
    actionCreatorFunctions = cloneOnlyFunctions(actionCreators)
  })

  it('wraps the action creators with the dispatch function', () => {
    const boundActionCreators = bindActionCreators(actionCreators, store.dispatch)
    expect(
      Object.keys(boundActionCreators)
    ).toEqual(
      Object.keys(actionCreatorFunctions)
    )

    const action = boundActionCreators.addTodo('Hello')
    expect(action).toEqual(
      actionCreators.addTodo('Hello')
    )
    expect(getTestState(store.getState())).toEqual([
      { id: 1, text: 'Hello' }
    ])
  })

  it('skips non-function values in the passed object', () => {
    const boundActionCreators = bindActionCreators({
      ...actionCreators,
      foo: 42,
      bar: 'baz',
      wow: undefined,
      much: {},
      test: null
    }, store.dispatch)
    expect(
      Object.keys(boundActionCreators)
    ).toEqual(
      Object.keys(actionCreatorFunctions)
    )
  })

  it('supports wrapping a single function only', () => {
    const actionCreator = actionCreators.addTodo
    const boundActionCreator = bindActionCreators(actionCreator, store.dispatch)

    const action = boundActionCreator('Hello')
    expect(action).toEqual(actionCreator('Hello'))
    expect(getTestState(store.getState())).toEqual([
      { id: 1, text: 'Hello' }
    ])
  })
})
