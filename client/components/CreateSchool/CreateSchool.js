// libs
import React from 'react'
import { Field, getFormValues, getFormSyncErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import getOr from 'lodash/fp/getOr'
import uniqueId from 'lodash/fp/uniqueId'
import size from 'lodash/fp/size'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import moment from 'moment'

// src
import { renderTextField, renderSwitch } from '../shared/reduxFormMaterialUI'
import styles from './CreateSchool.less'
import { createSchool, showErrorMessage } from '../../actions'
import { hasPropChanged } from '../../utils'
import LoadingView from '../LoadingView'
import { validate } from './util'
import Button from '../Button'

class CreateSchool extends React.Component {
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

  createSchool = () => {
    const { dispatch, formValues, user, onClose } = this.props
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
    const username = email
    const password = uniqueId('ChangeMe@')
    this.setState(() => ({ isLoading: true }))
    dispatch(
      createSchool({
        username,
        password,
        name,
        phone_no,
        email,
        address,
        licenses,
        fleetLicenses,
        trial,
        trialDays,
        trialDate,
        token,
      }),
    ).then(({ payload }) => {
      const { status: requestStatus } = payload
      if (requestStatus === 200) {
        dispatch(showErrorMessage('Created successfully', 'success'))(onClose())
      }
    })
  }

  handleCancel = () => {
    const { onClose } = this.props
    onClose()
  }

  onEnter = () => {
    const { initialize } = this.props
    const config = {
      name: '',
      phone_no: '',
      email: '',
      address: '',
      licenses: 0,
      fleetLicenses: 0,
      trial: false,
      trialDays: 0,
      trialDate: moment().format('YYYY-MM-DD'),
    }
    this.setState(() => ({ isLoading: false }))
    initialize(config)
  }

  render() {
    // TODO: Change file upload control
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
          {'Create School'}
        </DialogTitle>
        <DialogContent>
          <Choose>
            <When condition={isLoading}>
              <LoadingView />
            </When>
            <Otherwise>
              <form className={styles.root}>
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
                      onClick={this.createSchool}
                      label="Create"
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
const mapStateToProps = (state, ownProps) => {
  const user = getOr({}, 'user')(state)
  return {
    formValues: getFormValues('createSchool')(state),
    validationErrors: getFormSyncErrors('createSchool')(state),
    user,
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'createSchool',
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
  })(CreateSchool),
)
