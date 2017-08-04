import {namespaceConfig} from 'fast-redux'

const DEFAULT_STATE = 'reactjs'

const { actionCreator, getState } = namespaceConfig('selectedReddit', DEFAULT_STATE)
export {getState as getSelectedReddit}

export const selectReddit = actionCreator(function selectReddit (state, reddit) {
  return reddit
})
