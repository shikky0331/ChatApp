// import Dispatcher from '../dispatcher'
// import request from 'superagent'
// import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
//
// export default{
//   saveFriendship(to_user_id) {
//     return new Promise((resolve, reject) => {
//     request
//     .post(APIEndpoints.FRIENDSHIPS)// postリクエストがapi/messagesに送
//     .set('X-CSRF-Token', CSRFToken())
//     .send({
//       to_user_id: to_user_id,
//     })
//     .end((error, res) => {
//       if (!error && res.status === 200) {
//         const json = JSON.parse(res.text)
//         Dispatcher.handleServerAction({
//           type: ActionTypes.SAVE_FRIEND,
//           json,
//         })
//         resolve(json)
//       } else {
//         reject(res)
//       }
//     })
//    })
//  }
