import axios from 'axios'

/**
 * Post a mail with sendgrid lambda function.
 * @param {*} param0
 */
export function sendMail({ subject, to, email, message, text, html, cc }) {
  return axios.post(
    process.env.GRIDSOME_LAMBDA_FUNCTIONS_BASE_URL + '/sendgrid',
    JSON.stringify({ subject, to, email, message, text, html, cc })
  )
}
