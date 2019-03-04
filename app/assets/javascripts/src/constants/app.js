import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  // GET_MESSAGES: null,
  // GET_CURRENT_MESSAGES: null,
  SAVE_MESSAGE: null,
  GET_USERS: null,
  // GET_CURRENT_USER: null,
  SEARCH_USERS: null,
  SAVE_IMAGE: null,
  SAVE_FRIEND: null,
  UPDATE_OPEN_CHAT_ID: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  CURRENT_USER: APIRoot + '/current_users',
  FRIENDSHIPS: APIRoot + '/friendships',
}
// CURRENT_USERはUSERSに突っ込んでもよかったか？
