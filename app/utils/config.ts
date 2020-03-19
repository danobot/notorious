
import isElectron from 'is-electron';
const config = require('config');
const Store = require('electron-store');

const store = new Store('config');
if (!isElectron()) {
  console.log("is not electron")

  if (  process.env.DB_CONNECTION) {
    config.db = process.env.DB_CONNECTION

  } else {
    console.error("App is not running in electron. DB_CONNECTION environment variable containing the full database connection string must be defined on docker container")
  }
} else {
  console.log("is electron")

  const c = store.get('db')
  console.log("electron store : config: ", c)
  if (c) {
    config.db = c

  } else {
    config.db = null
  }
}
export default config
export {store}
