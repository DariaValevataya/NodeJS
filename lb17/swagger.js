const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpecs = swaggerJsDoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Phone API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./17-01.js'],//где свагеру искать документацию API
  }) 
module.exports=swaggerSpecs;