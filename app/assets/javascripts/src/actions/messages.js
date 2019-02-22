import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default{
  getMessages() {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.MESSAGES)
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
  saveMessage(content, to_user_id) {
    return new Promise((resolve, reject) => {
      request
     .post(APIEndpoints.MESSAGES)
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
  saveImage(file, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/image`)
      .set('X-CSRF-Token', CSRFToken())
      .field('to_user_id', to_user_id)
      .attach('image', file)
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
  changeOpenChat(user_id, to_user_id) {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.MESSAGES)
     .query({user_id})
     .query({to_user_id})
     .end((error, res) => {
       if (!error && res.status === 200) {
         const json = JSON.parse(res.text)
         Dispatcher.handleServerAction({
           type: ActionTypes.UPDATE_OPEN_CHAT_ID,
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
