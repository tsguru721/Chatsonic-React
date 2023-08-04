import {
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SEARCH_NOW,
  SET_HISTORY,
  NEW_CHAT,
  EXCHANGE_CURRENT_ITEM,
  UPDATE_CHAT
} from '../actions/types';

const initialState = {
  searchResult: null,
  loading: true,
  searchState: false,
  searchQuery: null,
  query: [],
  result: [],
  searchHistory: [],
  currentList: 0
};

function searchReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_NOW:
      return {
        ...state,
        searchState: true,
        searchQuery: payload
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: payload,
        searchState: false
      };
    case SET_HISTORY:
      return {
        ...state,
        query: [...state.query, state.searchQuery],
        result: [...state.result, state.searchResult]
      };

    case EXCHANGE_CURRENT_ITEM:
      return {
        ...state,
        currentList: payload,
        query: state.searchHistory[payload].searchQueries,
        result: state.searchHistory[payload].searchResults
      };
    case NEW_CHAT:
      return {
        ...state,
        searchHistory: [
          ...state.searchHistory,
          {
            searchQueries: payload.searchQueries,
            searchResults: payload.searchResults
          }
        ],
        currentList: payload.currentItem + 1,
        result: [],
        query: []
      };
    case UPDATE_CHAT:
      return {
        ...state,
        searchHistory: payload.searchHis,
        currentList: payload.nextItemNum,
        result: [],
        query: []
      };
    // return {
    //   ...state,
    //   query: state.query + [state.searchQuery],
    //   result: state.result + [payload]
    // };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
}

export default searchReducer;
