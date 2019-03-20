import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('userInfo')) this.setUsers([])
    return this.get('userInfo')
  }

  setUsers(array) {
    this.set('userInfo', array)
  }

  getCurrentUser() {
    if (!this.get('current_userInfo')) this.setCurrentUser([])
    return this.get('current_userInfo')
  }

  setCurrentUser(array) {
    this.set('current_userInfo', array)
  }
  //
  // getUserId() {
  //   if (!this.get('userId')) this.setMessages([])
  //   return this.get('userId')
  // }
  //
  // setUserId(array) {
  //   this.set('userId', array)
  // }
}

const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_USERS:
      UsersStore.setUsers(action.json.users)
      // UsersStore.setUserId(action.json.users.id)
      UsersStore.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      UsersStore.setCurrentUser(action.json.users)
      UsersStore.emitChange()
      break

    case ActionTypes.SEARCH_USERS:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.SAVE_FRIEND:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break
  }
  return true
})

export default UsersStore
