// src
import * as ActionTypes from '../actions'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.CREATE_SCHOOL_SUCCESS: {
      return { ...state, message: 'School created Successfully' }
    }
    case ActionTypes.CREATE_SCHOOL_FAILURE: {
      return { ...state, message: 'School Creation Failed' }
    }
    case ActionTypes.EDIT_SCHOOL_SUCCESS: {
      return { ...state, message: 'School Update Successfully' }
    }
    case ActionTypes.EDIT_SCHOOL_FAILURE: {
      return { ...state, message: 'School Update Failed' }
    }
    case ActionTypes.EDIT_SCHOOL_CREDENTIALS_SUCCESS: {
      return { ...state, message: 'School Credentials Update Successfully' }
    }
    case ActionTypes.EDIT_SCHOOL_CREDENTIALS_FAILURE: {
      return { ...state, message: 'School Credentials Update Failed' }
    }
    case ActionTypes.DELETE_SCHOOL_SUCCESS: {
      return { ...state, message: 'School Deleted Successfully' }
    }
    case ActionTypes.DELETE_SCHOOL_FAILURE: {
      return { ...state, message: 'School Deletion Failed' }
    }
    case ActionTypes.LOAD_SCHOOLS_SUCCESS: {
      const { data } = payload
      return { ...state, schools: data, message: '' }
    }
    case ActionTypes.LOAD_SCHOOLS_FAILURE: {
      return { ...state, message: 'Cannot find School' }
    }
    case ActionTypes.LOAD_SINGLE_SCHOOL_SUCCESS: {
      const { data } = payload
      const { school_id } = data
      return { ...state, [school_id]: data, message: '' }
    }
    case ActionTypes.LOAD_SINGLE_SCHOOL_FAILURE: {
      return { ...state, message: 'Cannot find School' }
    }
    default: {
      return state
    }
  }
}
