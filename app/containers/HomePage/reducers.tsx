// import { persistentDocumentReducer } from 'redux-pouchdb';
// import PouchDB from 'pouchdb'
// import config from '../../utils/config';
import {
  RESIZE_SIDEBAR,
  RESIZE_MAIN_MENU,
  RESIZE_MIDDLE_MENU
} from './actions';

const initialState = {
  sizeMain: 85,
  sizeMiddle: 70,
  sizeSidebar: 20
}

function configReducer(state = initialState, action: Action<string>) {
  console.log(action.type)
  switch (action.type) {
    case RESIZE_SIDEBAR:
      return {...state, sizeSidebar: action.size}
    case RESIZE_MAIN_MENU:
      return {...state, sizeMain: action.size}
    case RESIZE_MIDDLE_MENU:
      return {...state, sizeMiddle: action.size}
    // case '@@redux-pouchdb/SET_OBJECT_REDUCER':
    //   return action.state
    // would need to check if state.config is different to current state, if it is return action.state.config
    default:
      return state.settings ? state.settings : state;
  }

}
export default configReducer;
