import { createActions } from 'edux'

import * as changes from './changes'

export const {
  postsByReddit: { fetchPostsIfNeeded, invalidateReddit },
  selectedReddit: { selectReddit }
} = createActions(changes)

