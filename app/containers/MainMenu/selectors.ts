import { createSelector } from 'reselect'

const allNotes = state => state.notes

export const notebookSelector = createSelector(
  allNotes,
  (all) => all.filter(n => n.showInMenu)
)
