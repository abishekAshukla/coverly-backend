const express = require('express')
const router = express.Router()
const {
  getByBrand,
  getByBrandAndModel,
  getByProductLink,
  getAllProductLinks,
} = require('../controllers/productsController')

router.route('/brand/:brand').get(getByBrand)
router.route('/model/:brand/:model').get(getByBrandAndModel)
router.route('/product/:productId').get(getByProductLink)
router.route('/all-products-ids').get(getAllProductLinks)

module.exports = router
