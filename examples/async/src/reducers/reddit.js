export const DEFAULT_STATE = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

export const invalidateReddit = (state) => ({
  ...state,
  didInvalidate: true
})

export const requestPosts = (state) => ({
  ...state,
  items: [],
  isFetching: true,
  didInvalidate: false
})

export const receivePosts = (state, json) => ({
  ...state,
  isFetching: false,
  didInvalidate: false,
  items: json.data.children.map(child => child.data),
  lastUpdated: Date.now()
})
