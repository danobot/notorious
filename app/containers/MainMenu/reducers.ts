import { createReducer } from '../../utils/utils'
import { SELECT_NOTEBOOK } from './actions';
import { configStorage } from '../../utils/localStorage';


const initialState = {
  visibleNotes: [],
  nbSelection: configStorage['selectedNotebook']
}

const mainMenuReducer = createReducer(initialState, {
  [SELECT_NOTEBOOK]: (state, action) => {
    return {...state, nbSelection: action.id}

  }

});
export default mainMenuReducer;
