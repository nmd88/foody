import { INSERT_CAR, ADD_CAR, EDIT_CAR, DELETE_CAR } from '../actionsMitsu/actionTypes';

const initialState = {
  cars: []
}

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAR:
      return { ...state, cars: state.cars.concat(action.data) };
    case EDIT_CAR:

    case DELETE_CAR:

    case INSERT_CAR:
      return { ...state, cars: action.datas };
    default:
      return state;
  }
}

export default carReducer;
