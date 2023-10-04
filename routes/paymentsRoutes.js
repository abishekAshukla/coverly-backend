const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateTokenHandler')
const {
  createOrder,
  verifyPayment,
  saveOrder,
  getKey,
} = require('../controllers/paymentsController')

router.post('/orders', validateToken, createOrder)
router.post('/verify', validateToken, verifyPayment)
router.post('/saveorder', validateToken, saveOrder)
router.get('/getkey', validateToken, getKey)

module.exports = router
