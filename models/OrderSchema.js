const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'First name is required.'],
  },
  paymentId: {
    type: String,
    required: [true, 'Last name is required.'],
  },
  userEmail: {
    type: String,
    required: [true, 'Email is required.'],
  },
  totalAmount: {
    type: Number,
    required: [true, 'Amount is required.'],
  },
  totalItems: {
    type: Number,
    required: [true, 'Toal number of items is required.'],
  },
  orderInformation: [
    {
      productId: {
        type: String,
        required: [true, 'Product ID is required.'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required.'],
      },
    },
  ],
})

module.exports = mongoose.model('Order', orderSchema)
