import { GetState, Dispatch } from '../../reducers/types';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';


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
