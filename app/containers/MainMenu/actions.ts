import { GetState, Dispatch } from '../../reducers/types';
import { setConfig } from '../../reducers/configActions';

export const SELECT_NOTEBOOK = 'SELECT_NOTEBOOK';
export const SHOW_NOTEBOOK_MODAL = 'SHOW_NOTEBOOK_MODAL';
export const HIDE_NOTEBOOK_MODAL = 'HIDE_NOTEBOOK_MODAL';


export function selectNotebook(nb: String) {
  return (dispatch: Dispatch, state) => {
    dispatch(setConfig("selectedNotebook", nb._id))
    dispatch(
      {
        type: SELECT_NOTEBOOK,
        id: nb._id
      }
    );
  };
}

export function showNotebookModal() {
  return (dispatch: Dispatch, state) => {
    dispatch(
      {
        type: SHOW_NOTEBOOK_MODAL
      }
    );
  };
}
export function hideNotebookModal() {
  return (dispatch: Dispatch, state) => {
    dispatch(
      {
        type: HIDE_NOTEBOOK_MODAL
      }
    );
  };
}
