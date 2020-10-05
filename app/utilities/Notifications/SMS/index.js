const axios = require('axios')
const { SMS_API } = require('../../../conf')
const Users = require('../../../models/User')
const Order = require('../../../models/Order')

const getMessage = ({ orderId }) => `
התקבלה הזמנה חדשה,
מספר הזמנה: ${orderId}
לפרטים נוספים הכנס למערכת הניהול:
https://admin.webit.store
`

const createMessage = ({
  destinations,
  message,
  from,
}) => `<?xml version="1.0" encoding="UTF-8"?>
<sms>
<user>
<username>itadmit01</username>
<password>aA115599@</password>
</user>
<source>${from}</source>
<destinations>
<phone>${destinations}</phone>
</destinations>
<message>${message}</message>
</sms>
`

var config = {
  headers: { 'Content-Type': 'text/xml' },
}

const composeSMSMessage = ({ destinations, message, from }) => {
  return axios.post(
    SMS_API,
    createMessage({ destinations, message, from }),
    config
  )
}

const useSMSMiddleware = (req, res, next) => {
  if (!req.document) return next()
  if (req.document.store.toString() !== '5efa5cf829ed81001174a856')
    return next()

  Users.findOne({ stores: req.document.store }, async (err, user) => {
    if (err || !user) return next()

    const { phone } = user
    await composeSMSMessage({
      destinations: phone,
      message: getMessage({ orderId: req.document.uuid }),
      from: 'WEBIT-STORE',
    }).then(() => {
      console.log('sent to phone', phone)
    })
    next()
  })
}

module.exports = {
  composeSMSMessage,
  useSMSMiddleware,
}
