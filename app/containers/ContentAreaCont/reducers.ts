import { Action } from 'redux';
import { SELECT_NOTE } from './actions';
import { createReducer } from '../../utils/utils';
import { configStorage } from '../../utils/localStorage';
const initialState = {
  selectedNote: configStorage['selectedNote']
}

const mainMenuReducer = createReducer(initialState, {
  [SELECT_NOTE]: (state, action) => {
    return {...state, selectedNote: action.id};
  },
  "@@redux-pouchdb/UPDATE_ARRAY_REDUCER": (state, action) => { // if newly received note is a new note we want to display it in the editor pane
      if (action.doc.isNew) {
        return {...state, selectedNote: action.doc._id};
      } else {
        return state
      }
  }

});
export default mainMenuReducer;
