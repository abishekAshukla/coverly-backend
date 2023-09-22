const express = require('express')
const {
  registerUser,
  loginUser,
  currentUser,
  addToWishlist,
  removeFromWishlist,
  getAllWishlistItems,
} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')
const {
  addToCart,
  updateCartQuantity,
  getAllCartItems,
  removeFromCart,
} = require('../controllers/cartController')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.get('/currentuser', validateToken, currentUser)
router.post('/wishlist', validateToken, addToWishlist)
router.delete('/wishlist', validateToken, removeFromWishlist)
router.get('/wishlist', validateToken, getAllWishlistItems)
router.post('/cart', validateToken, addToCart)
router.put('/cart', validateToken, updateCartQuantity)
router.get('/cart', validateToken, getAllCartItems)
router.delete('/cart', validateToken, removeFromCart)

module.exports = router
