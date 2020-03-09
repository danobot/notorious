import { GetState, Dispatch } from '../../reducers/types';
import '../../reducers/noteActions';

export const SELECT_NOTE = 'SELECT_NOTE';


export function selectNoteAction(nb: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    dispatch(
      {
        type: SELECT_NOTE,
        id: nb._id
      }
    );
  };
}
