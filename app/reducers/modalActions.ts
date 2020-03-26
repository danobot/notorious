import { GetState, Dispatch } from '../../reducers/types';
import { setConfig } from '../../reducers/configActions';

export const SHOW_NOTEBOOK_MODAL = 'SHOW_NOTEBOOK_MODAL';
export const HIDE_NOTEBOOK_MODAL = 'HIDE_NOTEBOOK_MODAL';




export function showNotebookModal() {
  return (dispatch: Dispatch, getState) => {
    dispatch(
      {
        type: SHOW_NOTEBOOK_MODAL
      }
    );
  };
}
export function hideNotebookModal() {
  return (dispatch: Dispatch, getState) => {
    dispatch(
      {
        type: HIDE_NOTEBOOK_MODAL
      }
    );
  };
}
