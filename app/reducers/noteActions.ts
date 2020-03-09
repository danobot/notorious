import { GetState, Dispatch } from '../../reducers/types';

export const UPDATE_NOTE_CONTENT = 'UPDATE_NOTE_CONTENT';


export function updateNoteContent(id: string,  attributes: string) {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: UPDATE_NOTE_CONTENT,
          id,
          attributes
        }
      );

  };
}
