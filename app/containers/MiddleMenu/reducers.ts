import { createReducer } from '../../utils/utils'
import { SORT_ALPHA, SORT_NOTES } from './actions';

import { SELECT_NOTEBOOK } from '../MainMenu/actions';
import {
  GLOBAL_SEARCH,
  SEARCH_NOTES_RESULTS
} from '../../reducers/noteActions';

const initialState = {
  visibleNotes: [],
  sorter: SORT_ALPHA
}

const middleMenuReducer = createReducer(initialState, {
  [SEARCH_NOTES_RESULTS]: (state, action) => {
    if (action.target === "MIDDLE_MENU_SEARCH") {
      return {...state, visibleNotes: action.results,  search: action.search}
    }
    return state
  },
  [SORT_NOTES]: (state, action) => {
    return {...state, sorter: action.sorter}
  },
  [SELECT_NOTEBOOK]: (state, action) => {
    return {...state, search: null}
  },
});
export default middleMenuReducer;
