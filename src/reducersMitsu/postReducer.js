import { INSERT_POST, ADD_POST, EDIT_POST, DELETE_POST } from '../actionsMitsu/actionTypes';

const initialState = {
  posts: []
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: state.posts.concat(action.data) };
    case EDIT_POST:

    case DELETE_POST:

    case INSERT_POST:
      return { ...state, posts: action.datas };
    default:
      return state;
  }
}

export default postReducer;
