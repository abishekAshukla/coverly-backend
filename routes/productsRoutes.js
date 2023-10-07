const express = require('express')
const router = express.Router()
const {
  getByBrand,
  getByBrandAndModel,
  getByProductLink,
  getAllProductLinks,
  searchProducts,
} = require('../controllers/productsController')

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: APIs for getting product lists based on different parameters
 */

/**
 * @swagger
 * /api/products/brand/{brandId}:
 *   get:
 *     summary: Get a list of products based on brand name with pagination.
 *     description: >-
 *       // desc: Get list of products based on brand name with pagination
 *       // route: GET /api/products/brand/{brandId}?page=pageNumber
 *       // access: public
 *       // request: GET
 *       This endpoint allows users to retrieve a list of products based on a brand name with pagination.
 *     tags:
 *       - Products
 *     security: []
 *     parameters:
 *       - name: brandId
 *         in: path
 *         required: true
 *         description: Brand ID to filter products.
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination. Defaults to 1.
 *     responses:
 *       200:
 *         description: List of products based on brand name with pagination.
 *         content:
 *           application/json:
 *             example: { "message": "Get products for BrandName", "products": [...], "currentPage": 1, "hasMore": true, "itemsLeft": 10 }
 *       404:
 *         description: Products not found - No products found for the specified brand.
 */
router.route('/brand/:brand').get(getByBrand)

/**
 * @swagger
 * /api/products/model/{brandId}/{modelId}:
 *   get:
 *     summary: Get a list of products based on brand name and model name with pagination.
 *     description: >-
 *       // desc: Get list of products based on brand name and model name with pagination
 *       // route: GET /api/products/model/{brandId}/{modelId}?page=pageNumber
 *       // access: public
 *       // request: GET
 *       This endpoint allows users to retrieve a list of products based on a brand name and model name with pagination.
 *     tags:
 *       - Products
 *     security: []
 *     parameters:
 *       - name: brandId
 *         in: path
 *         required: true
 *         description: Brand ID to filter products.
 *       - name: modelId
 *         in: path
 *         required: true
 *         description: Model ID to filter products.
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination. Defaults to 1.
 *     responses:
 *       200:
 *         description: List of products based on brand name and model name with pagination.
 *         content:
 *           application/json:
 *             example: { "message": "Get products for BrandName ModelName", "products": [...], "currentPage": 1, "hasMore": true, "itemsLeft": 10 }
 *       404:
 *         description: No products found - No products found for the specified brand and model.
 */
router.route('/model/:brand/:model').get(getByBrandAndModel)

/**
 * @swagger
 * /api/products/product/{productId}:
 *   get:
 *     summary: Get a unique product by product ID.
 *     description: >-
 *       // desc: Get a unique product by product ID
 *       // route: GET /api/products/product/{productId}
 *       // access: public
 *       // request: GET
 *       This endpoint allows users to retrieve a unique product by its product ID.
 *     tags:
 *       - Products
 *     security: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID to retrieve a specific product.
 *     responses:
 *       200:
 *         description: Unique product information.
 *         content:
 *           application/json:
 *             example: { "message": "Get product for ProductId", "product": {...} }
 *       404:
 *         description: Product not found - The specified product ID was not found.
 */
router.route('/product/:productId').get(getByProductLink)

/**
 * @swagger
 * /api/products/all-products-ids:
 *   get:
 *     summary: Get a list of all product IDs (product_link).
 *     description: >-
 *       // desc: Get list of product IDs (product_link)
 *       // route: GET /api/products/all-products-ids
 *       // access: public
 *       // request: GET
 *       This endpoint allows users to retrieve a list of all product IDs (product_link).
 *     tags:
 *       - Products
 *     security: []
 *     responses:
 *       200:
 *         description: List of all product IDs.
 *         content:
 *           application/json:
 *             example: { "message": "Fetched product IDs successfully", "allProductLinks": [...] }
 *       404:
 *         description: Products not found - There was an error fetching product IDs.
 */
router.route('/all-products-ids').get(getAllProductLinks)

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products by brand, model, or product name with pagination.
 *     description: >-
 *       // desc: Search products by brand, model, or product name with pagination
 *       // route: GET /api/products/search?query=yourQuery&page=pageNumber
 *       // access: public
 *       // request: GET
 *       This endpoint allows users to search for products by brand, model, or product name with pagination.
 *     tags:
 *       - Products
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: The search query to filter products by brand, model, or product name.
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination. Defaults to 1.
 *     security: []
 *     responses:
 *       200:
 *         description: List of products matching the search query with pagination.
 *         content:
 *           application/json:
 *             example: { "message": "Search products for YourQuery", "products": [...], "currentPage": 1, "hasMore": true, "itemsLeft": 10 }
 *       404:
 *         description: No products found - No products matched the search query.
 *       500:
 *         description: Server error - An error occurred while processing the request.
 */

router.route('/search').get(searchProducts)

module.exports = router
