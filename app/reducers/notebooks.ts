import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';
import {createReducer} from '../utils/utils'
import { CREATE_NOTEBOOK } from './notebookActions';

const initialState = []
const notebooksReducer = createReducer(initialState, {

    [CREATE_NOTEBOOK]: (state, action) => {
      return [...state, action.attributes]
    }

  }

)
export default persistentCollectionReducer(
  new PouchDB(`${config.db}notebooks`),
  'notebooks'
)(notebooksReducer);
