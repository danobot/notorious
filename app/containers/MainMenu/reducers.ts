import { Action } from 'redux';
import { SELECT_NOTEBOOK } from './actions';
const initialState = {
  visibleNotes: [],
  nbSelection: null
}
export default function mainMenuReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    case SELECT_NOTEBOOK:
      return {...state, nbSelection: action.id};
    default:
      return state;
  }
}
