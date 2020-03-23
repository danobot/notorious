import { persistentDocumentReducer } from 'redux-pouchdb';
import config from '../utils/config';
import {
  SET_CONFIG
} from '../configActions';
import { loadState, saveState } from '../../utils/localStorage';

/**
 * For web deployment, we want to use localstorage to store configuration.
 */
const initialState = loadState() || {}
console.log("configs.web.ts store: ", initialState)

function configReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    case SET_CONFIG:
      const newState = {...state, [action.id]: action.attributes}
      saveState(newState)

      return newState
    default:
      return state
  }

}

export default configReducer;
