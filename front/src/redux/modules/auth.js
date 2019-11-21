import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'redux/api/request'

// ------------------------------------
// Constants
// ------------------------------------
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const DO_SIGNUP = 'DO_SIGNUP'

// ------------------------------------
// Actions
// ------------------------------------

export const login = createAction(DO_LOGIN)
export const logout = createAction(DO_LOGOUT, () => {
  localStorage.removeItem('auth_token')
})
export const signup = createAction(DO_SIGNUP)

const getInitialState = () => {
  let authRestore = JSON.parse(localStorage.getItem('auth_token') || null)
  return authRestore ? {
    token: authRestore.token,
    status: 'INIT',
    error: null
  } : {
    token: null,
    status: 'INIT',
    error: null
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestSuccess(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(DO_LOGIN),
  }),

  [requestFail(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_LOGIN),
    error: payload
  }),

  [DO_LOGOUT]: (state, { payload }) => ({
    ...state,
    token: null,
    status: DO_LOGOUT,
    error: null
  }),

  [requestSuccess(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DO_SIGNUP),
    error: null
  }),

  [requestFail(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_SIGNUP),
    error: payload
  }),

}, getInitialState())
