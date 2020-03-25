import { Action } from 'redux';
import { SELECT_NOTE } from './actions';
import { createReducer } from '../../utils/utils';
import { configStorage } from '../../utils/localStorage';
import { CREATE_NOTE } from '../../reducers/noteActions';
const initialState = {
  selectedNote: configStorage['selectedNote']
}

const contentAreaReducer = createReducer(initialState, {
  [SELECT_NOTE]: (state, action) => {
    return {...state, selectedNote: action.id};
  }
  // [CREATE_NOTE]: (state, action) => {
  //   return {...state, selectedNote: action.id};
  // }

});
export default contentAreaReducer;
