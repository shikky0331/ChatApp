import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UsersStore from '../stores/user'
import {ActionTypes} from '../constants/app'
// import MessagesAction from '../actions/messages'
// import {APIEndpoints} from '../../constants/app'
// import request from 'superagent'
//
// const messagess = {
//   2: {
//     user: {
//       profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//       id: 2,
//       name: 'Ryan Clark',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424469794050,
//       currentUser: 1424469794080,
//     },
//     messages: [
//       {
//         contents: 'Hey!',
//         from: 2,
//         timestamp: 1424469793023,
//       },
//       {
//         contents: 'Hey, what\'s up?',
//         from: 1,
//         timestamp: 1424469794000,
//       },
//     ],
//   },
//   3: {
//     user: {
//       read: true,
//       profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//       name: 'Jilles Soeters',
//       id: 3,
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424352522000,
//       currentUser: 1424352522080,
//     },
//     messages: [
//       {
//         contents: 'Want a game of ping pong?',
//         from: 3,
//         timestamp: 1424352522000,
//       },
//     ],
//   },
//   4: {
//     user: {
//       name: 'Todd Motto',
//       id: 4,
//       profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424423579000,
//       currentUser: 1424423574000,
//     },
//     messages: [
//       {
//         contents: 'Please follow me on twitter I\'ll pay you',
//         timestamp: 1424423579000,
//         from: 4,
//       },
//     ],
//   },
// }
// // 本当はserverからデータ引っ張る
//
// let openChatID = parseInt(Object.keys(messages)[0], 10)
// // 2,3,4,の数字がopenChatIDに入る
//
// class ChatStore extends BaseStore {
//   // EventEmitterを継承している
//   addChangeListener(callback) {
//     this.on('change', callback)
//   }// changeしたら callbackに代入された処理が行われる
//   removeChangeListener(callback) {
//     this.off('change', callback)
//   }// changeしたらcallbackに代入された処理が取り消される
//   getOpenChatUserID() {
//     return openChatID // 2,3,4の数字が入る
//   }
//   getChatByUserID(id) {
//     return messages[id]
//   }// UserのIDを指定してメッセージデータを返す
//   getAllChats() {
//     return messages // チャットの全ての情報をとる
//   }
// }
//

  // getOpenChatUserID() {
  //   return openChatID
  // }
  // getAllMessages() {
  //   request
  //   .get(APIEndpoints.MESSAGES) // getリクエストがapi/messagesに送
  //   .end((error, res) => {
  //     if (!error && res.status === 200) {
  //       const json = JSON.parse(res.text)
  //       return (
  //         messages: json.messages
  //       )
  //     } else {
  //       console.log(error)
  //     }
  //   })
  // }

  // /   // EventEmitterを継承している
    // addChangeListener(callback) {
    //   this.on('change', callback)
    // }// changeしたら callbackに代入された処理が行われる
    // removeChangeListener(callback) {
    //   this.off('change', callback)
    // }
    // changeしたらcallbackに代入された処理が取り消される
    // getChatByUserID(id) {
    //   return messages[id]
    // }// UserのIDを指定してメッセージデータを返す
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
    // getOpenChatUserID(id) {
    //   MessagesAction.getUsers(openChatID)
    // }
    // getChatByUserID(id) {
    //   return messages[id]
    //  }
    getOpenChatID() {

    }
}
const MessagesStore = new MessageStore()
// const messages = MessagesStore.getMessages()
// let openChatID = parseInt(Object.keys(messages)[0], 10)
// let openChatID = parseInt(Object.keys(UserStore.getUsers())[0], 10)
// let friendsUsers = UsersStore.getUsers()
// console.log(friendsUsers)
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
    //
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setMessages(action.json.messages)
      MessagesStore.setToUserId(action.json.to_user_id)
      // MessagesStore.setMessagesId(action.json.messages)
       // クリックした人のIDをopenChatIDに上書き。ストアで値が更新され、変更されたことをviewに通知
      // messages[openChatID].lastAccess.currentUser = +new Date() // lastAccessを更新。既読つく
      MessagesStore.emitChange() // イベントを発火させる
      break
  }
  return true
})
// const MessagesStore = new ChatStore()
// 上のChatStoreのメソッドを継承

// MessagesStore.dispatchToken = Dispatcher.register(payload => {
//   const action = payload.action    // 登録する
// //  actionから渡ってきたデータを受信するたびに
//   switch (action.type) {
//     case ActionTypes.UPDATE_OPEN_CHAT_ID:
//       openChatID = action.userID // クリックした人のIDをopenChatIDに上書き。ストアで値が更新され、変更されたことをviewに通知
//       messages[openChatID].lastAccess.currentUser = +new Date() // lastAccessを更新。既読つく
//       MessagesStore.emitChange() // イベントを発火させる
//       break
//
//     case ActionTypes.SEND_MESSAGE:// 送信時にactionにはtype uerID timestamp messageが入ってくる
//       const userID = action.userID
//       messages[userID].messages.push({// messagesにはconstで定義されてるmessagesオブジェクトが入る
//         contents: action.message,
//         timestamp: action.timestamp,
//         from: UserStore.user.id,
//       })// メッセージを送った相手を検索して、送信先となるユーザのメッセージ配列に新規メッセージを追加
//       messages[openChatID].lastAccess.currentUser = +new Date() // lastAccessを更新。返信マークつく
//       MessagesStore.emitChange()
//       break
//   }
//   return true
// })
// // storeからのコールバックを登録
// export default MessagesStore
export default MessagesStore
