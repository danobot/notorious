import { createReducer } from '../../utils/utils'
import { configStorage } from '../../utils/localStorage';
import { SEARCH_NOTES_RESULTS, CACHE_NOTE_PARENT_ID, MOVE_NOTE } from '../../reducers/noteActions';
import { SELECT_NOTEBOOK } from './actions';


const initialState = {
  visibleNotes: [],
  filter: configStorage['selectedNotebook']
}

const mainMenuReducer = createReducer(initialState, {
  [CACHE_NOTE_PARENT_ID]: (state, action) => {
    return {...state, moveNoteDropTargetId: action.id}
  },

  [SELECT_NOTEBOOK]: (state, action) => {
    return {...state, filter: action.filter}
  },
  [SEARCH_NOTES_RESULTS]: (state, action) => {
    if (action.target === "MIDDLE_MENU_SEARCH") {
      console.log("mainMenuReducer state", state)
      console.log("mainMenuReducer action", action)
      return {...state, filter: action.results}
    }
    return state
  }
});
export default mainMenuReducer;
