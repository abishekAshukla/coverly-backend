const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  brand: String,
  model: String,
  product_name: String,
  discounted_price: String,
  actual_price: String,
  loyalty_price: String,
  image_url: String,
  product_link: String,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
