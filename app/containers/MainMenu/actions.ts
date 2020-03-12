import { GetState, Dispatch } from '../../reducers/types';
import { setConfig } from '../../reducers/configActions';

export const SELECT_NOTEBOOK = 'SELECT_NOTEBOOK';


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
