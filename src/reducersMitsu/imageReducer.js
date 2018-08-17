import { INSERT_IMAGE, ADD_IMAGE, EDIT_IMAGE, DELETE_IMAGE } from '../actionsMitsu/actionTypes';

const initialState = {
  images: []
}

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, images: state.images.concat(action.data) };
    case EDIT_IMAGE:

    case DELETE_IMAGE:

    case INSERT_IMAGE:
      return { ...state, images: action.datas };
    default:
      return state;
  }
}

export default imageReducer;
