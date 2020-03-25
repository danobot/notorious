import { createReducer } from '../utils/utils'
import { SHOW_NOTEBOOK_MODAL, HIDE_NOTEBOOK_MODAL } from './modalActions';

const initialState = {
  showNotebookModalToggle: false
}

const modalReducer = createReducer(initialState, {
  [SHOW_NOTEBOOK_MODAL]: (state, action) => {
    return {...state, showNotebookModalToggle: true}
  },
  [HIDE_NOTEBOOK_MODAL]: (state, action) => {
    return {...state, showNotebookModalToggle: false}
  }

});
export default modalReducer;
