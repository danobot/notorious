import { Action } from 'redux';
import { SELECT_NOTE } from './actions';
import { createReducer } from '../../utils/utils';
import { configStorage } from '../../utils/localStorage';
const initialState = {
  selectedNote: configStorage['selectedNote']
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
