import { createReducer } from '../../utils/utils'
import { SEARCH_NOTES, SEARCH_NOTES_RESULTS } from './actions';


const initialState = {
  visibleNotes: []
}

const middleMenuReducer = createReducer(initialState, {
  [SEARCH_NOTES]: (state, action) => {
    console.log("middleMenuReducer state", state)
    console.log("middleMenuReducer action", action)
    return {...state, search: action.search}
  },
  [SEARCH_NOTES_RESULTS]: (state, action) => {
    console.log("middleMenuReducer state", state)
    console.log("middleMenuReducer action", action)
    return {...state, visibleNotes: action.results}
  }

});
export default middleMenuReducer;
