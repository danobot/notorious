import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';
// import {createReducer} from '../utils/utils'
import { createReducer } from '@reduxjs/toolkit'
import { UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE, REMOVE_EDITOR, ADD_EDITOR, TOGGLE_MENU_SHOW_NOTE, TOGGLE_PIN_NOTE } from './noteActions';


const initialState = []
const notesReducer = createReducer(initialState, {
    [CREATE_NOTE]: (state, action) => {
      return [...state, {title: "", createdAt: Date.now(), updatedAt: Date.now(), parent: action.parent, contents:[{"id": 1, markdown: ""}], isNew: true}]
    },
    [DELETE_NOTE]: (state, action) => {
      return state.filter((item) => item._id !== action.noteId)
    },
    [UPDATE_NOTE]: (state, action) => {
      return  state.map((item, id) => {
        if (item._id !== action.id) { return item }
        let extra = {}
        let c = action.attributes
        if (action.attributes.skipUpdatedAt || false) {
        } else {
          c.updatedAt = Date.now()
        }
        delete c.skipUpdatedAt
        return {
          ...item,
          ...c
        }
      })
    },
    [ADD_EDITOR]: (state, action) => {
      return  state.map((item, id) => {
        if (item._id !== action.id) { return item }
        return {
          ...item,
          contents: [
            ...item.contents,
            {
              id: item.contents.length + 1,
              createdAt: Date.now(),
              markdown: ""
            }
          ]
        }
      })
    },
    "@@redux-pouchdb/UPDATE_ARRAY_REDUCER": (state, action) =>{

      if (action.doc.isNew) { //if its a new notesReducer, we want to update it in the state
        console.log("Its a new note", state)
        return state.map((item, index) => {
          if (item._id !== action.doc._id) { return item }

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
    },
    [TOGGLE_PIN_NOTE]: (state, action) => {
      return state.map((note, id) => {
        if (note._id !== action.id) { return note }
        if (note.pinned !== action.pinned)
          return {...note, pinned: action.pinned }
        else
          return note
      })
    },
    [TOGGLE_MENU_SHOW_NOTE]: (state, action) => {
      return state.map((note, id) => {
        if (note._id !== action.id) { return note }
        if (note.showInMenu !== action.showInMenu) {
          return {...note, showInMenu: action.showInMenu }
        } else {
          return note
        }
      })
    }
  }
);

export default persistentCollectionReducer(
  new PouchDB(`${config.db}notes`),
  'notes'
)(notesReducer);
