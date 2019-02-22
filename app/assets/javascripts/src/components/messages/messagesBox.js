import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import {APIEndpoints} from '../../constants/app'
import request from 'superagent'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
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
    }
  }

  getUsers() {
    request
    .get(APIEndpoints.CURRENT_USER)
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

  componentDidMount() {
    // this.getUsers()がないとユーザーをclickした際に、currentUserIDがnodefinedになってしまう。
    this.getUsers()
    UsersAction.getUsers()
    MessagesAction.getMessages()
    MessagesStore.onChange(this.onChangeHandler)
  }
  onStoreChange() {
    this.setState({
      messageList: MessagesStore.getMessages(),
    })
  }

  render() {
    const currentUserID = this.state.users

    const messages = this.state.messageList.map((messages, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': messages.user_id === currentUserID.id,
        'clear': true,
      })

      return (
          <li key={ messages.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
            { (messages.image === null) ? messages.content : <img className='image-message' src = {`/message_images/${messages.id}.jpg`}/> }
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
  }
}
export default MessagesBox
// getMessages() {
//   request
//   .get(APIEndpoints.MESSAGES)
//   .end((error, res) => {
//     if (!error && res.status === 200) {
//       const json = JSON.parse(res.text)
//       this.setState({
//         messages: json.messages,
//       })
//     } else {
//       console.log(error)
//     }
//   })
// }
// componentWillUnmount() {
//   MessagesStore.offChange(this.onChangeHandler)
// }
