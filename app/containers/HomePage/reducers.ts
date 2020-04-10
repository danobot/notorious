import { createReducer } from '../../utils/utils'
import { SYNC_NOTES_ERROR, SYNC_NOTES_SUCCESS,
  SYNC_ON_CHANGE,
  SYNC_ON_PAUSED,
  SYNC_ON_ACTIVE,
  SYNC_ON_DENIED,
  SYNC_ON_COMPLETE,
  SYNC_ON_ERROR,
  SYNC_FIRST_TIME_SYNC_ERROR,
  SYNC_FIRST_TIME_SYNC_SUCCESS,
  SHUT_DOWN_APP
} from './actions';
import { UPDATE_NOTE } from '../../reducers/noteActions';


const initialState = {
  notesSync: "Replicating data from server",
  syncType: "",
  spinner: true,
  close: false
}

const homePageReducer = createReducer(initialState, {
  [SYNC_NOTES_ERROR]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "error"}
  },
  [SYNC_NOTES_SUCCESS]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "success"}
  },
  [UPDATE_NOTE]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "Pending update"}
  },
  [SYNC_ON_CHANGE]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "Syncing", spinner: true}
  },
  [SYNC_ON_PAUSED]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "", spinner: false}
  },
  [SYNC_ON_ACTIVE]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "Starting sync", spinner: true}
  },
  [SYNC_ON_DENIED]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "Permission Issue: Sync was rejected", spinner: true}
  },
  [SYNC_ON_COMPLETE]: (state, action) => {
    return {...state, syncType: action.type, notesSync: "Sync Completed", spinner: false}
  },
  [SYNC_ON_ERROR]: (state, action) => {
    alert("There was a synchronisation error. Please capture the console log from the views > Developer Tools > Console and raise an issue."+JSON.stringify(action))
    return {...state, syncType: action.type, notesSync: "Sync Error" + action.error}
  },
  [SYNC_FIRST_TIME_SYNC_ERROR]: (state, action) => {
    alert("First time sync from server failed. Please check backend is available and restart notorious application before beginning work." + JSON.stringify(action))

    return {...state, syncType: action.type, notesSync: "Initial Sync Failed"}
  },
  [SYNC_FIRST_TIME_SYNC_SUCCESS]: (state, action) => {
    // alert(JSON.stringify(action))
    return {...state, syncType: action.type, notesSync: "Initial sync complete"}
  },
  [SHUT_DOWN_APP]: (state, action) => {
    // alert(JSON.stringify(action))
    return {...state, close: true}
  }
});
export default homePageReducer;
