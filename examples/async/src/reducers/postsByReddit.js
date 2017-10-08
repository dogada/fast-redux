export const DEFAULT_STATE = {}

const defaultRedditState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

function updateReddit (state, id, data) {
  const reddit = state[id] || defaultRedditState
  return {
    ...state,
    [id]: { ...reddit, ...data }
  }
}

export function invalidateReddit (state, id) {
  return updateReddit(state, id, { didInvalidate: true })
}

export function requestPosts (state, id) {
  return updateReddit(state, id, {
    items: [],
    isFetching: true,
    didInvalidate: false
  })
}

export function receivePosts (state, id, json) {
  return updateReddit(state, id, {
    isFetching: false,
    didInvalidate: false,
    items: json.data.children.map(child => child.data),
    lastUpdated: Date.now()
  })
}
