import { createSelector } from 'reselect'

const allNotesInternal = state => {return (state && state.notes )? state.notes.filter(n=>n.schema === "note") : [] }
export const configs = state => state && state.configs
export const state = state => state

export const notebookSelector = createSelector(
  allNotesInternal,
  (all) => all.filter(n => n.showInMenu)
)
export const findSelectedNote = createSelector(
  allNotesInternal,
  configs,
  (all, configs) => {
    return all.filter(n=> n._id === configs.selectedNote)[0]
  }
)
export const allNotes = createSelector(
  allNotesInternal,
  (all) => all
)
export const savingNew = createSelector(
  allNotesInternal,
  (all) => (all.filter(n => n.isNew))
)
export const findChildren = createSelector(
  allNotesInternal,
  findSelectedNote,
  (all, note) => all.filter(n => note && note.children && note.children.indexOf(n._id) > -1)
)
export const findChildrenOfNote = (note) => {
  return createSelector(
    allNotesInternal,
    (all) => {
    return all.filter(n => n.parent === note._id)

  }
    )
}
