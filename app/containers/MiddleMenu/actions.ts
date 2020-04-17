
export const SORT_NOTES = 'SORT_NOTES';

// Constants
export const SORT_ALPHA = 'SORT_ALPHA';
export const SORT_ALPHA_REVERSE = 'SORT_ALPHA_REVERSE';
export const SORT_CUSTOM = 'SORT_CUSTOM';
export const SORT_UPDATED_AT = 'SORT_UPDATED_AT';
export const SORT_CREATED_AT = 'SORT_CREATED_AT';


export function sortNotes(sorter: String) {
  return (dispatch: Dispatch, getState) => {
    dispatch({
      type: SORT_NOTES,
      sorter
    });
  };
}
