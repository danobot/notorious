import { createReducer } from '../../utils/utils'
import { SEARCH_NOTES, SEARCH_NOTES_RESULTS, SORT_NOTES, SORT_ALPHA } from './actions';


const initialState = {
  visibleNotes: [],
  sorter: SORT_ALPHA
}

const middleMenuReducer = createReducer(initialState, {
  [SEARCH_NOTES]: (state, action) => {
    return {...state, search: action.search}
  },
  [SEARCH_NOTES_RESULTS]: (state, action) => {
    return {...state, visibleNotes: action.results}
  },
  [SORT_NOTES]: (state, action) => {
    return {...state, sorter: action.sorter}
  }

});
export default middleMenuReducer;
