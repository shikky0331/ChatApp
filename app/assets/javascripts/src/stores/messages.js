import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class MessageStore extends BaseStore {
    getUserMessages() {
      if (!this.get('userMessages')) this.setUserMessages([])
      return this.get('userMessages')
    }

    setUserMessages(array) {
      this.set('userMessages', array)
    }

    getToUserId() {
      if (!this.get('toUserId')) this.setUserMessages([])
      return this.get('toUserId')
    }

    setToUserId(array) {
      this.set('toUserId', array)
    }
  }

const MessagesStore = new MessageStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SAVE_MESSAGE:
      const messages = MessagesStore.getUserMessages()
      messages.push(
        action.messages
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setUserMessages(action.json.messages)
      MessagesStore.setToUserId(action.json.to_user_id)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
