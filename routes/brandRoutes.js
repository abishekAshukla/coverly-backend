const express = require('express')
const router = express.Router()
const {
  getBrands,
  getBrandsWithModels,
} = require('../controllers/brandsController')

router.route('/').get(getBrands)
router.route('/models').get(getBrandsWithModels)

module.exports = router
