import Dispatcher from '../dispatcher'
// import request from 'superagent'
import {ActionTypes} from '../constants/app'
// , APIEndpoints, CSRFToken

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID, // 変更箇所
      userID: newUserID,
    }) //
  },

  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE, // 変更箇所
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
//
//   // getの場合
//   getHoge() {
//     return new Promise((resolve, reject) => {
//       request
//       .get('/api/hoge') // 取得したいjsonがあるURLを指定する
//       .end((error, res) => {
//         if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
//           const json = JSON.parse(res.text)
//           Dispatcher.handleServerAction({
//             type: ActionTypes.GET_HOGE,
//             json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
//           })
//           resolve(json)
//         } else {
//           reject(res)
//         }
//       })
//     })
//   },
//
// // postの場合
//   postHoge(hogeId) {
//     return new Promise((resolve, reject) => {
//       request
//       .post(`${APIEndpoints.HOGE}`) // 「プロトコル//ホスト名+ポート番号」を取得
//       .set('X-CSRF-Token', CSRFToken()) // CRSFを防ぐため
//       .send({hoge_id: hogeId}) // これによりサーバ側に送りたいデータを送ることが出来ます。
//       .end((error, res) => {
//         if (!error && res.status === 200) {
//           const json = JSON.parse(res.text)
//           Dispatcher.handleServerAction({
//             type: ActionTypes.POST_HOGE,
//             hogeId,
//             json,
//           })
//         } else {
//           reject(res)
//         }
//       })
//     })
//   },
}
