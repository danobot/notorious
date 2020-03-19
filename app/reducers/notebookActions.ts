import { GetState, Dispatch } from '../../reducers/types';

export const CREATE_NOTEBOOK = 'CREATE_NOTEBOOK';


export function createNotebook(attributes: object) {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: CREATE_NOTEBOOK,
          attributes
        }
      );

  };
}

