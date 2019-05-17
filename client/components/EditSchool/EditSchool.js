// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import moment from 'moment'

// src
import { renderTextField, renderSwitch } from '../shared/reduxFormMaterialUI'
import styles from './EditSchool.less'
import { loadSingleSchool, updateSchool, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

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
    const {
      name,
      phone_no,
      email,
      address,
      licenses,
      fleetLicenses,
      trial,
      trialDays,
      trialDate,
    } = formValues
    this.setState(() => ({ isLoading: true }))
    dispatch(
      updateSchool({
        id,
        name,
        phone_no,
        email,
        address,
        licenses,
        token,
        fleetLicenses,
        trial,
        trialDays,
        trialDate,
      }),
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
      const {
        name,
        phone_no,
        email,
        address,
        licenses,
        fleetLicenses = 0,
        trial = false,
        trialDays = 0,
        trialDate = moment().format('YYYY-MM-DD'),
      } = data
      const config = {
        name,
        phone_no,
        email,
        address,
        licenses,
        fleetLicenses,
        trial,
        trialDays,
        trialDate,
      }
      initialize(config)
    })
  }

  render() {
    const { disabled, isLoading } = this.state
    const { classes, onClose, formValues, ...other } = this.props
    const { trial = false } = formValues || {}
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
                    parse={value => Number(value)}
                    id="licenses"
                    name="licenses"
                    type="number"
                    component={renderTextField}
                    label="Licenses"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <Field
                    parse={value => Number(value)}
                    id="fleetLicenses"
                    name="fleetLicenses"
                    type="number"
                    component={renderTextField}
                    label="Fleet Licenses"
                    disabled={false}
                    variant="outlined"
                    className={styles.item}
                  />
                </div>
                <div className={styles.row}>
                  <label className={styles.switchLabel}>Enable Trial</label>
                  <Field
                    name="trial"
                    component={renderSwitch}
                    label=""
                    toolTip="EnableTrial"
                  />
                </div>
                {trial && (
                  <React.Fragment>
                    <div className={styles.row}>
                      <Field
                        parse={value => Number(value)}
                        id="trialDays"
                        name="trialDays"
                        type="number"
                        component={renderTextField}
                        label="Trial Days"
                        variant="outlined"
                        className={styles.item}
                      />
                    </div>
                    <div className={styles.row}>
                      <Field
                        id="trialDate"
                        name="trialDate"
                        component={renderTextField}
                        label="Trial Start Date"
                        variant="outlined"
                        className={styles.item}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                  </React.Fragment>
                )}
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
      email: '',
      address: '',
      photo: '',
      licenses: 0,
      fleetLicenses: 0,
      trial: false,
      trialDays: 0,
      trialDate: moment().format('YYYY-MM-DD'),
    },
  })(EditSchool),
)
