import { combineReducers } from 'redux';

import carReducer from './carReducer';
import postReducer from './postReducer';
import imageReducer from './imageReducer';

const allReducers = combineReducers({
  carReducer, postReducer, imageReducer,
});
export default allReducers;
