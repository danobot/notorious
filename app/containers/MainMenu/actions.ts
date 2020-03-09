import { GetState, Dispatch } from '../../reducers/types';

export const SELECT_NOTEBOOK = 'SELECT_NOTEBOOK';


export function selectNotebook(nb: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    dispatch(
      {
        type: SELECT_NOTEBOOK,
        id: nb._id
      }
    );
  };
}
