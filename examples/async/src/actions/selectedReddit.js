import {namespaceConfig} from 'fast-redux'
import * as reducers from '../reducers/selectedReddit'

const { actionCreator, getState } = namespaceConfig('selectedReddit', reducers.DEFAULT_STATE)
export {getState as getSelectedReddit}

export const selectReddit = actionCreator(reducers.selectReddit)
