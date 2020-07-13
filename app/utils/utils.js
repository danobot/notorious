
import config from './config';
export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


export const uniq = (d) => {
  return d.reduce((accum, cur) => {
    if (accum.indexOf(cur) === -1) accum.push(cur);
    return accum;
  }, [] );
}

export const menuItemSorter = ( a, b ) => {
  // if (a.children && a.children.length > 0) {
  //   return -1
  // }
  // if (b.children && b.children.length > 0) {
  //   return 1
  // }
  const aTitle = a.title || ""
  const bTitle = b.title || ""
  if ( aTitle < bTitle ){
    return -1;
  }
  if ( aTitle > bTitle ){
    return 1;
  }
  return 0;
}

export const alphaSorter = ( a, b ) => {
  const aTitle = a || ""
  const bTitle = b || ""
  if ( aTitle < bTitle ){
    return -1;
  }
  if ( aTitle > bTitle ){
    return 1;
  }
  return 0;
}
export const alphaSorterReverse = ( a, b ) => {
  const aTitle = a || ""
  const bTitle = b || ""
  if ( aTitle < bTitle ){
    return 1;
  }
  if ( aTitle > bTitle ){
    return -1;
  }
  return 0;
}
export const alphaTitleSorter = ( a, b ) => {

  const aTitle = a.title || "Untitled Note"
  const bTitle = b.title || "Untitled Note"
  if ( aTitle < bTitle ){
    return -1;
  }
  if ( aTitle > bTitle ){
    return 1;
  }
  return 0;
}
export const alphaTitleSorterReverse = ( a, b ) => {
  const aTitle = a.title || "Untitled Note"
  const bTitle = b.title || "Untitled Note"
  if ( aTitle < bTitle ){
    return 1;
  }
  if ( aTitle > bTitle ){
    return -1;
  }
  return 0;
}
export const updatedAtSorter = ( a, b ) => {
  const aTitle = a.updatedAt || Date.now()
  const bTitle = b.updatedAt || Date.now()
  if ( aTitle < bTitle ){
    return 1;
  }
  if ( aTitle > bTitle ){
    return -1;
  }
  return 0;
}
export const customNoteSorter = ( a, b ) => {
console.log(a)
  const aPin = a.pinned
  const bPin = b.pinned
  if (aPin && !bPin) {
    return -1
  }
  if (bPin && !aPin) {
    return 1
  }

  const aTitle = a.order || ""
  const bTitle = b.order || ""
  if ( aTitle < bTitle ){
    return 1;
  }
  if ( aTitle > bTitle ){
    return -1;
  }
  return 0;
}
export const imageURL = ( note, attachment ) => {

  return `${config.url}/notes/${note._id}/${attachment}`;
}
export const hasChildren = ( children ) => {

  if (children != null) {
    return children.length > 0;
  } else {
    return false;
  }
}
export const updateNoteAttributesInArray = (state, noteId, attributes) => {
  return state.map((item, id) => {
    if (item._id !== noteId) { return item }
    let extra = {}
    let c = attributes
    // if (action.attributes.skipUpdatedAt || false) {
      // } else {
        //   c.updatedAt = Date.now()
        // }
    if (c.hasOwnProperty("title") || c.hasOwnProperty("content")) {
      console.log("Title or content updated")
      c.updatedAt = Date.now()
      console.log(c)
    }

    delete c.skipUpdatedAt
    return {
      ...item,
      ...c
    }
  })
}
export const addChildToParent = (state, noteId, parentId ) => {
  return state.map((note, id) => {
    if (note._id !== parentId) { return note }
    return {...note, children: [...note.children, noteId]} // add new child to parents `children` array (for easy read operation)
  })
}

export const removeNoteFromParentsChildArray = (newState, noteToBeNuked ) => {
  const parent = noteToBeNuked.parent
  if ( parent !== undefined && parent !== "root") {
    console.log("parent: ",parent)
    console.log("parent.children: ",parent.children)

    // find the parent note is all notes:
    newState = newState.map((note, id) => {
      if (note._id !== parent) { return note }
      // we found the parent note:
      let splicedChildren = note.children
      const index = splicedChildren.indexOf(noteToBeNuked._id) // Remove deleted note from the parent's child array
      if (index > -1) {
        splicedChildren.splice(index, 1)
      }
      console.log("parent: ",parent)
      return {...note, children: splicedChildren} // remove child entry
    })
  }
  return newState
}


