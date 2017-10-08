import { namespaceConfig } from 'fast-redux'
import * as reducers from '../reducers/postsByReddit'

const { actionCreator, getState: getPostsByReddit } = namespaceConfig('postsByReddit', reducers.DEFAULT_STATE)
export { getPostsByReddit }

export const invalidateReddit = actionCreator(reducers.invalidateReddit)

export const requestPosts = actionCreator(reducers.requestPosts)

export const receivePosts = actionCreator(reducers.receivePosts)

export const fetchPosts = (reddit) => (dispatch) => {
  dispatch(requestPosts(reddit))
  window.fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (posts) => {
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeed = (reddit) => (dispatch, getState) => {
  const state = getPostsByReddit(getState())
  if (shouldFetchPosts(state[reddit])) {
    return dispatch(fetchPosts(reddit))
  }
}
