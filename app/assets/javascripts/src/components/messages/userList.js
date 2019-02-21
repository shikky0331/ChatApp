// userList.js
import React from 'react'
import _ from 'lodash'
// import classNames from 'classnames'
// import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
// import UsersAction from '../../actions/users'
// import UsersAction from '../../actions/users'
import {APIEndpoints} from '../../constants/app'
import request from 'superagent'
// import MessagesBox from './messagesBox'

class UserList extends React.Component {
// 最後のメッセージをとる
// user
  constructor(props) {
    super(props)
    // MessagesAction.getMessages()
    // UsersAction.getUsers()
    this.state = this.initialState
  }

  get initialState() {
  // 変更箇所、開始位置
    return this.getStateFromStore()
  }

  // getMessages() {
  //   request
  //    .get(APIEndpoints.MESSAGES) // getリクエストがapi/messagesに送
  //    .end((error, res) => {
  //      if (!error && res.status === 200) {
  //        const json = JSON.parse(res.text)
  //        this.setState({
  //          messages: json.messages,
  //        })
  //      } else {
  //        console.log(error)
  //      }
  //    })
  // }

    // const allMessages = MessagesStore.getMessages()
    // console.log(allMessages)
    // getMessagesはメッセージをapiから取得
// どうやって messageの全ての情報をとるか。必要？最後のメッセージだけ取れればいい。userの最後のメッセージ
    // const messageList = []
    // _.each(allMessages, (message) => {
    //   const messagesLength = message.messages.length
    //   messageList.push({
    //     lastMessage: message.messages[messagesLength - 1],
    //     lastAccess: message.lastAccess,
    //     user: message.user,
    //   })
    // })
    getStateFromStore() {
    // const allMessages = MessagesStore.getMessages()
    // const allUsers = UsersStore.getUsers()
    //
    // const allMessagesUsers = allMessages
    // const messageList = []
    //
    // _.each(allMessages, (message) => {
    //   const messagesLength = message.length
    //   messageList.push({
    //     lastMessage: message[messagesLength - 1],
    //     // lastAccess: message.lastAccess,
    //     // user:
    //   })
    // })
      const allUsers = UsersStore.getUsers()
      const userList = []
      _.each(allUsers, (user) => {
        userList.push({
          user: user,
        })
      })

      return {
      // openChatID: messagesStore.getOpenChatUserID(),
        openChatID: MessagesStore.getOpenChatID,
      // messageList: messageList,
        userList: userList,
      }
    }
    // return {
    //   openChatID: 1,
    //   messageList: [],
    // }
  // }
  // componentDidMount() {
  //   // this.getMessages()
  //   // UsersAction.getUsers()
  // }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(user_id, to_user_id) {
    MessagesAction.changeOpenChat(user_id, to_user_id)
  }

  deleteButton(id) {
    request
      .del(`${APIEndpoints.FRIENDSHIPS}/${id}`) // 422error
      // .del(APIEndpoints.FRIENDSHIPS / `${id}`) // error
      .end((err, res) => {
        if (res) {
          console.log(res.body)
        } else {
          console.log(err.body)
        }
      })
    window.location.href = '/'
  }

  render() {
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })
    // console.log(this.state.messageList)
    if (!this.state.userList) {
      return (
        <div></div>
      )
    }
    console.log(this.state.userList)
    console.log(this.state.userList[0])

    const users = this.state.userList.map((user) => {
      // const date = Utils.getNiceDate(message.lastMessage.timestamp)
      // var statusIcon
      // if (message.lastMessage.user_id !== user.id) {
      //   statusIcon = (
      //     <i className='fa fa-reply user-list__item__icon' />
      //   )
      // }
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   statusIcon = (
      //     <i className='fa fa-circle user-list__item__icon' />
      //   )
      // }

      // var isNewMessage = false
      // if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
      //   isNewMessage = message.lastMessage.from !== UsersStore.user.id
      // }

      // const itemClasses = classNames({
      //   'user-list__item': true,
      //   'clear': true,
      //   // 'user-list__item--new': isNewMessage,
      //   'user-list__item--active': this.state.openChatID === message.user_id,
      // })

      // return (
      //   <li onClick={this.changeOpenChat.bind(this, message.user_id) }
      //     className={ itemClasses }
      //     key={ message.user_id }
      //   >
      return (
        // <li onClick={this.changeOpenChat.bind(this, message.user_id) }
        //   key={ message.user_id }
        // >
        // <li
        //    onClick={ this.changeOpenChat.bind(this, user.user.id) }
        //    className={ itemClasses }
        //    key={ user.user.id }
        //  >
        <li key={user.user.id}>
          <div className='user-list-list'>
            <div className='user-list__item__icon'>
              { `${user.user.image}.jpg === 'default_image'` ? <img className='icon' src = 'user_images/default_image.jpg' />  : <img src = {`/user_images/${user.user.id}.jpg`}/> }
            </div>
            <div
            className='user-list__item__name'
            onClick={this.changeOpenChat.bind(this, user.user.id, user.user.id) }
            >
              { user.user.name }
            </div>
            <div
            className='delete_button'
            onClick={ this.deleteButton.bind(this, user.user.id)}
            >
              ×
            </div>
          </div>
        </li>
      )
    }, this)

    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { users }
        </ul>
      </div>
    )
  }
}

export default UserList
