import { GetState, Dispatch } from '../../reducers/types';
import { setConfig } from '../../reducers/configActions';
import { selectNoteAction } from '../ContentAreaCont/actions';
import {allNotes} from './selectors'
export const SELECT_NOTEBOOK = 'SELECT_NOTEBOOK';
export const SELECT_NOTES_FILTER = 'SELECT_NOTES_FILTER';


export function selectNotebook(nb: String) {
  return (dispatch: Dispatch, getState) => {
    const state = getState()
    dispatch(setConfig("selectedNotebook", nb))
    const notes = allNotes(state);
    const notebook = notes && notes.filter(n => n._id === nb)[0]
    const notesInNotebook = notes && notes.filter(n => n.parent === nb)
    let selectedId = null;
    // console.log("notebook", notebook)
    // console.log("notesInNotebook", notesInNotebook)
    if (notebook && notebook.lastSelectedChild) {
      selectedId = notebook.lastSelectedChild // ideally use last selected note in notebook
    } else if (notesInNotebook && notesInNotebook.length > 0) {
      selectedId = notesInNotebook[0]._id // if unavailable, use first note in notebook.
    }
    // console.log("selectedId", selectedId)
    if (selectedId) {
      dispatch(selectNoteAction(selectedId))
    }
    dispatch(
      {
        type: SELECT_NOTEBOOK,
        filter: nb
      }
    );
  };
}

