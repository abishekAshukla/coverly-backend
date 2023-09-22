const asyncHandler = require('express-async-handler')
const Product = require('../models/ProductSchema')

// desc: get list of products based on brand name with pagination , route: GET /api/products/brand/:brandId?page=pageNumber , access: public
const getByBrand = asyncHandler(async (req, res) => {
  const { brand } = req.params
  const page = parseInt(req.query.page) || 1 // Get the page number from query parameter, default to 1
  const itemsPerPage = 9

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = page * itemsPerPage

  const products = await Product.find({ brand })
    .skip(startIndex)
    .limit(itemsPerPage)

  const totalProducts = await Product.countDocuments({ brand })

  const hasMore = endIndex < totalProducts

  if (!products || products.length === 0) {
    res.status(404)
    throw new Error('Products not found')
  }

  res.status(200).json({
    message: `Get products for ${brand}`,
    products: products,
    currentPage: page,
    hasMore: hasMore,
    itemsLeft: Math.max(0, totalProducts - endIndex),
  })
})

// desc: get list of products based on brand name and model name with pagination , route: GET /api/products/model/:brandId/:modelId , access: public
const getByBrandAndModel = asyncHandler(async (req, res) => {
  const { brand, model } = req.params
  const page = parseInt(req.query.page) || 1 // Get the page number from query parameter, default to 1
  const itemsPerPage = 9

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = page * itemsPerPage

  const products = await Product.find({ brand, model })
    .skip(startIndex)
    .limit(itemsPerPage)

  const totalProducts = await Product.countDocuments({ brand, model })

  const hasMore = endIndex < totalProducts

  if (!products || products.length === 0) {
    res.status(404)
    throw new Error(`No products found for brand ${brand} and model ${model}`)
  }

  res.status(200).json({
    message: `Get products for ${brand} ${model}`,
    products: products,
    currentPage: page,
    hasMore: hasMore,
    itemsLeft: Math.max(0, totalProducts - endIndex),
  })
})

// desc: get a unique product , route: GET /api/products/product/:productId , access: public
const getByProductLink = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const productToFind = `/p/${productId}`
  const product = await Product.findOne({ product_link: productToFind })

  if (!product) {
    res.status(404)
    throw new Error(`Product not found for ${productId}}`)
  }

  res.status(200).json({
    message: `Get product for  ${productId}`,
    product: product,
  })
})

// desc: get list of product ids (product_link) , route: GET /api/products/all-products-ids , access: public
const getAllProductLinks = asyncHandler(async (req, res) => {
  const allProducts = await Product.find()
  if (!allProducts) {
    res.status(404)
    throw new Error(`There was an error fetching product links or ids`)
  }

  const allProductLinks = allProducts.map((product) =>
    product.product_link.replace('/p/', '')
  )

  res.status(200).json({
    message: `fetched product ids successfully`,
    allProductLinks: allProductLinks,
  })
})

module.exports = {
  getByBrand,
  getByBrandAndModel,
  getByProductLink,
  getAllProductLinks,
}
