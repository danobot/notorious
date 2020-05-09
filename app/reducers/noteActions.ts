import { GetState, Dispatch } from '../../reducers/types';
import { v4 as uuid } from 'uuid';
import { selectNoteAction } from '../containers/ContentAreaCont/actions';
import {notesDB} from '../PouchInit'
import FlexSearch from 'flexsearch';
import MiddleMenu from '../components/MiddleMenu/MiddleMenu';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SAVE_ATTACHMENT = 'ADD_ATTACHMENT';
export const SAVE_ATTACHMENT_SUCCESS = 'SAVE_ATTACHMENT_SUCCESS';
export const SAVE_ATTACHMENT_ERROR = 'SAVE_ATTACHMENT_ERROR';
export const DELETE_ATTACHMENT= 'DELETE_ATTACHMENT';
export const DELETE_ATTACHMENT_SUCCESS = 'DELETE_ATTACHMENT_SUCCESS';
export const DELETE_ATTACHMENT_ERROR = 'DELETE_ATTACHMENT_ERROR';
export const SOFT_DELETE_NOTE = 'SOFT_DELETE_NOTE';
export const EMPTY_TRASH = 'EMPTY_TRASH';

export const SEARCH_NOTES = 'SEARCH_NOTES';
export const SEARCH_NOTES_RESULTS = 'SEARCH_NOTES_RESULTS';
export const GLOBAL_SEARCH = 'GLOBAL_SEARCH';

export function updateNote(id: string, attributes: string) {
  return dispatch => {
    dispatch({
      type: UPDATE_NOTE,
      id,
      attributes
    });
  };
}
export function emptyTrash() {
  return (dispatch: Dispatch, getState) => {
    const state = getState()
    state.notes.filter(n => n.deleted).map(n=> {
      dispatch(deleteNote(n._id))
    })
    dispatch({
      type: EMPTY_TRASH
    });
  };
}

export function createNote(parent: string, attributes: object) {
  const noteId = uuid()
  return dispatch => {
    dispatch(selectNoteAction(noteId))
    dispatch({
      type: CREATE_NOTE,
      id: noteId,
      parent,
      attributes
    });
  };
}

/** Called by create notebook action because the ID must be genreated there. */
export function createNoteWithId(id: string, parent: string, attributes: object) {

  return dispatch => {
    // dispatch(selectNoteAction(id))
    dispatch({
      type: CREATE_NOTE,
      id,
      parent,
      attributes
    });
  };
}

export function deleteNote(noteId: string) {
  return dispatch => {
    dispatch({
      type: DELETE_NOTE,
      noteId
    });
  };
}
export function softDeleteNote(noteId: string) {
  return dispatch => {
    dispatch(updateNote(noteId, {deleted: true}));
  };
}
export function restoreNote(noteId: string) {
  return dispatch => {
    dispatch(updateNote(noteId, {deleted: false}));
  };
}

export function addAttachment(note: string, noteRev: string, attachmentId: string, content_type: string, buffer: Buffer) {
  return (dispatch: Dispatch) => {
    // var attachment = new Buffer(['Is there life on Mars?'], {type: 'text/plain'});
    notesDB.putAttachment(note, attachmentId, noteRev, buffer, content_type).then(result => {
      // console.log("addAttachment", result)
      dispatch({
        type: SAVE_ATTACHMENT_SUCCESS,
        ...result
      });
    }).catch(e=>{
      console.log("SAVE_ATTACHMENT_ERROR", e)
      dispatch({
        type: SAVE_ATTACHMENT_ERROR,
        ...e
      });
    })

    dispatch({
      type: SAVE_ATTACHMENT,
      note,
      attachmentId,
      content_type
    });
  };
}

export function removeAttachment(note: string, noteRev: string, attachmentId: string) {
  return (dispatch: Dispatch) => {


    notesDB.removeAttachment(note, attachmentId, noteRev).then(result => {
      console.log("removeAttachment", result)
      dispatch({
        type: DELETE_ATTACHMENT_SUCCESS,
        ...result
      });
    }).catch(e=>{
      dispatch({
        type: DELETE_ATTACHMENT_ERROR,
        ...result
      });
    })

    dispatch({
      type: DELETE_ATTACHMENT,
      note,
      attachmentId
    });
  };


}



export function searchNotes(search: String) {
  return searchNotesFrom(search, "MIDDLE_MENU_SEARCH")
}
export function searchNotesGlobal(search: String) {
  return searchNotesFrom(search, GLOBAL_SEARCH)
}
/**
 *
 * @param search the search string
 * @param target defines where this data is saved (middle menu or Modal redux store). Can be SEARCH_GLOBAL
 */
export function searchNotesFrom(search: String, target: string) {
  return (dispatch: Dispatch, getState) => {
    dispatch({
      type: SEARCH_NOTES,
      search,
      target
    });
    const state = getState()

    // const results = state.notes ? state.notes
    const titleIndex = new FlexSearch();
    const contentIndex = new FlexSearch();
    const tagsIndex = new FlexSearch();
    state.notes.map(n=> {
      if (n.title && n.title.length > 0) {
        titleIndex.add(n._id, n.title)
      }
      if (n.content && n.content.length > 0) {
        contentIndex.add(n._id, n.content)
      }
      if (n.tags && n.tags.length > 0) {
        n.tags.map(t=> tagsIndex.add(n._id, t))
      }
    })

    const results = [...titleIndex.search(search),
      ...contentIndex.search(search),
      ...tagsIndex.search(search)]
    const orderedResults = {
      titleResults: titleIndex.search(search),
      contentResults: contentIndex.search(search),
      tagResults: tagsIndex.search(search)
    }

    // console.log("Search results", results)
    dispatch({
      type: SEARCH_NOTES_RESULTS,
      search,
      target,
      results,
      orderedResults
    });
  };
}
