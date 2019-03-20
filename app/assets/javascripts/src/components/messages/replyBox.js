import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      file: '',
      to_user_id: '',
    }
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.saveMessage(e.target.value, this.state.to_user_id)
      this.setState({
        value: ' ',
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.files[0],
      to_user_id: this.state.to_user_id,
    })
    MessagesAction.saveImage(e.target.files[0], this.state.to_user_id)
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState({
      // message送信時にto_user_idをDBに保存。
      to_user_id: MessagesStore.getToUserId(),
    })
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
        Press
        <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type='file'
          onChange={this.onChangeFile.bind(this)}
        />
      </div>
    )
  }
}

export default ReplyBox
