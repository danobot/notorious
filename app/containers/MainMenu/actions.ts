import { GetState, Dispatch } from '../../reducers/types';
import { setConfig } from '../../reducers/configActions';

export const SELECT_NOTEBOOK = 'SELECT_NOTEBOOK';
export const SELECT_NOTES_FILTER = 'SELECT_NOTES_FILTER';


export function selectNotebook(nb: String) {
  return (dispatch: Dispatch, state) => {
    dispatch(setConfig("selectedNotebook", nb))
    dispatch(
      {
        type: SELECT_NOTEBOOK,
        filter: nb
      }
    );
  };
}

