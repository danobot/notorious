import { persistentDocumentReducer } from 'redux-pouchdb';
// import PouchDB from 'pouchdb'
import config from '../utils/config';
import {
  SET_CONFIG
} from '../configActions';
import { configDB } from '../PouchInit';
const Store = require('electron-store');
/**
 * For Electron deployment, wewant to use electron-store to store configuration.
 */
const store = new Store('config');
const c = store.store
console.log("configs.electron.ts store: ", c)
const initialState = c || {}
// const initialState =  {"_id": "_local/config"}

function configReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    case SET_CONFIG:
      const newState = {...state, [action.id]: action.attributes} // leave it, it works.
      store.set(action.id, action.attributes)

      return newState
    default:
      return state
  }

}

// export default persistentDocumentReducer(
//   configDB,
//   'configs'
// )(configReducer);
export default configReducer;
