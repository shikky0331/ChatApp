import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UsersStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import {APIEndpoints} from '../../constants/app'
import request from 'superagent'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const allUsers = UsersStore.getUsers()
    const userList = []

    _.each(allUsers, (user) => {
      userList.push({
        user: user,
      })
    })

    return {
      // クリックしたユーザのIDを入れる
      openChatID: MessagesStore.getToUserId(),
      userList: userList,
    }
  }

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

  deleteButton(id) { // 友達関係を削除
    if(window.confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      request
      .del(`${APIEndpoints.FRIENDSHIPS}/${id}`)
      .end((err, res) => {
        if (res) {
          console.log(res.body)
        } else {
          console.log(err.body)
        }
      })
      window.location.href = '/'
	}
}

  render() {
    const users = this.state.userList.map((user) => {
    const itemClasses = classNames({
      'active-list': user.user.id === Number(this.state.openChatID)
    })
      return (
        <li className = { itemClasses } key={user.user.id}>
          <div className = 'user-list-list'>
            <div className = 'user-list__item__icon'>
              { `${user.user.image}` === "default_image" ? <img className='icon' src = { '/user_images/default_image.jpg' } />  : <img className='icon' src = {`/user_images/${user.user.id}.jpg`}/> }
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
