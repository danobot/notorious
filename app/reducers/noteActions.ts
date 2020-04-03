import { GetState, Dispatch } from '../../reducers/types';
import { v4 as uuid } from 'uuid';
import { selectNoteAction } from '../containers/ContentAreaCont/actions';
import {notesDB} from '../PouchInit'
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

export function updateNote(id: string, attributes: string) {
  return dispatch => {
    dispatch({
      type: UPDATE_NOTE,
      id,
      attributes
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
    notesDB.putAttachment(note, attachmentId, noteRev, buffer, 'text/plain').then(result => {
      console.log(result)
      dispatch({
        type: SAVE_ATTACHMENT_SUCCESS,
        ...result
      });
    }).catch(e=>{
      dispatch({
        type: SAVE_ATTACHMENT_ERROR,
        ...result
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
      console.log(result)
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
