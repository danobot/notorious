import { Action } from 'redux';
import { SELECT_NOTE } from './actions';
import { createReducer } from '../../utils/utils';
import config from '../../utils/config';
const initialState = {
  selectedNote: config.selectedNote
}

const contentAreaReducer = createReducer(initialState, {
  [SELECT_NOTE]: (state, action) => {
    return {...state, selectedNote: action.id};
  }
  // [SELECT_NOTEBOOK]: (state, action) => {
  //   return {...state, selectedNote: action.id};
  // }

});
export default contentAreaReducer;
