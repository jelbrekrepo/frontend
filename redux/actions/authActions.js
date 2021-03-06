import { AUTHENTICATE, DEAUTHENTICATE } from '../actionTypes'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
const { BASE_URL } = getConfig().publicRuntimeConfig

const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    })
  }
}

const authenticate = token => {
  return dispatch => {
    fetch(`${BASE_URL}/users/@me`, {
      credentials: 'include',
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: AUTHENTICATE,
          payload: {
            user: json.user,
            token: token
          }
        })
      })
  }
}
const reauthenticate = token => {
  return dispatch => {
    dispatch({
      type: 'AUTHENTICATE',
      payload: {
        token
      }
    })
  }
}
const deauthenticate = () => {
  return dispatch => {
    dispatch({
      type: DEAUTHENTICATE
    })
  }
}

export default {
  authenticate,
  deauthenticate,
  reauthenticate
}
