
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

  return `${config.db}/notes/${note._id}/${attachment}`;
}
