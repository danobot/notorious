import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';
import {createReducer} from '../utils/utils'
// import { createReducer } from '@reduxjs/toolkit'
import { UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE, REMOVE_EDITOR, ADD_EDITOR, TOGGLE_MENU_SHOW_NOTE, TOGGLE_PIN_NOTE } from './noteActions';
import { notesDB } from '../PouchInit';
import { SELECT_NOTE } from '../containers/ContentAreaCont/actions';


const initialState = []
const notesReducer = createReducer(initialState, {
    [CREATE_NOTE]: (state, action) => {
      const noteId = action.id

      const newState = state.map((note, id) => {
        if (note._id !== action.parent) { return note }
        return {...note, children: [...note.children, noteId]} // add new child to parents `children` array (for easy read operation)
      })
      const newNote = {_id: noteId, title: "", createdAt: Date.now(), updatedAt: Date.now(), parent: action.parent, children: [], schema: "note", content: "", ...action.attributes}
      return [...newState, newNote] // and add new note to array
    },
    [DELETE_NOTE]: (state, action) => {
      // find parent of note to be deleted
      let newState = state.filter(n => n._id !== action.noteId); // remove note to be deleted
      const noteToBeNuked = state.filter(n => n._id === action.noteId)[0]
      console.log("noteToBeNuked: ",noteToBeNuked)
      if (noteToBeNuked.children && noteToBeNuked.children.length > 0) {
        return state // we cannot delete a note with children... what would we do with the children? THINK OF THE CHILDREN!!! D:
      }
      const parent = noteToBeNuked.parent
      console.log("parent: ",parent)
      console.log("parent.children: ",parent.children)
      if (parent !== "root") {
        newState = newState.map((note, id) => {
          if (note._id !== parent) { return note }
          // we found the parent note:
          let splicedChildren = note.children
          const index = splicedChildren.indexOf(noteToBeNuked._id)
          if (index > -1) {
            splicedChildren.splice(index, 1)
          }
          console.log("parent: ",parent)
          return {...note, children: splicedChildren} // remove child entry
        })
      }

      return newState // and add new note to array
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
    [SELECT_NOTE]: (state, action) => { // when we select the note, save its id in the parents lastSelectedChild field
      console.group("SELECT_NOTE in notes reducer")
      console.log("action", action)
      console.groupEnd()
      return  state.map((item, id) => {
        if (item.children && item.children.indexOf(action.id) === -1) { return item }
        console.log("updating", item.title)
        return {
          ...item,
          lastSelectedChild: action.id
        }
      })
    }

  }
);

export default persistentCollectionReducer(
  notesDB,
  'notes'
)(notesReducer);
