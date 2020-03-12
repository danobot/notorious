import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';
import {createReducer} from '../utils/utils'


import { UPDATE_NOTE, CREATE_NOTE } from './noteActions';
const initialState = []
const notesReducer = createReducer(initialState, {
  [CREATE_NOTE]: (state, action) => {
    return [...state, {title: "Untitled", createdAt: Date.now(), updatedAt: Date.now(), notebookId: action.notebookId, isNew: true}]
  },
  [UPDATE_NOTE]: (state, action) => {
    return  state.map((item, id) => {
      if (item._id !== action.id) {
        return item
      }
      return {
        ...item,
        ...action.attributes,
        updatedAt: Date.now()
      }
    })
  },
  "@@redux-pouchdb/UPDATE_ARRAY_REDUCER": (state, action) =>{

    if (action.doc.isNew) { //if its a new notesReducer, we want to update it in the state
      console.log("Its a new note", state)
      return state.map((item, index) => {
        if (item._id !== action.doc._id) {
          // This isn't the item we care about - keep it as-is
          return item
        }
        // this will remove the "new" property and store the rest in newState
        const { isNew, ...newState } = {
          ...item,
          ...action.item
        };

        console.log("state without new", newState)
        // Otherwise, this is the one we want - return an updated value
        return newState
      });
    } else {
      return state
    }
  }
  }
);

export default persistentCollectionReducer(
  new PouchDB(`${config.db}notes`),
  'notes'
)(notesReducer);
