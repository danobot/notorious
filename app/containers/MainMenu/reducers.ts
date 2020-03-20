import { createReducer } from '../../utils/utils'
import { SELECT_NOTEBOOK, SHOW_NOTEBOOK_MODAL, HIDE_NOTEBOOK_MODAL } from './actions';
import { configStorage } from '../../utils/localStorage';


const initialState = {
  visibleNotes: [],
  nbSelection: configStorage['selectedNotebook'],
  showNotebookModalToggle: false
}

const mainMenuReducer = createReducer(initialState, {
  [SELECT_NOTEBOOK]: (state, action) => {
    return {...state, nbSelection: action.id}

  },
  [SHOW_NOTEBOOK_MODAL]: (state, action) => {
    return {...state, showNotebookModalToggle: true}
  },
  [HIDE_NOTEBOOK_MODAL]: (state, action) => {
    return {...state, showNotebookModalToggle: false}
  }

});
export default mainMenuReducer;
