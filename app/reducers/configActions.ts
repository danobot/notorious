import { GetState, Dispatch } from '../../reducers/types';

export const SET_CONFIG = 'SET_CONFIG';


export function setConfig(id: string,  attributes: string) {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: SET_CONFIG,
          id,
          attributes
        }
      );

  };
}



