import { namespaceConfig, objectConfig } from 'fast-redux'

const DEFAULT_STATE = {}
const {
  action,
  getState
} = namespaceConfig('postsByReddit', DEFAULT_STATE)

const DEFAULT_REDDIT_STATE = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

const {
  propertyAction: redditAction,
  getPropertyState: getRedditState
} = objectConfig(action, getState, DEFAULT_REDDIT_STATE)

export {getRedditState}

export const invalidateReddit = redditAction('invalidateReddit',
  (state) => ({
    ...state,
    didInvalidate: true
  })
)

export const requestPosts = redditAction('requestPosts',
  (state) => ({
    ...state,
    items: [],
    isFetching: true,
    didInvalidate: false
  })
)

export const receivePosts = redditAction('receivePosts',
  (state, json) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: json.data.children.map(child => child.data),
    lastUpdated: Date.now()
  })
)

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
