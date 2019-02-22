// npm install @sendgrid/mail
// npm install dotenv
require('dotenv').config()
const sgMail = require('@sendgrid/mail')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = (event, context, callback) => {
  // using SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const payload = JSON.parse(event.body)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: payload.to,
    from: payload.email,
    subject: payload.subject,
    text: payload.message,
    html: payload.message
  }
  if (payload.cc) {
    msg.cc = payload.cc
  }
  sgMail
    .send(msg)
    .then(r => {
      callback(null, {
        statusCode: 200,
        headers,
        body: 'OK'
      })
    })
    .catch(e => {
      callback(e)
    })
}
