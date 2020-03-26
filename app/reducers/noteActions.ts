import { GetState, Dispatch } from '../../reducers/types';
import { v4 as uuid } from 'uuid';
import { selectNoteAction } from '../containers/ContentAreaCont/actions';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_EDITOR = 'ADD_EDITOR';
export const REMOVE_EDITOR = 'REMOVE_EDITOR';

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

export function addEditorColumn(note: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_EDITOR,
      id: note._id
    });
  };
}

export function removeEditorColumn(note: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_EDITOR,
      id: note._id
    });
  };
}
