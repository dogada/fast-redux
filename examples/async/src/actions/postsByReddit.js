import { namespaceConfig } from 'fast-redux'
import { nestedConfig } from 'fast-redux/nested'
import * as reducers from '../reducers/postsByReddit'
import * as redditReducers from '../reducers/reddit'

const { action, getState } = namespaceConfig(
  'postsByReddit', reducers.DEFAULT_STATE)
const { nestedAction, getNestedState: getRedditState } = nestedConfig(
  action, getState, redditReducers.DEFAULT_STATE)
export { getRedditState }

export const invalidateReddit = nestedAction(redditReducers.invalidateReddit)

export const requestPosts = nestedAction(redditReducers.requestPosts)

export const receivePosts = nestedAction(redditReducers.receivePosts)

export const fetchPosts = (reddit) => (dispatch) => {
  dispatch(requestPosts(reddit))
  window.fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (posts) => {
  if (!posts.items || posts.items.length === 0) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeed = (reddit) => (dispatch, getState) => {
  const state = getRedditState(getState(), reddit)
  if (shouldFetchPosts(state)) {
    return dispatch(fetchPosts(reddit))
  }
}
