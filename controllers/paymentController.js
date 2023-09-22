const asyncHandler = require('express-async-handler')
// const crypto = require('crypto')
const Razorpay = require('razorpay')
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
})

// route: POST /api/checkout
const checkOut = asyncHandler(async (req, res) => {
  const { amount } = req.body
  const options = {
    amount: Number(amount) * 100,
    currency: 'INR',
  }
  const order = await instance.orders.create(options)
  //   console.log(order)

  res.status(200).json({ success: true, order: order })
})

// route: POST /api/checkout/paymentverification
const payMentVerification = asyncHandler(async (req, res) => {
  const body = req.body

  // Verify the Razorpay signature
  const crypto = require('crypto')
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET) // Replace with your actual key secret

  hmac.update(JSON.stringify(body))
  const generatedSignature = hmac.digest('hex')

  if (generatedSignature === req.headers['x-razorpay-signature']) {
    // Signature is valid, proceed with updating the database
    const paymentStatus = body.status

    // Update your database with the payment status for the corresponding order ID
    // You may also want to store additional information like payment ID, invoice details, etc.

    if (paymentStatus === 'captured') {
      console.log('Payment successful')
    } else {
      // Payment failed or was not successful
      // Handle this accordingly
      console.log('Payment unsuccessful')
    }

    res.status(200).json({ message: 'Payment callback received and processed' })
  } else {
    // Signature is invalid, do not trust this request
    res.status(400).json({ error: 'Invalid signature' })
  }
})

// desc: get key, route: GET /api/checkout/getkey
const getKey = asyncHandler(async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

module.exports = {
  checkOut,
  payMentVerification,
  getKey,
}
