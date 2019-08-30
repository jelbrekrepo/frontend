import { AUTHENTICATE, DEAUTHENTICATE } from '../actionTypes'

const initialState = {
  token: null,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }
    case DEAUTHENTICATE:
      return {
        ...state,
        token: null,
        user: null
      }
    default:
      return state
  }
}
