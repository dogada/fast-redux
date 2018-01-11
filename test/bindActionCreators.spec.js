/* global describe, expect, it, beforeEach */

import { bindActionCreators, createStore } from 'redux'
import { namespaceConfig, rootReducer } from '../src'

const DEFAULT_STATE = []
const {action, getState: getTestState} = namespaceConfig('test', DEFAULT_STATE)

function nextId (state) {
  return Math.max(0, ...state.map(todo => todo.id)) + 1
}

const addTodo = action('addTodo',
function (state = DEFAULT_STATE, text) {
  return [...state, {id: nextId(state), text}]
})

function addTodoAsync (text) {
  return dispatch => setTimeout(() => {
    dispatch(addTodo(text))
  }, 1000)
}

const actions = {addTodo, addTodoAsync}

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
  let store, actionFunctions

  beforeEach(() => {
    store = initStore()
    actionFunctions = cloneOnlyFunctions(actions)
  })

  it('wraps the action creators with the dispatch function', () => {
    const boundActionCreators = bindActionCreators(actions, store.dispatch)
    expect(
      Object.keys(boundActionCreators)
    ).toEqual(
      Object.keys(actionFunctions)
    )

    const action = boundActionCreators.addTodo('Hello')
    expect(action).toEqual(
      actions.addTodo('Hello')
    )
    expect(getTestState(store.getState())).toEqual([
      { id: 1, text: 'Hello' }
    ])
  })

  it('skips non-function values in the passed object', () => {
    const boundActionCreators = bindActionCreators({
      ...actions,
      foo: 42,
      bar: 'baz',
      wow: undefined,
      much: {},
      test: null
    }, store.dispatch)
    expect(
      Object.keys(boundActionCreators)
    ).toEqual(
      Object.keys(actionFunctions)
    )
  })

  it('supports wrapping a single function only', () => {
    const action = actions.addTodo
    const boundActionCreator = bindActionCreators(action, store.dispatch)

    const descriptor = boundActionCreator('Hello')
    expect(descriptor).toEqual(action('Hello'))
    expect(getTestState(store.getState())).toEqual([
      { id: 1, text: 'Hello' }
    ])
  })
})
