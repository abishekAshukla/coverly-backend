const express = require('express')
const {
  registerUser,
  loginUser,
  currentUser,
  addToWishlist,
  removeFromWishlist,
  getAllOrdersOfUser,
  getAllWishlistItems,
} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')
const {
  addToCart,
  updateCartQuantity,
  getAllCartItems,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: APIs related to user management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             example: { "_id": "user_id", "email": "user@example.com" }
 *       400:
 *         description: Bad request, missing fields or user already exists.
 */
router.route('/register').post(registerUser)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login an existing user.
 *     description: Login an existing user with the provided email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             example: { "accessToken": "jwt_token", "firstName": "User", "lastName": "Example", "email": "user@example.com", "wishListItems": [], "noItemsInCart": 0 }
 *       400:
 *         description: Bad request, missing fields.
 *       401:
 *         description: Unauthorized, email or password is not valid.
 *     security: []
 */
router.route('/login').post(loginUser)

/**
 * @swagger
 * /api/users/currentuser:
 *   get:
 *     summary: Get current user information.
 *     description: Retrieve information about the currently authenticated user.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: Content-Type
 *         in: header
 *         description: Request Content Type
 *         required: true
 *         schema:
 *           type: string
 *           default: application/json
 *     responses:
 *       200:
 *         description: Current user information.
 *         content:
 *           application/json:
 *             example: { "email": "user@example.com", "id": "user_id" }
 *       401:
 *         description: Unauthorized, user not authenticated.
 */
router.get('/currentuser', validateToken, currentUser)

/**
 * @swagger
 * /api/users/wishlist:
 *   post:
 *     summary: Add a product ID to the user's wishlist.
 *     description: >-
 *       // desc: Add product id into user's wishlist array
 *       // route: /api/users/wishlist
 *       // access: private
 *       // request: POST
 *       This endpoint allows a user to add a product ID to their wishlist.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: >-
 *                   // desc: The ID of the product to be added to the wishlist
 *                   example: "12345"
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: Current user information.
 *         content:
 *           application/json:
 *             example: { "message": "Product added to wishlist successfully", "updatedWishListItems": ["12345", "67890"] }
 *       400:
 *         description: Bad request - Missing or invalid productId.
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 *       409:
 *         description: Conflict - Product already exists in the wishlist.
 */
router.post('/wishlist', validateToken, addToWishlist)

/**
 * @swagger
 * /api/users/wishlist:
 *   delete:
 *     summary: Remove a product ID from the user's wishlist.
 *     description: >-
 *       // desc: Remove product id from user's wish list array
 *       // route: /api/users/wishlist
 *       // access: private
 *       // request: DELETE
 *       This endpoint allows a user to remove a product ID from their wishlist.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: >-
 *                   // desc: The ID of the product to be removed from the wishlist
 *                   example: "12345"
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully.
 *         content:
 *           application/json:
 *             example: { "message": "Product removed from wishlist successfully", "updatedWishListItems": ["67890"] }
 *       400:
 *         description: Bad request - Missing or invalid productId.
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 */
router.delete('/wishlist', validateToken, removeFromWishlist)

/**
 * @swagger
 * /api/users/wishlist:
 *   get:
 *     summary: Get all wishlisted items of a particular user.
 *     description: >-
 *       // desc: Get all wishlisted items of a particular user.
 *       // route: /api/users/wishlist
 *       // access: private
 *       // request: GET
 *       This endpoint allows a user to retrieve all the wishlisted items of a particular user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of wishlisted items.
 *         content:
 *           application/json:
 *             example: { "wishListItems": [{ "name": "Product 1", "price": 19.99 }, { "name": "Product 2", "price": 29.99 }] }
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.get('/wishlist', validateToken, getAllWishlistItems)

/**
 * @swagger
 * /api/users/cart:
 *   post:
 *     summary: Add a product to the user's cart with quantity.
 *     description: >-
 *       // desc: Add product to user's cart with quantity
 *       // route: /api/users/cart
 *       // access: private
 *       // request: POST
 *       This endpoint allows a user to add a product to their cart with a specified quantity.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: >-
 *                   // desc: The ID of the product to be added to the cart
 *                   example: "12345"
 *               quantity:
 *                 type: integer
 *                 description: >-
 *                   // desc: The quantity of the product to be added to the cart
 *                   example: 2
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             example: { "message": "Product added to cart successfully", "cartItems": [{ "productId": "12345", "quantity": 2 }] }
 *       400:
 *         description: Bad request - Missing or invalid product or quantity.
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.post('/cart', validateToken, addToCart)

/**
 * @swagger
 * /api/users/cart:
 *   put:
 *     summary: Update the product quantity in the user's cart.
 *     description: >-
 *       // desc: Update product quantity in user's cart
 *       // route: /api/users/cart
 *       // access: private
 *       // request: PUT
 *       This endpoint allows a user to update the quantity of a product in their cart.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: >-
 *                   // desc: The ID of the product to be updated in the cart
 *                   example: "12345"
 *               quantity:
 *                 type: integer
 *                 description: >-
 *                   // desc: The new quantity of the product in the cart
 *                   example: 3
 *             required:
 *               - productId
 *               - quantity
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *         content:
 *           application/json:
 *             example: { "message": "Cart updated successfully" }
 *       400:
 *         description: Bad request - Missing or invalid product or quantity.
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.put('/cart', validateToken, updateCartQuantity)

/**
 * @swagger
 * /api/users/cart:
 *   get:
 *     summary: Get all items in the user's cart.
 *     description: >-
 *       // desc: Get all items in user's cart
 *       // route: /api/users/cart
 *       // access: private
 *       // request: GET
 *       This endpoint allows a user to retrieve all the items in their cart.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of items in the user's cart.
 *         content:
 *           application/json:
 *             example: { "cartItems": [{ "productId": "12345", "quantity": 3, "product": { "name": "Product 1", "price": 19.99 } }] }
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.get('/cart', validateToken, getAllCartItems)

/**
 * @swagger
 * /api/users/cart:
 *   delete:
 *     summary: Remove a product from the user's cart.
 *     description: >-
 *       // desc: Remove a product from user's cart
 *       // route: /api/users/cart
 *       // access: private
 *       // request: DELETE
 *       This endpoint allows a user to remove a product from their cart.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: >-
 *                   // desc: The ID of the product to be removed from the cart
 *                   example: "12345"
 *             required:
 *               - productId
 *     responses:
 *       200:
 *         description: Product removed from cart successfully.
 *         content:
 *           application/json:
 *             example: { "message": "Product removed from cart successfully", "cartItems": [] }
 *       400:
 *         description: Bad request - Missing or invalid product ID.
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.delete('/cart', validateToken, removeFromCart)

/**
 * @swagger
 * /api/users/clearcart:
 *   delete:
 *     summary: Clear the user's cart.
 *     description: >-
 *       // desc: Clear user's cart
 *       // route: /api/users/clearcart
 *       // access: private
 *       // request: DELETE
 *       This endpoint allows a user to clear all items from their cart.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Cart cleared successfully.
 *         content:
 *           application/json:
 *             example: { "message": "Cart cleared successfully", "cartItems": [] }
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.delete('/clearcart', validateToken, clearCart)

/**
 * @swagger
 * /api/users/orders:
 *   get:
 *     summary: Get all orders of a particular user.
 *     description: >-
 *       // desc: Get all orders of a particular user.
 *       // route: /api/users/orders
 *       // access: private
 *       // request: GET
 *       This endpoint allows a user to retrieve all their orders.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of user's orders.
 *         content:
 *           application/json:
 *             example: { "orders": [{ "orderNumber": "12345", "totalAmount": 99.99 }, { "orderNumber": "67890", "totalAmount": 49.99 }] }
 *       401:
 *         description: Unauthorized - Authentication token is missing or invalid.
 *       404:
 *         description: User not found - The user associated with the token was not found.
 */
router.get('/orders', validateToken, getAllOrdersOfUser)

module.exports = router
