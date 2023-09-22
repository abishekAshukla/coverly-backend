const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email must be unique.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  wishListItems: {
    type: [String],
    default: [],
  },
  cartItems: [
    {
      productId: {
        type: String, // Product ID
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure quantity is at least 1
      },
    },
  ],
})

module.exports = mongoose.model('User', userSchema)
