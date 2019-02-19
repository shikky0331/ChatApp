// // import Dispatcher from '../dispatcher'
// import request from 'superagent'
// // import {ActionTypes} from '../constants/app'
// // import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
//
// export default{
//   saveFriendship(from_user_id) {
//     return new Promise((resolve, reject) => {
//       request
//      .post(APIEndpoints.FRIENDSHIPS)// postリクエストがapi/messagesに送
//      .set('X-CSRF-Token', CSRFToken())
//      .send({
//        from_user_id,
//      })
//     })
//   },
// }
