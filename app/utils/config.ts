
const config = require('config');

if (process.env.BACKEND_HOST) {
  config.db = process.env.BACKEND_HOST
}
export default config
