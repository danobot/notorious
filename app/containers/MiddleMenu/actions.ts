import FlexSearch from 'flexsearch';

export const SEARCH_NOTES = 'SEARCH_NOTES';
export const SORT_NOTES = 'SORT_NOTES';
export const SEARCH_NOTES_RESULTS = 'SEARCH_NOTES_RESULTS';

// Constants
export const SORT_ALPHA = 'SORT_ALPHA';
export const SORT_ALPHA_REVERSE = 'SORT_ALPHA_REVERSE';
export const SORT_CUSTOM = 'SORT_CUSTOM';
export const SORT_UPDATED_AT = 'SORT_UPDATED_AT';
export const SORT_CREATED_AT = 'SORT_CREATED_AT';

export function searchNotes(search: String) {
  return (dispatch: Dispatch, getState) => {
    dispatch({
      type: SEARCH_NOTES,
      search
    });
    const state = getState()

    // const results = state.notes ? state.notes
    const titleIndex = new FlexSearch();
    const contentIndex = new FlexSearch();
    const tagsIndex = new FlexSearch();
    state.notes.map(n=> {
      if (n.title && n.title.length > 0) {
        titleIndex.add(n._id, n.title)
      }
      if (n.content && n.content.length > 0) {
        contentIndex.add(n._id, n.content)
      }
      if (n.tags && n.tags.length > 0) {
        n.tags.map(t=> tagsIndex.add(n._id, t))
      }
    })

    const results = [...titleIndex.search(search),
      ...contentIndex.search(search),
      ...tagsIndex.search(search)]
    console.log("Search results", results)
    dispatch({
      type: SEARCH_NOTES_RESULTS,
      search,
      results
    });
  };
}

export function sortNotes(sorter: String) {
  return (dispatch: Dispatch, getState) => {
    dispatch({
      type: SORT_NOTES,
      sorter
    });
  };
}
