import { Action } from 'redux';
import { SELECT_NOTE } from './actions';
const initialState = {
  selectedNote: null
}

export default function contentAreaReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    case SELECT_NOTE:
      return {...state, selectedNote: action.id};
    default:
      return state;
  }
}
