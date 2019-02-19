import React from 'react'
import UserList from './userList'
import UsersAction from '../../actions/users'
// import Header from '../messages/header'
// import {APIEndpoints} from '../../constants/app'
// import request from 'superagent'

class Search extends React.Component {
    constructor(props) {
      super(props)
      this.state = this.initialState
    }

    get initialState() {
      return {
        name: '',
      }
    }
    handleChange(e) {
      const name = e.target.value
      this.setState({
        name,
      })
      UsersAction.getSearchUsers(name)
    }

    componentDidMount() {
      UsersAction.getUsers()
    }

    render() {
      const {name} = this.state
      return (
        <div className='search'>
          <h2 className='logo'>
            <span className='logo-c'>C</span>
            <span className='logo-h'>h</span>
            <span className='logo-a'>a</span>
            <span className='logo-t'>t</span>
            <span className='logo-A'>A</span>
            <span className='logo-p'>p</span>
            <span className='logo-p2'>p</span>
          </h2>
            <input type='text'
                   className='search_form'
                   value={name}
                   onChange={this.handleChange.bind(this)}
                   placeholder='ユーザ名で検索しよう'
            />
           <UserList {...this.state} />
        </div>
     )
    }
  }
export default Search
