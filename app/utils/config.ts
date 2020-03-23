
import isElectron from 'is-electron';
import PouchDB from 'pouchdb';
const Store = require('electron-store');

const store = new Store('config');

const config = require('config');

// Environment setup for React Docker app from:
// https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/


if (!isElectron()) {
  console.log("Web deployment. Using backend URL: ", config)
  console.log("Web deployment. window._env_: ", window._env_)

  if (window._env_.DB_CONNECTION) {
    config.db = window._env_.DB_CONNECTION
  } else {
    console.error("App is not running in electron. DB_CONNECTION environment variable containing the full database connection string must be defined on docker container")
  }
} else {
  const c = store.get('db')
  // const configDB = new PouchDB('data/config');
  // const con = configDB.get("_local/config")
  console.log("Using backend: ", c)
  if (c) {
    config.db = c

  } else {
    config.db = null
  }
}
export default config
export {store}
