const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Coverly API Documentation',
    version: '1.0.0',
    description:
      'API documentation for Coverly: A Ecommerce platform for mobile back covers.',
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: 'https://coverly-api.vercel.app',
    },
  ],
  basePath: '/api',
}

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Replace with the path to your route files
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options)

module.exports = { swaggerUi, swaggerSpec }
