import { GetState, Dispatch } from '../../reducers/types';
import {store} from '../../utils/config'
export const RESIZE_SIDEBAR = 'RESIZE_SIDEBAR';
export const RESIZE_MAIN_MENU = 'RESIZE_MAIN_MENU';
export const RESIZE_MIDDLE_MENU = 'RESIZE_MIDDLE_MENU';
export const SET_VISIBILITY_MAIN_MENU = 'SET_VISIBILITY_MAIN_MENU';
export const SAVE_STORE_CONFIG = 'SAVE_STORE_CONFIG';


export function resizeSidebarAction(currentSize: number, size: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if( currentSize !== size) {
      console.log("Action: ", size)
      dispatch(
        {
          type: RESIZE_SIDEBAR,
          size
        }
      );

    }

}
}
export function resizeMainMenuAction(currentSize: number, size: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if( currentSize !== size) {
      console.log("Action: ", size)
      dispatch(
        {
          type: RESIZE_MAIN_MENU,
          size
        }
      );

    }
  };
}
export function resizeMiddleMenuAction(currentSize: number, size: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    if( currentSize !== size) {
      console.log("Action: ", size)
      dispatch(
        {
          type: RESIZE_MIDDLE_MENU,
          size
        }
      );

    }
  };
}
export function setMainMenuVisibility(visible: boolean) {
  return (dispatch: Dispatch, getState: GetState) => {
      console.log("Action: ", visible)
      dispatch(
        {
          type: SET_VISIBILITY_MAIN_MENU,
          visible
        }
      );

  };
}
// export function saveStoreConfig(key: string, vb: any) {
//   return (dispatch: Dispatch, getState: GetState) => {
//     console.log("savings", key, vb, store)
//     dispatch({
//       type: SET_CONFIG,
//       id: key,
//       attributes: vb
//     })

//   };
// }
