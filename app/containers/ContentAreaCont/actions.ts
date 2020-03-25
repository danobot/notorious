import { GetState, Dispatch } from '../../reducers/types';
import '../../reducers/noteActions';
import { setConfig } from '../../reducers/configActions';
import { updateNote } from '../../reducers/noteActions';

export const SELECT_NOTE = 'SELECT_NOTE';


export function selectNoteAction(note: String) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(setConfig("selectedNote", note))
    // dispatch(updateNote(note._id, {"viewedAt": Date.now(), skipUpdatedAt: true}))
    dispatch(
      {
        type: SELECT_NOTE,
        id: note
      }
    );
  };
}
