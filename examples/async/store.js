import {namespaceConfig} from 'fast-redux'

const {actionCreator, getState: getRedditState} = namespaceConfig('reddit', {
  selected  
})

export const DEFAULT_STATE = 'reactjs'

export function selectReddit (state, reddit) {
  return reddit
}