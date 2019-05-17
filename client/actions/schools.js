// src
import { CALL_API } from '../middleware/api'
import { getBaseUrl } from '../utils'

export const CREATE_SCHOOL = 'CREATE_SCHOOL'
export const CREATE_SCHOOL_SUCCESS = 'CREATE_SCHOOL_SUCCESS'
export const CREATE_SCHOOL_FAILURE = 'CREATE_SCHOOL_FAILURE'
export const EDIT_SCHOOL = 'EDIT_SCHOOL'
export const EDIT_SCHOOL_SUCCESS = 'EDIT_SCHOOL_SUCCESS'
export const EDIT_SCHOOL_FAILURE = 'EDIT_SCHOOL_FAILURE'
export const EDIT_SCHOOL_CREDENTIALS = 'EDIT_SCHOOL_CREDENTIALS'
export const EDIT_SCHOOL_CREDENTIALS_SUCCESS = 'EDIT_SCHOOL_CREDENTIALS_SUCCESS'
export const EDIT_SCHOOL_CREDENTIALS_FAILURE = 'EDIT_SCHOOL_CREDENTIALS_FAILURE'
export const DELETE_SCHOOL = 'DELETE_SCHOOL'
export const DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS'
export const DELETE_SCHOOL_FAILURE = 'DELETE_SCHOOL_FAILURE'
export const LOAD_SCHOOLS = 'LOAD_SCHOOLS'
export const LOAD_SCHOOLS_SUCCESS = 'LOAD_SCHOOLS_SUCCESS'
export const LOAD_SCHOOLS_FAILURE = 'LOAD_SCHOOLS_FAILURE'
export const LOAD_SINGLE_SCHOOL = 'LOAD_SINGLE_SCHOOL'
export const LOAD_SINGLE_SCHOOL_SUCCESS = 'LOAD_SINGLE_SCHOOL_SUCCESS'
export const LOAD_SINGLE_SCHOOL_FAILURE = 'LOAD_SINGLE_SCHOOL_FAILURE'
const baseUrl = getBaseUrl()

export const createSchool = ({
  username,
  password,
  address,
  name,
  phone_no,
  email,
  licenses,
  fleetLicenses,
  trial,
  trialDays = null,
  trialDate = null,
  token,
}) => ({
  [CALL_API]: {
    types: [CREATE_SCHOOL, CREATE_SCHOOL_SUCCESS, CREATE_SCHOOL_FAILURE],
    endpoint: `${baseUrl}/admin/school/create`,
    method: 'POST',
    token,
  },
  payload: {
    username,
    password,
    address,
    name,
    phone_no,
    email,
    licenses,
    fleetLicenses,
    trial,
    trialDays,
    trialDate,
  },
})

export const updateSchool = ({
  id,
  address,
  name,
  phone_no,
  licenses,
  fleetLicenses,
  trial,
  trialDays = null,
  trialDate = null,
  email,
  token,
}) => ({
  [CALL_API]: {
    types: [EDIT_SCHOOL, EDIT_SCHOOL_SUCCESS, EDIT_SCHOOL_FAILURE],
    endpoint: `${baseUrl}/admin/school/${id}`,
    method: 'POST',
    token,
  },
  payload: {
    address,
    name,
    phone_no,
    email,
    licenses,
    fleetLicenses,
    trial,
    trialDays,
    trialDate,
  },
})

export const updateSchoolCredentials = ({ id, username, password, token }) => ({
  [CALL_API]: {
    types: [
      EDIT_SCHOOL_CREDENTIALS,
      EDIT_SCHOOL_CREDENTIALS_SUCCESS,
      EDIT_SCHOOL_CREDENTIALS_FAILURE,
    ],
    endpoint: `${baseUrl}/users/${id}`,
    method: 'POST',
    token,
  },
  payload: { username, password },
})

export const loadSingleSchool = ({ id, token }) => ({
  [CALL_API]: {
    types: [
      LOAD_SINGLE_SCHOOL,
      LOAD_SINGLE_SCHOOL_SUCCESS,
      LOAD_SINGLE_SCHOOL_FAILURE,
    ],
    endpoint: `${baseUrl}/admin/school/${id}`,
    method: 'GET',
    token,
  },
  payload: {},
})

export const deleteSchool = ({ id, token }) => ({
  [CALL_API]: {
    types: [DELETE_SCHOOL, DELETE_SCHOOL_SUCCESS, DELETE_SCHOOL_FAILURE],
    endpoint: `${baseUrl}/admin/school/${id}`,
    method: 'DELETE',
    token,
  },
  payload: {},
})

export const loadSchools = ({ token }) => ({
  [CALL_API]: {
    types: [LOAD_SCHOOLS, LOAD_SCHOOLS_SUCCESS, LOAD_SCHOOLS_FAILURE],
    endpoint: `${baseUrl}/admin/school/list`,
    method: 'GET',
    token,
  },
  payload: {},
})
