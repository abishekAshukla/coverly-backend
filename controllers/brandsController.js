const asyncHandler = require('express-async-handler')
const Brand = require('../models/BrandSchema')

// desc: get list of unique brand names, route: GET /api/brands , access: public
const getBrands = asyncHandler(async (req, res) => {
  const allBrands = await Brand.find()

  if (!allBrands || allBrands.length === 0) {
    res.status(404)
    throw new Error('No brands found.')
  }

  // Extract all brand names from each brand document
  const brandNames = allBrands.map((brand) => brand.brandName)

  // Remove duplicate brand names
  const uniqueBrandNames = [...new Set(brandNames)]

  res.status(200).json(uniqueBrandNames)
})

// desc: get list of unique brand names and model names, route: GET /api/brands/models, access: public
const getBrandsWithModels = asyncHandler(async (req, res) => {
  const allBrands = await Brand.find()

  if (!allBrands || allBrands.length === 0) {
    res.status(404)
    throw new Error('No brands found.')
  }

  const brandModelPairs = []

  // Iterate through each brand document and extract brand and model names
  allBrands.forEach((brand) => {
    brand.modelName.forEach((modelName) => {
      brandModelPairs.push({
        brandName: brand.brandName,
        modelName: modelName,
      })
    })
  })

  res.status(200).json(brandModelPairs)
})

module.exports = {
  getBrands,
  getBrandsWithModels,
}
