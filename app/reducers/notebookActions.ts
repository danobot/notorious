import { Dispatch } from '../../reducers/types';

export const CREATE_NOTEBOOK = 'CREATE_NOTEBOOK';

export function createNotebook(attributes: object) {
  return (dispatch: Dispatch) => {
    dispatch({type: CREATE_NOTEBOOK, attributes})
    dispatch({
      type: CREATE_NOTE,
      attributes: { ...attributes, showInMenu: true, type: 'container' }
    });
  };
}
