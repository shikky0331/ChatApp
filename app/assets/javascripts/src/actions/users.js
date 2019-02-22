import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default{
  getUsers() {
    return new Promise((resolve, reject) => {
      request
     .get(APIEndpoints.USERS)
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
  // getCurrentUsers() {
  //   return new Promise((resolve, reject) => {
  //     request
  //    .get(APIEndpoints.CURRENT_USER)
  //    .end((error, res) => {
  //      if (!error && res.status === 200) {
  //        const json = JSON.parse(res.text)
  //        Dispatcher.handleServerAction({
  //          type: ActionTypes.GET_CURRENT_USER,
  //          json,
  //        })
  //        resolve(json)
  //      } else {
  //        reject(res)
  //      }
  //    })
  //   })
  // },
}
