import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from '../stores/user' // 追記
import {ActionTypes} from '../constants/app'

const messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'Hey!',
        from: 2,
        timestamp: 1424469793023,
      },
      {
        contents: 'Hey, what\'s up?',
        from: 1,
        timestamp: 1424469794000,
      },
    ],
  },
  3: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 3,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from: 3,
        timestamp: 1424352522000,
      },
    ],
  },
  4: {
    user: {
      name: 'Todd Motto',
      id: 4,
      profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000,
    },
    messages: [
      {
        contents: 'Please follow me on twitter I\'ll pay you',
        timestamp: 1424423579000,
        from: 4,
      },
    ],
  },
}
// 本当はserverからデータ引っ張る

let openChatID = parseInt(Object.keys(messages)[0], 10)
// 2,3,4,の数字がopenChatIDに入る

class ChatStore extends BaseStore {
  // EventEmitterを継承している
  addChangeListener(callback) {
    this.on('change', callback)
  }// changeしたら callbackに代入された処理が行われる
  removeChangeListener(callback) {
    this.off('change', callback)
  }// changeしたらcallbackに代入された処理が取り消される
  getOpenChatUserID() {
    return openChatID // 2,3,4の数字が入る
  }
  getChatByUserID(id) {
    return messages[id]
  }// UserのIDを指定してメッセージデータを返す
  getAllChats() {
    return messages // チャットの全ての情報をとる
  }
}

const MessagesStore = new ChatStore()
// 上のChatStoreのメソッドを継承
MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action    // 登録する
//  actionから渡ってきたデータを受信するたびに
  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      openChatID = action.userID
      messages[openChatID].lastAccess.currentUser = +new Date() // lastAccessを更新
      MessagesStore.emitChange() // イベントを発火させる
      break

    case ActionTypes.SEND_MESSAGE:// actionにはtype uerID timestampが入ってくる
      const userID = action.userID
      messages[userID].messages.push({
        contents: action.message,
        timestamp: action.timestamp,
        from: UserStore.user.id,
      })// メッセージを送った相手を検索して、送信先となるユーザのメッセージ配列に新規メッセージを追加
      messages[openChatID].lastAccess.currentUser = +new Date() // lastAccessを更新
      MessagesStore.emitChange()
      break
  }
  return true
})
// storeからのコールバックを登録
export default MessagesStore
