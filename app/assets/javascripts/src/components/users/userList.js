import React from 'react'
import _ from 'lodash'
import UsersStore from '../../stores/user'
// import Utils from '../../utils'
import {APIEndpoints, CSRFToken} from '../../constants/app'
import request from 'superagent'

export default class UserList extends React.Component {
  static get propTypes() {
    return {
      name: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      users: UsersStore.getUsers(),

    }
  }

  componentDidMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  // friendship() {
  //   request
  //   .post(APIEndpoints.FRIENDSHIPS)// postリクエストがapi/messagesに送
  //   .set('X-CSRF-Token', CSRFToken())
  //   .send({
  //
  //   })
  // }

  friendshipButton(users) {
    // FriendshipsAction.saveFriendship(users.id)

    // saveFriendship(from_user_id){
    request
      .post(APIEndpoints.FRIENDSHIPS)// postリクエストがapi/messagesに送
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: users.id,
      })
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
    const {users} = this.state
    const {name} = this.props

    let allUsers = users
    const searchUser = name.trim().toLowerCase()

    if (searchUser.lenght > 0) {
      allUsers = _.filter(allUsers, (users) => {
        return users.users.name.toLowerCase().match(searchUser)
      })
    }
    return (
      <ul className='search_list'>
        {
          _.map(allUsers, (users) => {
            return (
                <li className='search_list_item'>
                  <form >
                    <div
                     className='search_result'
                     onClick={ this.friendshipButton.bind(this, users) }
                     >
                      {users.name}
                    </div>
                  </form>
                </li>
            )
          })
        }
      </ul>
    )
  }
}
// <form action='/' method='get'>
// <input type='submit' value={users.name} />
