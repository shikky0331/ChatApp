import React from 'react'
// import Header from './header'
import UserList from './userList'
import MessagesBox from './messagesBox'
// import Search from '../users/search'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default App
