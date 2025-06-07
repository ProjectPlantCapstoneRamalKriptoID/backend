const schema = require('../swagger/shema.swagger');

const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Ramal Kripto API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development',
      },
      {
        url: 'https://dicoding-capstone-backend.vercel.app',
        description: 'Production',
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
      schemas: schema,
    },
  },
  apis: ['./src/swagger/*.js', './src/routes/*.js'],
};

module.exports = swaggerConfig;
