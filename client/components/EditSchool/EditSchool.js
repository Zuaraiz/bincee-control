// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

// src
import {
  renderTextField,
  renderRadioGroup,
} from '../shared/reduxFormMaterialUI'
import styles from './EditSchool.less'
import {
  loadSingleSchool,
  updateSchool,
  showErrorMessage,
  uploadImage,
} from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'
import Picture from '../Picture'

class EditSchool extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      isLoading: true,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      hasPropChanged(['formValues', 'validationErrors'], this.props, nextProps)
    ) {
      const { validationErrors } = nextProps
      if (size(validationErrors) > 0) {
        this.setState(() => ({ disabled: true }))
      } else {
        this.setState(() => ({ disabled: false }))
      }
    }
  }

  updateSchool = () => {
    const { dispatch, formValues, user, id, onClose } = this.props
    const { token } = user
    const { name, phone_no, email, address, photo } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      updateSchool({ id, name, phone_no, email, address, photo, token }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        onClose()
        dispatch(showErrorMessage('Updated successfully', 'success'))
      }
    })
  }

  handleCancel = () => {
    const { onClose } = this.props
    this.setState(() => ({ isLoading: true }))
    onClose()
  }

  onEnter = () => {
    const { user, dispatch, initialize, id } = this.props
    const { token } = user
    dispatch(loadSingleSchool({ id, token })).then(({ payload }) => {
      this.setState(() => ({ isLoading: false }))
      const { data } = payload
      const { name, phone_no, email, address, photo } = data
      const config = { name, phone_no, email, address, photo }
      initialize(config)
    })
  }

  fileChangedHandler = event => {
    const [selectedFile] = event.target.files
    if (selectedFile) {
      const { dispatch, user } = this.props
      const { token } = user
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('name', selectedFile.name)
      this.setState(() => ({ isLoading: true }))
      dispatch(
        uploadImage({
          id: 1,
          user: 'driver',
          image: formData,
          token,
        }),
      ).then(({ payload }) => {
        const { status, data } = payload

        this.setState(() => ({ isLoading: false }))
        if (status === 200) {
          const { path } = data
          const { formValues, initialize } = this.props
          initialize({ ...formValues, photo: path })
        }
      })
    }
  }

  render() {
    const { disabled, isLoading } = this.state
    const { classes, onClose, formValues, ...other } = this.props
    const { photo } = formValues || {}
    return (
      <Dialog
        onClose={onClose}
        onEnter={this.onEnter}
        aria-labelledby="simple-dialog-title"
        {...other}
        fullWidth
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="simple-dialog-title" className={styles.head}>
          {'Edit School'}
        </DialogTitle>
        <DialogContent className={styles.dialog}>
          <Choose>
            <When condition={isLoading}>
              <LoadingView />
            </When>
            <Otherwise>
              <form className={styles.root}>
                {/* <div className={styles.row}>
                  <Picture
                    source={photo || '/images/profileSchool.png'}
                    onChange={this.fileChangedHandler}
                  />
                </div> */}
                <div className={styles.row}>
                  <Field
                    id="name"
                    name="name"
                    component={renderTextField}
                    label="Name"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    id="phone_no"
                    name="phone_no"
                    component={renderTextField}
                    label="Phone No"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    id="email"
                    name="email"
                    component={renderTextField}
                    label="Email"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    id="address"
                    name="address"
                    component={renderTextField}
                    label="Address"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <div className={styles.item}>
                    <Button
                      disabled={disabled}
                      onClick={this.updateSchool}
                      label="Update"
                      style={{
                        backgroundColor: '#0adfbd',
                        borderColor: '#0adfbd',
                      }}
                    />
                    <Button
                      onClick={this.handleCancel}
                      label="Cancel"
                      style={{
                        backgroundColor: '#ff4747',
                        borderColor: '#ff4747',
                      }}
                    />
                  </div>
                </div>
              </form>
            </Otherwise>
          </Choose>
        </DialogContent>
      </Dialog>
    )
  }
}
const mapStateToProps = state => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('editSchool')(state),
    validationErrors: getFormSyncErrors('editSchool')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'editSchool',
    validate,
    initialValues: {
      name: '',
      phone_no: '',
      email:'',
      address: '',
      photo: '',
    },
  })(EditSchool),
)
