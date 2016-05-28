import 'whatwg-fetch'

import {
  ERROR,
  AUTH_GITHUB
} from '../constants'

const API_URL = `http://localhost:${__PORT__}/auth`
const API_URL_GITHUB = API_URL + '/github'

export const githubAuth = () => {
  console.log(123123123);
  return {
    type: 'TEST'
  }
}

// export const githubAuth = () => {
//   return (dispatch) => fetch(API_URL_GITHUB, {
//     methog: 'GET'
//   })
//   .then(response => response.json())
//   .then(json => {
//     console.log(234, json)
//   })
//   .catch(exception => dispatch({
//     type: ERROR,
//     payload: exception.message
//   }))
// }
