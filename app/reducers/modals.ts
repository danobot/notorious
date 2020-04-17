import { createReducer } from '../utils/utils'
import {
  SHOW_NOTEBOOK_MODAL,
  HIDE_NOTEBOOK_MODAL,
  SHOW_GENERIC_MODAL,
  HIDE_GENERIC_MODAL
 } from './modalActions';
import { GLOBAL_SEARCH, SEARCH_NOTES_RESULTS } from './noteActions';

const initialState = {
  showNotebookModalToggle: false,
  finderModalToggle: false,
  finderModalData: null
}

const modalReducer = createReducer(initialState, {
  [SHOW_NOTEBOOK_MODAL]: (state, action) => {
    return {...state, showNotebookModalToggle: true, showNotebookData: action.attributes}
  },
  [HIDE_NOTEBOOK_MODAL]: (state, action) => {
    return {...state, showNotebookModalToggle: false, showNotebookData: null}
  },
  [SHOW_GENERIC_MODAL]: (state, action) => {
    return {...state, ...action}
  },
  [HIDE_GENERIC_MODAL]: (state, action) => {
    return {...state, ...action}
  },
  [SEARCH_NOTES_RESULTS]: (state, action) => {
    if (action.target === GLOBAL_SEARCH) {
      return {...state, finderModalData: {results: action.orderedResults, search: action.search }}
    }
    return state
  },

});
export default modalReducer;
