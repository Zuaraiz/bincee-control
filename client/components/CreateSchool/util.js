import trim from 'lodash/fp/trim'

const phoneRegex = /^[+][0-9]{1,12}$/
const emailRegex = /^$|^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/

export const validate = values => {
  const errors = {}
  const { name, phone_no, email, licenses, trialDate } = values
  if (!trim(name)) {
    errors.name = 'Required'
  }
  if (!trim(phone_no)) {
    errors.phone_no = 'Required'
  }
  if (!trim(email)) {
    errors.email = 'Required'
  }
  if (!trim(trialDate)) {
    errors.trialDate = 'Required'
  }
  if (!trim(licenses)) {
    errors.licenses = 'Required'
  }
  if (!phoneRegex.test(phone_no)) {
    errors.phone_no = 'Invalid Phone Number (i.e +XXX...)'
  }
  if (!emailRegex.test(email)) {
    errors.email = 'Invalid Email'
  }
  return errors
}

export default { validate }
