const asyncHandler = require('express-async-handler')
const User = require('../models/UserSchema')
const Product = require('../models/ProductSchema')

// desc: add product to user's cart with quantity, route: /api/users/cart, access: private, request: POST
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product or quantity' })
  }

  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Check if the product already exists in the cartItems array
  const existingCartItem = user.cartItems.find(
    (item) => item.productId === productId
  )

  if (existingCartItem) {
    existingCartItem.quantity += quantity
  } else {
    user.cartItems.push({ productId, quantity })
  }

  await user.save()

  res.status(200).json({
    message: 'Product added to cart successfully',
    cartItems: user.cartItems,
  })
})

// desc: update product quantity in user's cart, route: /api/users/cart, access: private, request: PUT
const updateCartQuantity = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product or quantity' })
  }

  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Check if the product exists in the cartItems array
  const existingCartItem = user.cartItems.find(
    (item) => item.productId === productId
  )

  if (!existingCartItem) {
    return res.status(400).json({ message: 'Product not found in cart' })
  }

  existingCartItem.quantity = quantity

  await user.save()

  res.status(200).json({ message: 'Cart updated successfully' })
})

// desc: get all items in user's cart, route: /api/users/cart, access: private, request: GET
const getAllCartItems = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const cartItemIds = user.cartItems.map((item) => item.productId)

  // Fetch products based on the product_link field
  const products = await Product.find({
    product_link: { $in: cartItemIds.map((id) => `/p/${id}`) },
  })

  // return product with quantity and Id
  const finalProducts = user.cartItems.map((item) => {
    const product = products.find(
      (product) => product.product_link === `/p/${item.productId}`
    )

    return {
      productId: item.productId,
      quantity: item.quantity,
      product,
    }
  })

  res.status(200).json({ cartItems: finalProducts })
})

// desc: remove a product from user's cart, route: /api/users/cart, access: private, request: DELETE
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' })
  }

  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Check if the product exists in the cartItems array
  const index = user.cartItems.findIndex((item) => item.productId === productId)

  if (index === -1) {
    return res.status(400).json({ message: 'Product not found in cart' })
  }

  // Remove the product from the cartItems array
  user.cartItems.splice(index, 1)
  await user.save()

  res.status(200).json({
    message: 'Product removed from cart successfully',
    cartItems: user.cartItems,
  })
})

// desc: clear user's cart, route: /api/users/clearcart, access: private, request: DELETE
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Clear the cartItems array
  user.cartItems = []

  await user.save()

  res.status(200).json({
    message: 'Cart cleared successfully',
    cartItems: user.cartItems,
  })
})
module.exports = {
  addToCart,
  updateCartQuantity,
  getAllCartItems,
  removeFromCart,
  clearCart,
}
