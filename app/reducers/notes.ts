import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';
import { UPDATE_NOTE_CONTENT } from './noteActions';

const initialState = []
function notesReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    case UPDATE_NOTE_CONTENT:
     return  state.map((item, id) => {
        if (item._id !== action.id) {
          return item
        }
        return {
          ...item,
          ...action.attributes
        }
      })
    default:
      return state;
  }

}
export default persistentCollectionReducer(
  new PouchDB(`${config.db}notes`),
  'notes'
)(notesReducer);
