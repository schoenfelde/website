export const SET_SEARCH = 'SET_SEARCH';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const search = (text: string) => ({ type: SET_SEARCH, value: { text } });
export const clearSearch = () => ({ type: CLEAR_SEARCH });
