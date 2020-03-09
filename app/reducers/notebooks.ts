import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';

const initialState = []
function notebooksReducer(state = initialState, action: Action<string>) {
  switch (action.type) {
    default:
      return state;
  }

}
export default persistentCollectionReducer(
  new PouchDB(`${config.db}notebooks`),
  'notebooks'
)(notebooksReducer);
