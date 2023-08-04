import { GETARTICLE_SUCCESS, GET_ARTICLE } from '../actions/types';

const initialState = {
  articles: [],
  article: []
};

function articleReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GETARTICLE_SUCCESS:
      return {
        ...state,
        articles: payload
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload
      };

    default:
      return state;
  }
}

export default articleReducer;
