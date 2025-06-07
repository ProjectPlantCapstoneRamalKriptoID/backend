const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerConfig = require('../configs/swagger.config');

// Generate docs
const swaggerDocs = swaggerJSDoc(swaggerConfig);

// Serve Swagger UI HTML
router.get('/api-docs', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" rel="stylesheet">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
            url: '/swagger.json',
            dom_id: '#swagger-ui',
          });
        </script>
      </body>
    </html>
  `);
});

// Serve swagger.json
router.get('/swagger.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

module.exports = router;
