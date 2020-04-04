import { Dispatch } from '../../reducers/types';
import { CREATE_NOTE, createNote, createNoteWithId } from './noteActions';
import { v4 as uuid } from 'uuid';
import { selectNotebook } from '../containers/MainMenu/actions';

export const CREATE_NOTEBOOK = 'CREATE_NOTEBOOK';

export function createNotebook(parent: string, attributes: object) {
  return (dispatch: Dispatch) => {
    const noteId = uuid()
    dispatch({type: CREATE_NOTEBOOK, attributes: { ...attributes, id: noteId }})
    dispatch(selectNotebook(noteId))
    createNoteWithId(noteId, parent, { ...attributes, showInMenu: true, kind: 'collection' })(dispatch)
  };
}
