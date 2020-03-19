import { GetState, Dispatch } from '../../reducers/types';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_EDITOR = 'ADD_EDITOR';
export const REMOVE_EDITOR = 'REMOVE_EDITOR';


export function updateNote(id: string,  attributes: string) {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: UPDATE_NOTE,
          id,
          attributes
        }
      );

  };
}


export function createNote(notebookId: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      {
        type: CREATE_NOTE,
        notebookId
      }
    );
  };
}
export function deleteNote(noteId: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      {
        type: DELETE_NOTE,
        noteId
      }
    );
  };
}


export function addEditorColumn(note: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      {
        type: ADD_EDITOR,
        id: note._id
      }
    );
  };
}

export function removeEditorColumn(note: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      {
        type: REMOVE_EDITOR,
        id: note._id
      }
    );
  };
}
