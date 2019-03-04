import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class MessageStore extends BaseStore {
    // getAllMessages() {
    //   if (!this.get('allMessages')) this.setAllMessages([])
    //   return this.get('allMessages')
    // }
    //
    // setAllMessages(array) {
    //   this.set('allMessages', array)
    // }

    getUserMessages() {
      if (!this.get('userMessages')) this.setUserMessages([])
      return this.get('userMessages')
    }

    setUserMessages(array) {
      this.set('userMessages', array)
    }

    // getCurrentMessages() {
    //   if (!this.get('currentUserMessages')) this.setCurrentMessages([])
    //   return this.get('currentUserMessages')
    // }
    //
    // setCurrentMessages(array) {
    //   this.set('currentUserMessages', array)
    // }

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
    // case ActionTypes.GET_MESSAGES:
    //   MessagesStore.setAllMessages(action.json.messages)
    //   // MessagesStore.setAllMessages(action.json)
    //   MessagesStore.emitChange()
    //   break

    // case ActionTypes.GET_CURRENT_MESSAGES:
    //   MessagesStore.setCurrentMessages(action.json.messages)
    //   MessagesStore.emitChange()
    //   break

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
      // Q.これでmessage/userListのonStoreChangeに飛ばしたい
      // A.message/userListのcomponentDidMountにMessagesStore.onChangeを追加
      MessagesStore.emitChange()
      break
  }
  return true
})

export default MessagesStore
