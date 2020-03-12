import { GetState, Dispatch } from '../../reducers/types';
import '../../reducers/noteActions';
import { setConfig } from '../../reducers/configActions';

export const SELECT_NOTE = 'SELECT_NOTE';


export function selectNoteAction(note: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(setConfig("selectedNote", note._id))
    dispatch(
      {
        type: SELECT_NOTE,
        id: note._id
      }
    );
  };
}
