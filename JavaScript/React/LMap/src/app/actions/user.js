import { ROUTING } from '../constants/Routing'

export function routing() {
  return (dispatch) => {
    dispatch({
      type: ROUTING,
      payload: {
        mathod: 'replace',
        nextUrl: '/admin'
      }
    })
  }
}
