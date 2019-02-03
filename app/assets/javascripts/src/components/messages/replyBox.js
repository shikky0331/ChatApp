import React from 'react'
import MessagesStore from '../../stores/messages'  // 追記
import MessagesAction from '../../actions/messages' // 追記

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  } //  valueの値は空
  get initialState() {
    return {
      value: ' ',
    }
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)// sendMessageアクションを呼ぶ
      this.setState({
        value: ' ',
      })// 文字をリセットする
    }
  }
    updateValue(e) {
      this.setState({
        value: e.target.value,
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
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
