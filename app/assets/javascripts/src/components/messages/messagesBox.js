import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
// import UsersStore from '../../stores/user'
// import Utils from '../../utils'
import _ from 'lodash'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import {APIEndpoints} from '../../constants/app'
import request from 'superagent'
// import UserList from './userList'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
  // 変更箇所、開始位置
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const allMessages = MessagesStore.getMessages()
    const messageList = []
    _.each(allMessages, (message) => {
      messageList.push({
        message: message,
      })
    })
    return {
      messageList: messageList,
      current_user: [],
    }
  }
    // MessageAction.getMessages()
    // this.state = this.initialState
    // this.state = {
    //   // messages: [],
    //   messages: [],
    //   // 開いてるchatのmessageのみ表示
    //   current_users: [],
    //   // messages: MessagesAction.getMessages(),
    // }
    // this.onChangeHandler = this.onStoreChange.bind(this)
  getMessages() {
    request
    .get(APIEndpoints.MESSAGES) // getリクエストがapi/messagesに送
    .end((error, res) => {
      if (!error && res.status === 200) {
        const json = JSON.parse(res.text)
        this.setState({
          messages: json.messages,
        })
      } else {
        console.log(error)
      }
    })
  }

  getUsers() {
    request
    .get(APIEndpoints.CURRENT_USER) // getリクエストがapi/messagesに送
    .end((error, res) => {
      if (!error && res.status === 200) {
        const json = JSON.parse(res.text)
        this.setState({
          users: json.users,
        })
      } else {
        console.log(error)
      }
    })
  }
  // }
  componentDidMount() {
    // this.getMessages()
    this.getUsers()
    UsersAction.getUsers()
    MessagesAction.getMessages()
    MessagesStore.onChange(this.onChangeHandler)
  }
  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onChangeHandler)
  // }
  // onStoreChange() {
  //   this.setState(this.getStateFromStore())
  // }// 新しいメッセージ情報に書き換える!!!!!!!!!!
  onStoreChange() {
    this.setState({
      messageList: MessagesStore.getMessages(),
    })
  }

  render() {
    // if (!this.state.messages || !this.state.users) {
    //   return (
    //     <div>表示します</div>
    //   )
    // }

    // const currentUserID = this.state.users.id
    const currentUserID = this.state.users

// 開いてるchatのmessageのみ取ってくる
    const messages = this.state.messageList.map((messages, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': messages.user_id === currentUserID.id,
        'clear': true,
      })
      return (
          <li key={ messages.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
            { (messages.image === null) ? messages.content : <img src = {`/message_images/${messages.id}.jpg`}/> }
            </div>
          </li>
        )
    })

    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />
        </div>
      )
    // 送っているメッセージの人とuserのidが同じだとクラスがつ
  }
} //  メッセージと送信ボックスを描画
export default MessagesBox
  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  // } //  メッセージの情報
  // get initialState() {
  //   return this.getStateFromStore()
  // }

  // getStateFromStore() {
  //   // const allMessages = MessagesStore.getMessages()
  //   return {
  //     message: [],
    // }
       // messages: MessagesStore.getMessages() = messages: message: [0: {}], [1: {}] arrayでjsonを囲む必要あり
     // messages: [0: {cnotent, id, from ....
  // }

  // getStateFromStore() {
  //   return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
  // }// UserIdを引数にとって、その人のメッセージ情報とる
  // componentWillMount() {
  //   // MessagesStore.onChange(this.onStoreChange.bind(this))
  //   this.getMessages()
    // const messagesLength = this.state.messages.length //  2 {[contents from timestamp] 配列が二つ }// this.state.messages = messages:[messageの情報]
    // const currentUserID = UsersStore.getUsers()
    // userstoreのuser.id this.state.users.idだと全員のid取ってくるからcurrent_userを引っ張れるapiを作らないと

    //   console.log(messageClasses)
    //   return (
    //       <li key={ message.timestamp + '-' + message.user_id } className={ messageClasses }>
    //         <div className='message-box__item__contents'>
    //           { message.content }
    //         </div>
    //       </li>
    //     )
    // })

    // const lastMessage = messages[messagesLength - 1]
    //
    // // if (lastMessage.from === currentUserID) {
    // if (lastMessage.user_id === currentUserID) {
    //   // if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //   if (1 >= 2) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
