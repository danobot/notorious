import { Dispatch } from '../../reducers/types';
import { CREATE_NOTE, createNote } from './noteActions';

export const CREATE_NOTEBOOK = 'CREATE_NOTEBOOK';

export function createNotebook(attributes: object) {
  return (dispatch: Dispatch) => {
    dispatch({type: CREATE_NOTEBOOK, attributes})
    createNote("root", { ...attributes, showInMenu: true, kind: 'collection' })(dispatch)
  };
}
