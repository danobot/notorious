import { createReducer } from '../../utils/utils'
import { SELECT_NOTEBOOK, SELECT_NOTES_FILTER, HIDE_NOTEBOOK_MODAL } from './actions';
import { configStorage } from '../../utils/localStorage';
import { CREATE_NOTEBOOK } from '../../reducers/notebookActions';
import { SEARCH_NOTES_RESULTS } from '../MiddleMenu/actions';


const initialState = {
  visibleNotes: [],
  filter: configStorage['selectedNotebook']
}

const mainMenuReducer = createReducer(initialState, {
  [SELECT_NOTEBOOK]: (state, action) => {
    return {...state, filter: action.filter}
  },
  [SEARCH_NOTES_RESULTS]: (state, action) => {
    console.log("mainMenuReducer state", state)
    console.log("mainMenuReducer action", action)
    return {...state, filter: action.results}
  }

});
export default mainMenuReducer;
