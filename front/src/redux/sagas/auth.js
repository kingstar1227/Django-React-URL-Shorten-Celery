import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_SIGNUP} from 'redux/modules/auth'
import apiCall from '../api/apiCall'

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/login/',
  success: (res, action) => {
    localStorage.setItem('auth_token', JSON.stringify(res.data))
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/signup/',
  success: () => {
    localStorage.removeItem('auth_token')
  },
  fail: () => {
    localStorage.removeItem('auth_token')
  }
})

export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_SIGNUP, doSignup)
}
