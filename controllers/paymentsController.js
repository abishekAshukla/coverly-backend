const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/OrderSchema')
const User = require('../models/UserSchema')

// desc: initiate a order for payment , route: POST /api/payment/orders , access: private, request: POST
const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    })

    const options = {
      amount: req.body.amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    }

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something Went Wrong!' })
      }
      res.status(200).json({ data: order })
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' })
    console.log(error)
  }
}

// desc: verify the initiated payment , route: POST /api/payment/verify , access: private, request: POST
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({
        message: 'Payment verified successfully',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      })
    } else {
      return res.status(400).json({ message: 'Invalid signature sent!' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error!' })
    console.log(error)
  }
}

// desc: save order details into database after payment verification , route: POST /api/payment/saveorder , access: private, request: POST
const saveOrder = async (req, res) => {
  const { orderId, paymentId, totalAmount, totalItems, orderInformation } =
    req.body

  if (
    !orderId ||
    !paymentId ||
    !totalAmount ||
    !totalItems ||
    !orderInformation
  ) {
    return res.status(400).json({ message: 'Invalid order details' })
  }

  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const order = new Order({
    orderId,
    paymentId,
    userEmail: user.email,
    totalAmount,
    totalItems,
    orderInformation,
  })

  await order.save()

  res.status(200).json({
    message: 'Order created successfully',
    order,
  })
}

// desc: get razorpay api key , route: GET /api/payment/getkey , access: private, request: GET, unused in frontend
const getKey = async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
}

module.exports = {
  createOrder,
  verifyPayment,
  saveOrder,
  getKey,
}
