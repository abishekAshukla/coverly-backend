const express = require('express')
const router = express.Router()
const {
  checkOut,
  payMentVerification,
  getKey,
} = require('../controllers/paymentController')

router.route('/').post(checkOut)
router.route('/paymentverification').post(payMentVerification)
router.route('/getkey').get(getKey)

module.exports = router
