// import FileInput from 'react-file-input'
import React from 'react'
import MessagesStore from '../../stores/messages'  // 追記
import MessagesAction from '../../actions/messages' // 追記

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      file: '',
      to_user_id: '',
      // to_user_id: MessagesStore.getToUserId(),
    }
    this.onChangeHandler = this.onStoreChange.bind(this)
  } //  valueの値は空
  // get initialState() {
  //   return {
  //     value: ' ',
  //   }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      MessagesAction.saveMessage(e.target.value, this.state.to_user_id)// saveMessageアクションを呼ぶ content from timestampを保存
      // MessagesAction.getMessages(e.target.value)
      this.setState({
        value: ' ',
        // file: ' ',
      })// 文字をリセットする
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  onChangeFile(e) {
    this.setState({
      // files: e.target.files,
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
        <input
          type='file'
          onChange={this.onChangeFile.bind(this)}
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
