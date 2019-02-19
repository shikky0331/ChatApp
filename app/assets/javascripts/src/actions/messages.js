import Dispatcher from '../dispatcher'
import request from 'superagent'
// import {ActionTypes} from '../constants/app'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default{
  getMessages() {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.MESSAGES) // getリクエストがapi/messagesに送
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.GET_MESSAGES,
           json,
         })
         resolve(json)
       } else {
         reject(res)
       }
     })
    })
  },
  // getMessages(id) {
  //   return new Promise((resolve, reject) => {
  //     request
  //    .get(APIEndpoints.MESSAGES) // getリクエストがapi/messagesに送
  //    .end((error, res) => {
  //      if (!error && res.status === 200) {
  //        const json = JSON.parse(res.text)
  //        Dispatcher.handleServerAction({
  //          type: ActionTypes.GET_MESSAGES,
  //          id,
  //          json,
  //        })
  //        resolve(json)
  //      } else {
  //        reject(res)
  //      }
  //    })
  //   })
  // },
  saveMessage(content, to_user_id) {
    return new Promise((resolve, reject) => {
      request
     .post(APIEndpoints.MESSAGES)// postリクエストがapi/messagesに送
     .set('X-CSRF-Token', CSRFToken())
     .send({
       content,
       to_user_id,
       timestamp: new Date().getTime(),
     })
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.SAVE_MESSAGE,
           messages: json,
         })
       } else {
         reject(res)
       }
     })
    })
  },
  saveImage(file, ) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/image`)
      .attach('image', file)
      .field('caption', 'My cats')
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE,
            messages: json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  changeOpenChat(user_id, to_user_id) {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.MESSAGES) // getリクエストがapi/messagesに送
     .query({user_id})
     .query({to_user_id})
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
           json,
         })
         resolve(json)
       } else {
         reject(res)
       }
     })
    })
  },
}
//   changeOpenChat(newUserID) {
//     return new Promise((resolve, reject) => {
//       request
//      .get(APIEndpoints.USERS) // getリクエストがapi/messagesに送
//      .end((error, res) => {
//        if (!error && res.status === 200) {
//          const json = JSON.parse(res.text)
//          Dispatcher.handleServerAction({
//            type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
//            userID: newUserID,
//            json,
//          })
//          resolve(json)
//        } else {
//          reject(res)
//        }
//      })
//     })
//   },
// }
// , APIEndpoints, CSRFToken

// export default {
//   changeOpenChat(newUserID) {
//     Dispatcher.handleViewAction({
//       type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
//       userID: newUserID,
//     }) //
//   },
//
//   sendMessage(userID, message) {
//     Dispatcher.handleViewAction({
//       type: ActionTypes.SEND_MESSAGE, // 変更箇所
//       userID: userID,
//       message: message,
//       timestamp: +new Date(),
//     })
//   },
//
// }
