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
  configs,
  (all, configs) => {

    // console.log("all: ", all)
    // console.log("configs: ", configs)
    return all.filter(n=> n._id === configs.selectedNote)[0]
  }
)
export const savingNew = createSelector(
  allNotes,
  (all) => (all.filter(n => n.isNew))
)
export const findChildren = createSelector(
  allNotes,
  findSelectedNote,
  (all, note) => all.filter(n => note && note.children && note.children.indexOf(n._id) > -1)
)
