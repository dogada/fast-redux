import {namespaceConfig} from 'fast-redux'

const DEFAULT_STATE = 'reactjs'
export const {
  action,
  getState: getSelectedReddit
} = namespaceConfig('selectedReddit', DEFAULT_STATE)

export const selectReddit = action('selectReddit',
  (state, reddit) => reddit
)
