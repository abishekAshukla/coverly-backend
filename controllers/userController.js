const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')
const Product = require('../models/ProductSchema')

// desc: register/signup new user , route: POST /api/users/register , access: public, request: POST
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }

  // if user already exits then throw error
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('user data is invalid')
  }
})

// desc: login existing user , route: POST /api/users/login , access: public, request: POST
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('All fiels are mandatory')
  }

  const user = await User.findOne({ email })
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '24h',
      }
    )
    res.status(200).json({
      accessToken,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      wishListIems: user.wishListItems,
    })
  } else {
    res.status(401)
    throw new Error('email or password is not valid')
  }
})

// desc: get current user information , route: GET /api/users/currentuser , access: private, request: GET
const currentUser = asyncHandler(async (req, res) => {
  // remember, vlidateTokenHandler middleware is working here first
  res.status(200).json(req.user)
})

// desc: add product id into user's wislist array, route: /api/users/wishlist , access: private, request: POST
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' })
  }

  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Check if the productId already exists in the wishListItems array
  if (user.wishListItems.includes(productId)) {
    return res
      .status(400)
      .json({ message: 'Product already exists in wishlist' })
  }

  // Add the productId to the wishListItems array
  user.wishListItems.push(productId)
  await user.save()

  res.status(200).json({
    message: 'Product added to wishlist successfully',
    updatedWishListItems: user.wishListItems,
  })
})

// desc: remove product id from user's wish list array, route: /api/users/wishlist, access: private, request: DELETE
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' })
  }

  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Check if the productId exists in the wishListItems array
  const index = user.wishListItems.indexOf(productId)

  if (index === -1) {
    return res.status(400).json({ message: 'Product not found in wishlist' })
  }

  // Remove the productId from the wishListItems array
  user.wishListItems.splice(index, 1)
  await user.save()

  res.status(200).json({
    message: 'Product removed from wishlist successfully',
    updatedWishListItems: user.wishListItems,
  })
})

// desc: get all wishlisted items of a particular user, route: /api/users/wislist, access: private , request: GET
const getAllWishlistItems = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const wishlistItemIds = user.wishListItems

  // Fetch products based on the product_link field
  const products = await Product.find({
    product_link: { $in: wishlistItemIds.map((id) => `/p/${id}`) },
  })

  res.status(200).json({ wishListItems: products })
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  addToWishlist,
  removeFromWishlist,
  getAllWishlistItems,
}
