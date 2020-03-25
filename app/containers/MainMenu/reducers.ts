import { createReducer } from '../../utils/utils'
import { SELECT_NOTEBOOK, SELECT_NOTES_FILTER, HIDE_NOTEBOOK_MODAL } from './actions';
import { configStorage } from '../../utils/localStorage';
import { CREATE_NOTEBOOK } from '../../reducers/notebookActions';


const initialState = {
  visibleNotes: [],
  filter: configStorage['selectedNotebook']
}

const mainMenuReducer = createReducer(initialState, {
  [SELECT_NOTEBOOK]: (state, action) => {
    return {...state, filter: action.filter}
  }

});
export default mainMenuReducer;
