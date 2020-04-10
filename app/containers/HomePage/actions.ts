import { GetState, Dispatch } from '../../reducers/types';
export const SYNC_NOTES_SUCCESS = 'SYNC_NOTES_SUCCESS';
export const SYNC_NOTES_ERROR = 'SYNC_NOTES_ERROR';

export const SYNC_ON_CHANGE = "ON_CHANGE";
export const SYNC_ON_PAUSED = "ON_PAUSED";
export const SYNC_ON_ACTIVE = "ON_ACTIVE";
export const SYNC_ON_DENIED = "ON_DENIED";
export const SYNC_ON_COMPLETE = "ON_COMPLETE";
export const SYNC_ON_ERROR = "ON_ERROR";
export const SYNC_FIRST_TIME_SYNC_SUCCESS = "SYNC_FIRST_TIME_SYNC_SUCCESS";
export const SYNC_FIRST_TIME_SYNC_ERROR = "FIRST_TIME_SYNC_ERROR";
export const SHUT_DOWN_APP = "SHUT_DOWN_APP";


// export const RESIZE_SIDEBAR = 'RESIZE_SIDEBAR';
// export const RESIZE_MAIN_MENU = 'RESIZE_MAIN_MENU';
// export const RESIZE_MIDDLE_MENU = 'RESIZE_MIDDLE_MENU';
// export const SET_VISIBILITY_MAIN_MENU = 'SET_VISIBILITY_MAIN_MENU';
// export const SAVE_STORE_CONFIG = 'SAVE_STORE_CONFIG';


export function syncNotesSuccess() {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: SYNC_NOTES_SUCCESS
        }
      );
  }
}
export function shutdown() {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: SHUT_DOWN_APP
        }
      );
  }
}
export function syncNotesError() {
  return (dispatch: Dispatch, getState: GetState) => {
      dispatch(
        {
          type: SYNC_NOTES_ERROR
        }
      );
  }
}


// export function resizeSidebarAction(currentSize: number, size: number) {
//   return (dispatch: Dispatch, getState: GetState) => {
//     if( currentSize !== size) {
//       console.log("Action: ", size)
//       dispatch(
//         {
//           type: RESIZE_SIDEBAR,
//           size
//         }
//       );

//     }

// }
// }
// export function resizeMainMenuAction(currentSize: number, size: number) {
//   return (dispatch: Dispatch, getState: GetState) => {
//     if( currentSize !== size) {
//       console.log("Action: ", size)
//       dispatch(
//         {
//           type: RESIZE_MAIN_MENU,
//           size
//         }
//       );

//     }
//   };
// }
// export function resizeMiddleMenuAction(currentSize: number, size: number) {
//   return (dispatch: Dispatch, getState: GetState) => {
//     if( currentSize !== size) {
//       console.log("Action: ", size)
//       dispatch(
//         {
//           type: RESIZE_MIDDLE_MENU,
//           size
//         }
//       );

//     }
//   };
// }
// export function setMainMenuVisibility(visible: boolean) {
//   return (dispatch: Dispatch, getState: GetState) => {
//       console.log("Action: ", visible)
//       dispatch(
//         {
//           type: SET_VISIBILITY_MAIN_MENU,
//           visible
//         }
//       );

//   };
// }
