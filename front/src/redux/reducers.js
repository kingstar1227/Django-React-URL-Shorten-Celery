import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'

import auth from './modules/auth'
import record from './modules/record'

export default combineReducers({
  auth,
  form,
  modal,
  record
})
