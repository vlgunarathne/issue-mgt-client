const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/issues',
    createProxyMiddleware({
      target: 'http://localhost:3001/issues',
      changeOrigin: true,
    })
  );
}; 