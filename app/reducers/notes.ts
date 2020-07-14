import { persistentCollectionReducer } from 'redux-pouchdb';
import PouchDB from 'pouchdb'
import config from '../utils/config';
import {createReducer, removeNoteFromParentsChildArray, updateNoteAttributesInArray, addChildToParent} from '../utils/utils'
// import { createReducer } from '@reduxjs/toolkit'
import { UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE, REMOVE_EDITOR, ADD_EDITOR, TOGGLE_MENU_SHOW_NOTE, TOGGLE_PIN_NOTE, ADD_ATTACHMENT, MOVE_NOTE} from './noteActions';
import { notesDB } from '../PouchInit';
import { SELECT_NOTE } from '../containers/ContentAreaCont/actions';
import { findChildrenOfNoteInclDeleted } from '../containers/MainMenu/selectors'

const initialState = []
const notesReducer = createReducer(initialState, {

    [CREATE_NOTE]: (state, action) => {
      const noteId = action.id

      const newState = addChildToParent(newState, action.id, action.parent)
      const newNote = {_id: noteId,
        title: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        parent: action.parent,
        children: [],
        schema: "note",
        content: "",
        editor: config.defaultEditor || "markdown",
        ...action.attributes
      }
      return [...newState, newNote] // and add new note to array
    },
    [DELETE_NOTE]: (state, action) => {
      // find parent of note to be deleted
      let newState = state.filter(n => n._id !== action.noteId); // remove note to be deleted
      const noteToBeNuked = state.filter(n => n._id === action.noteId)[0]
      console.log("noteToBeNuked: ",noteToBeNuked)
      if (noteToBeNuked.children && noteToBeNuked.children.length > 0) {
        return state // we cannot delete a note with children... what would we do with the children? THINK OF THE CHILDREN!!! D:

        // unless all of the children are also marked as deleted
        // const children = state.filter(n => n.parent === noteToBeNuked._id)
        // console.log("Children note objects", children)

        // const allChildrenAreDeleted = children.filter(c => c.deleted).length === children.length
        // if (allChildrenAreDeleted) {
        //   console.log("Children have been deleted", children)
        // } else {
        //   return state
        // }
      }
      newState = removeNoteFromParentsChildArray(newState, noteToBeNuked)

      return newState // and add new note to array
    },
    [UPDATE_NOTE]: (state, action) => {
      console.log(action)

      return updateNoteAttributesInArray(newState, action.id, action.attributes)

    },
    [MOVE_NOTE]: (state, action) => {
      const noteToBeMoved = state.filter(n => n._id === action.id)[0]
      let newState = removeNoteFromParentsChildArray(state, noteToBeMoved )
      newState = addChildToParent(newState, action.id, action.parent)
      newState = updateNoteAttributesInArray(newState, action.id, {parent: action.parent})
      return newState


    },
    [SELECT_NOTE]: (state, action) => { // when we select the note, save its id in the parents lastSelectedChild field
      console.group("SELECT_NOTE in notes reducer")
      console.log("action", action)
      console.groupEnd()
      return  state.map((item, id) => {
        if (item.children && item.children.indexOf(action.id) === -1) { return item }
        console.log("updating", item.title)
        let newState = item
        // if (!item.deleted) { // unless we are selecting the note in the Trash, set last selected child
        // }
        newState.lastSelectedChild = action.id
        return newState
      })
    }


  }
);

export default persistentCollectionReducer(
  notesDB,
  'notes'
)(notesReducer);
