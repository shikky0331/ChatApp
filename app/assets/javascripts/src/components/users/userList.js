import React from 'react'
import _ from 'lodash'
import UsersStore from '../../stores/user'
import {APIEndpoints, CSRFToken} from '../../constants/app'
import request from 'superagent'

export default class UserList extends React.Component {
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

  friendshipButton(users) {
    request
    .post(APIEndpoints.FRIENDSHIPS)
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
                      { `${users.image}` === "default_image" ? <img className='icon' src = { '/user_images/default_image.jpg' } />  : <img className='icon' src = {`/user_images/${users.id}.jpg`}/> }
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
