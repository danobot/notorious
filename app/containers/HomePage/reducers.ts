import { createReducer } from '../../utils/utils'
import { SYNC_NOTES_ERROR, SYNC_NOTES_SUCCESS } from './actions';
import { UPDATE_NOTE } from '../../reducers/noteActions';


const initialState = {
  notesSync: "pending"
}

const homePageReducer = createReducer(initialState, {
  [SYNC_NOTES_ERROR]: (state, action) => {
    return {...state, notesSync: "error"}
  },
  [SYNC_NOTES_SUCCESS]: (state, action) => {
    return {...state, notesSync: "success"}
  },
  [UPDATE_NOTE]: (state, action) => {
    return {...state, notesSync: "pending"}
  }

});
export default homePageReducer;
