import {
  INSERT_POST, ADD_POST, EDIT_POST, DELETE_POST,
  INSERT_CAR, ADD_CAR, EDIT_CAR, DELETE_CAR,
  INSERT_IMAGE, ADD_IMAGE, EDIT_IMAGE, DELETE_IMAGE
} from './actionTypes';

export const insertPosts = (datas) => {
  return {
    type: INSERT_POST,
    datas: datas
  }
}

export const createPost = (data) => {
  return {
    type: ADD_POST,
    data: data
  }
}

export const updatePost = (data) => {
  return {
    type: EDIT_POST,
    data: data
  }
}

export const deletePost = (data) => {
  return {
    type: DELETE_POST,
    data: data
  }
}

export const insertCars = (datas) => {
  return {
    type: INSERT_CAR,
    datas: datas
  }
}

export const insertImages = (datas) => {
  return {
    type: INSERT_IMAGE,
    datas: datas
  }
}
