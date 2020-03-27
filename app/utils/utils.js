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
