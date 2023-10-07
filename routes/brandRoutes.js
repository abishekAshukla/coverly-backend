const express = require('express')
const router = express.Router()
const {
  getBrands,
  getBrandsWithModels,
} = require('../controllers/brandsController')

/**
 * @swagger
 * tags:
 *   - name: Brands
 *     description: APIs related to brands and models of mobile phones
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get a list of unique brand names.
 *     description: Retrieve a list of unique brand names from the database.
 *     tags:
 *       - Brands
 *     security: []
 *     responses:
 *       200:
 *         description: A JSON array containing unique brand names.
 *         content:
 *           application/json:
 *             example: ["Brand1", "Brand2"]
 *       404:
 *         description: No brands found in the database.
 */
router.route('/').get(getBrands)

/**
 * @swagger
 * /api/brands/models:
 *   get:
 *     summary: Get a list of unique brand and model name pairs.
 *     description: Retrieve a list of all unique brand and model name pairs from the database.
 *     tags:
 *       - Brands
 *     security: []
 *     responses:
 *       200:
 *         description: A list of unique brand and model name pairs.
 */
router.route('/models').get(getBrandsWithModels)

module.exports = router
