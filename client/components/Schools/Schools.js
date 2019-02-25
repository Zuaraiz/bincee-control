// libs
import React from 'react'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import find from 'lodash/fp/find'
import size from 'lodash/fp/size'

// src
import transformData from './transformers/transformData'
import { hasPropChanged } from '../../utils'
import {
  loadSchools,
  deleteSchool,
  loadSingleUser,
  sendCredentials,
  showErrorMessage,
  loadSingleSchool,
} from '../../actions'
import SchoolsInner from './SchoolsInner'
import InfoDrawer from '../InfoDrawer'
import Drawer from '../Drawer'

class Schools extends React.Component {
  state = {
    error: '',
    isLoading: true,
    createDialog: false,
    editDialog: false,
    editId: '',
  }

  componentDidMount() {
    const { dispatch, user } = this.props
    if (user) {
      const { token } = user
      dispatch(loadSchools({ token })).then(() => {
        this.setState(() => ({ isLoading: false }))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (hasPropChanged(['user', 'schools'], this.props, nextProps)) {
      const { dispatch, user, schools, error } = nextProps
      const { token } = user
      if (size(schools) < 1) {
        this.setState(() => ({ isLoading: true }))
        dispatch(loadSchools({ token })).then(() => {
          this.setState(() => ({ isLoading: false }))
        })
      } else {
        this.setState(() => ({ error, isLoading: false }))
      }
    }
  }

  handleDeleteSchool = (event, id) => {
    const { dispatch, user } = this.props
    const { token } = user
    this.setState(() => ({ isLoading: true }))
    dispatch(deleteSchool({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      dispatch(loadSchools({ token }))
    })
  }

  handleCreateSchool = () => {
    this.setState(() => ({
      createDialog: true,
    }))
  }

  handleUpdateSchool = (event, id) => {
    this.setState(() => ({
      editDialog: true,
      editId: id,
    }))
  }

  handleClose = () => {
    const { dispatch, user } = this.props
    const { token } = user
    dispatch(loadSchools({ token }))
    this.setState(() => ({
      createDialog: false,
      editDialog: false,
    }))
  }

  handleSendCredentials = () => {
    const { loadedUser, schools, user, dispatch } = this.props
    const { id, username, password } = loadedUser
    const { token } = user
    const { rows } = schools
    const { email } = find(({ id: userId }) => id === userId)(rows)
    dispatch(
      sendCredentials({
        username,
        password,
        email,
        phone_no: '',
        type: 'School',
        token,
      }),
    ).then(({ payload }) => {
      const { status, data } = payload
      const { message = 'Something Bad happened' } = data
      if (status === 200) {
        dispatch(showErrorMessage(message, 'success'))
      } else {
        dispatch(showErrorMessage(message))
      }
    })
  }

  handleRowClick = data => {
    const { triggerDrawer, dispatch, user, onDrawerClose } = this.props
    const { id, address, name, email, phone_no } = data
    const { token } = user
    onDrawerClose()

    this.setState(() => ({
      isLoading: true,
    }))

    dispatch(
      loadSingleUser({
        id,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus, data: payloadData } = payload
      if (requestStatus === 200) {
        const { username, password } = payloadData
        const dataToShow = {
          credentials: {
            username,
            password,
            hasCredentials: true,
          },
          school: {
            id,
            name,
            address,
            email,
            phone_no,
          },
        }
        this.setState(() => ({ isLoading: false }))
        triggerDrawer({
          title: 'School Content',
          content: (
            <Drawer
              data={dataToShow}
              sendCredentials={this.handleSendCredentials}
            />
          ),
        })
      }
    })
  }

  render() {
    const { error, isLoading, createDialog, editDialog, editId } = this.state
    const { schools } = this.props
    const { columns: rows, rows: data } = schools

    return (
      <SchoolsInner
        error={error}
        isLoading={isLoading}
        rows={rows}
        data={data}
        onRowClick={this.handleRowClick}
        onDeleteSchool={this.handleDeleteSchool}
        onCreateSchool={this.handleCreateSchool}
        onUpdateSchool={this.handleUpdateSchool}
        createDialog={createDialog}
        editDialog={editDialog}
        editId={editId}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = state => {
  const schools = getOr({}, 'schools')(state)
  const user = getOr({}, 'user')(state)
  const loadedUser = getOr({}, 'users.loadedUser')(state)
  const schoolList = getOr([], 'schools')(schools)
  const error = getOr('', 'message')(schools)
  const transformedSchools = transformData(schoolList)
  return { schools: transformedSchools, user, error, loadedUser }
}

const drawerSettings = { style: {} }
export default InfoDrawer(drawerSettings)(connect(mapStateToProps)(Schools))
