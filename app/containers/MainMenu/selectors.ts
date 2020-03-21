import { createSelector } from 'reselect'

const allNotes = state => state && state.notes || []
const configs = state => state && state.configs
const state = state => state

export const notebookSelector = createSelector(
  allNotes,
  (all) => all.filter(n => n.showInMenu)
)
export const findSelectedNote = createSelector(
  allNotes,
  (all, state) => all.filter(n=> n._id === state.configs.selectedNote)[0]
)
export const savingNew = createSelector(
  allNotes,
  (all) => (all.filter(n => n.isNew))
)
export const findChildren = parent => createSelector(
  allNotes,
  (all) => all.filter(n => n.parent === parent)
)
