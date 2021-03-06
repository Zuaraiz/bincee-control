// libs
import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import toLower from 'lodash/fp/toLower'

// src
import app from './app'
import user from './user'
import userDetails from './userDetails'
import users from './users'
import drivers from './drivers'
import parents from './parents'
import schools from './schools'
import credentials from './credentials'
import * as ActionTypes from '../actions'
import { checkError } from '../utils'

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error, payload } = action
  const { status, data, message: errormessage, type: errorType } = payload || {}
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  }
  if (
    type !== ActionTypes.USER_LOGIN_FAILURE &&
    (type === ActionTypes.SHOW_ERROR_MESSAGE ||
      error ||
      (status &&
        status !== 200 &&
        toLower(status) !== 'active' &&
        toLower(status) !== 'inactive'))
  ) {
    if (data) {
      const { message } = data
      return checkError(message)
        ? {
            message:
              'Cannot Create/Modify/Delete Record with Usage in Other Records.',
          }
        : data
    }
    if (errormessage) {
      return { message: errormessage, type: errorType }
    }
    return { message: 'Something Bad Happened.' }
  }
  if (type === ActionTypes.CLEAR_ERROR_MESSAGES) {
    return { clearAll: true }
  }
  return state
}

const rootReducer = combineReducers({
  app,
  user,
  userDetails,
  users,
  drivers,
  parents,
  schools,
  credentials,
  form: formReducer,
})

export default rootReducer
