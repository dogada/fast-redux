import { namespaceConfig } from 'fast-redux'

const DEFAULT_STATE = {}

const { actionCreator, getState: getPostsByReddit } = namespaceConfig('postsByReddit', DEFAULT_STATE)
export { getPostsByReddit }

const defaultRedditState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

function updateReddit(state, id, data) {
  const reddit = state[id] || defaultRedditState
  return {
    ...state,
    [id]: { ...reddit, ...data }
  }
}

export const invalidateReddit = actionCreator(function invalidateReddit(state, id) {
  return updateReddit(state, id, { didInvalidate: true })
})

export const requestPosts = actionCreator(function requestPosts(state, id) {
  return updateReddit(state, id, {
    items: [],
    isFetching: true,
    didInvalidate: false
  })
})

export const receivePosts = actionCreator(function receivePosts(state, id, json) {
  return updateReddit(state, id, {
    isFetching: false,
    didInvalidate: false,
    items: json.data.children.map(child => child.data),
    lastUpdated: Date.now()
  })
})

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

