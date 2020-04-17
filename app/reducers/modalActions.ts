import { GetState, Dispatch } from '../../reducers/types';
import { setConfig } from '../../reducers/configActions';

export const SHOW_NOTEBOOK_MODAL = 'SHOW_NOTEBOOK_MODAL';
export const SHOW_GENERIC_MODAL = 'SHOW_GENERIC_MODAL';
export const HIDE_NOTEBOOK_MODAL = 'HIDE_NOTEBOOK_MODAL';
export const HIDE_GENERIC_MODAL = 'HIDE_GENERIC_MODAL';




export function showNotebookModal(attributes: object) {
  return (dispatch: Dispatch, getState) => {
    dispatch(
      {
        type: SHOW_NOTEBOOK_MODAL,
         attributes
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
export function showModal(name: string, data: object) {
  return (dispatch: Dispatch, getState) => {
    dispatch(
      {
        type: SHOW_GENERIC_MODAL,
        [name+"ModalToggle"]: true,
        [name+"ModalData"]: data
      }
    );
  };
}
export function hideModal(name: string) {
  return (dispatch: Dispatch, getState) => {
    dispatch(
      {
        type: HIDE_GENERIC_MODAL,
        [name+"ModalToggle"]: false,
        [name+"ModalData"]: null

      }
    );
  };
}

// Helpers
export function showFinderModal(data: object) {
  return showModal("finder", data)
}

export function hideFinderModal() {
  return hideModal("finder")
}

