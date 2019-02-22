import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class MessageStore extends BaseStore {
    getMessages() {
      if (!this.get('userMessages')) this.setMessages([])
      return this.get('userMessages')
    }
    setMessages(array) {
      this.set('userMessages', array)
    }

    getToUserId() {
      if (!this.get('toUserId')) this.setMessages([])
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
    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json.messages)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      const messages = MessagesStore.getMessages()
      messages.push(
        action.messages
      )
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setMessages(action.json.messages)
      MessagesStore.setToUserId(action.json.to_user_id)
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
