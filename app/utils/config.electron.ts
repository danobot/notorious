// this electron implementation is served by webpack by default using alias in webpack.config.base.js
const config = {}

// Environment setup for React Docker app from:
// https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/



const Store = require('electron-store');

const store = new Store('config');

const c = store.get('db')
// const configDB = new PouchDB('data/config');
// const con = configDB.get("_local/config")
console.log("Using backend: ", c)
if (c) {
  config.db = c

} else {
  config.db = null
}
export default config
