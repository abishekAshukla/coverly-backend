const express = require('express')
const { errorHandler } = require('./middleware/errorHandler')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000
const Razorpay = require('razorpay')

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/products', require('./routes/productsRoutes'))
app.use('/api/brands', require('./routes/brandRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/checkout', require('./routes/paymentRoutes'))
app.use(errorHandler)

module.exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
