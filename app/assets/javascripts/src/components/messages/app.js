import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
// import _ from 'lodash'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      userList: UsersStore.getUsers(),
      // messageboxのcurrent classを付けるため　curretnUserId
      currentUser: UsersStore.getCurrentUser(),
      // active-listをつけるため
      openChatID: MessagesStore.getToUserId(),
      userMessageList: MessagesStore.getUserMessages(),
      // allMessageList: MessagesStore.getAllMessages(),
      // userLastMessage:
      // currentMessageList: MessagesStore.getCurrentMessages(),
    }
  }

  componentDidMount() {
    UsersAction.getUsers()
    UsersAction.getCurrentUser()
    UsersStore.onChange(this.onChangeHandler)
    MessagesStore.onChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    return (
        <div className='app'>
          <UserList {...this.state}/>
          <MessagesBox {...this.state}/>
        </div>
      )
  }
}

export default App
// const allMessages = MessagesStore.getMessages()
// const messageList = []
// _.each(allMessages, (message) => {
//   messageList.push({
//     message: message,
//   })
// })
