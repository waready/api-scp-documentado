'use strict';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sample API',
    description: '',
    version: '1.0.0',
    contact: {
      email: 'name@gmail.com'
    }
  },
  
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },  
  },
  security: [{
    bearerAuth: []
  }]
};

module.exports = {
  enable: true,
  specUrl: '/swagger.json',

  options: {
    swaggerDefinition: swaggerDefinition,
    // Incluir rutas de controladores en la documentación Swagger
    apis: [ 
      'app/Controllers/Http/AuthController.js',
      'app/Controllers/Http/CategoryController.js',
      'app/Controllers/Http/ItemScpController.js',
      'start/routes.js'
    ]
  }
};
