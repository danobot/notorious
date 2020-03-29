import FlexSearch from 'flexsearch';

export const SEARCH_NOTES = 'SEARCH_NOTES';
export const SEARCH_NOTES_RESULTS = 'SEARCH_NOTES_RESULTS';


export function searchNotes(search: String) {
  return (dispatch: Dispatch, getState) => {
    dispatch({
      type: SEARCH_NOTES,
      search
    });
    const state = getState()

    // const results = state.notes ? state.notes
    const index = new FlexSearch();
    state.notes.map(n=> {
      index.add(n._id, n._id)
      index.add(n._id, n.title)
      index.add(n._id, n.content)
      if (n.tags && n.tags.length> 0) {
        n.tags.map(t=> index.add(n._id, t))
      }
    })
    console.log("index", index)
    const results = index.search(search)
    console.log(results)
    dispatch({
      type: SEARCH_NOTES_RESULTS,
      search,
      results
    });
  };
}
