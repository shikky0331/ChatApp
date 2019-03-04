import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'

class MessagesBox extends React.Component {
  static get propTypes() {
    return {
      currentUser: React.PropTypes.object,
      userMessageList: React.PropTypes.array,
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'})
  }

  render() {
    const currentUserID = this.props.currentUser

    const messages = this.props.userMessageList.map((messages, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': messages.user_id === currentUserID.id,
        'clear': true,
      })

      return (
          <li key={ messages.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
            { (messages.image === null) ? messages.content : <img className='image-message' src = {`/message_images/${messages.id}.jpg`}/> }
            </div>
          </li>
        )
    })

    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
            <div ref={(el) => { this.messagesEnd = el }}>
            </div>
          </ul>
          <ReplyBox />
        </div>
      )
  }
}
export default MessagesBox
