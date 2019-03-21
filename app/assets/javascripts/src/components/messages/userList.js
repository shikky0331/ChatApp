import React from 'react'
import classNames from 'classnames'
import MessagesAction from '../../actions/messages'
import {APIEndpoints} from '../../constants/app'
import request from 'superagent'

class UserList extends React.Component {
  static get propTypes() {
    return {
      userList: React.PropTypes.array,
      messageList: React.PropTypes.array,
      openChatID: React.PropTypes.function,
    }
  }

  constructor(props) {
    super(props)
  }

  changeOpenChat(user_id) {
    MessagesAction.changeOpenChat(user_id)
  }

  friendDelete(id) {
    if (window.confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      request
      .del(`${APIEndpoints.FRIENDSHIPS}/${id}`)
      .end((err, res) => {
        if (res) {
          console.log(res.body)
          window.location.href = '/'
        } else {
          console.log(err.body)
        }
      })
    }
  }

  render() {
    const users = this.props.userList.map((user) => {
      const itemClasses = classNames({
        'active-list': user.id === Number(this.props.openChatID),
      })

      return (
        <li className = { itemClasses } key={user.id}>
          <div className = 'user-list-list'>
            <div className = 'user-list__item__icon'>
              { `${user.image}` === 'default_image' ? <img className='icon' src = { '/user_images/default_image.jpg' } /> : <img className='icon' src = {`/user_images/${user.id}.jpg`}/> }
            </div>

            <div
            className='user-list__item__name'
            onClick={this.changeOpenChat.bind(this, user.id) }
            >
              { user.name }
            </div>

            <div
            className='delete_button'
            onClick={ this.friendDelete.bind(this, user.id)}
            >
              ×
            </div>
          </div>
        </li>
      )
    })

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
