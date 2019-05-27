var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/"'
  // API_URL: '"http://188.166.84.218:3000/"'
});
