import { persistentDocumentReducer } from 'redux-pouchdb';
// import PouchDB from 'pouchdb'
import config from '../utils/config';
import {
  SET_CONFIG
} from './configActions';
import { loadState, saveState } from '../utils/localStorage';
import { configDB } from '../PouchInit';

const initialState = loadState() || {}
// const initialState =  {"_id": "_local/config"}

function configReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    case SET_CONFIG:
      const newState = {...state, [action.id]: action.attributes}
      // saveState(newState)
      return newState
    // case '@@redux-pouchdb/SET_OBJECT_REDUCER':
    //   return action.state
    default:
      return state
  }

}

// export default persistentDocumentReducer(
//   configDB,
//   'configs'
// )(configReducer);
export default configReducer;
