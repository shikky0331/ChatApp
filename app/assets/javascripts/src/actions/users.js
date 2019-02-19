import Dispatcher from '../dispatcher'
import request from 'superagent'
// import {ActionTypes} from '../constants/app'
// import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default{
  getUsers() {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.USERS) // getリクエストがapi/messagesに送
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.GET_USERS,
           json,
         })
         resolve(json)
       } else {
         reject(res)
       }
     })
    })
  },
  getSearchUsers(name) {
    return new Promise((resolve, reject) => {
      request
     .get(`${APIEndpoints.USERS}/search`)
     .query({name})
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.SEARCH_USERS,
           json,
         })
         resolve(json)
       } else {
         reject(res)
       }
     })
    })
  },
  getCurrentUsers() {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.CURRENT_USER) // getリクエストがapi/messagesに送
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.GET_CURRENT_USER,
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
  // changeOpenChat(newUserID) {
  //   return new Promise((resolve, reject) => {
  //     request
  //    .get(APIEndpoints.USERS) // getリクエストがapi/messagesに送
  //    .end((error, res) => {
  //      if (!error && res.status === 200) {
  //        const json = JSON.parse(res.text)
  //         Dispatcher.handleViewAction({
  //           type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
  //           // userID: newUserID,
  //         })
  //         resolve(json)
  //       } else {
  //         reject(res)
  //       }
  //     })
  //    })
  //  },

  // saveMessage(content, from, timestamp) {
  //   return new Promise((resolve, reject) => {
  //     request
  //    .post(APIEndpoints.MESSAGES)// postリクエストがapi/messagesに送
  //    .set('X-CSRF-Token', CSRFToken())
  //    .send({
  //      content,
  //      from,
  //      timestamp,
  //    })
  //    .end((error, res) => {
  //      if (!error && res.status === 200) {
  //        const json = JSON.parse(res.text)
  //        Dispatcher.handleServerAction({
  //          type: ActionTypes.SAVE_MESSAGE,
  //          json,
  //        })
  //      } else {
  //        reject(res)
  //      }
  //    })
  //   })
  // },

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
