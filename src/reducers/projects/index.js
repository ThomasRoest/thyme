// @flow

import { combineReducers } from 'redux';

import project from './project';

function byId(state = {}, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
      return {
        ...state,
        [action.id]: project(state[action.id], action),
      };
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.id];
    case 'REMOVE_PROJECT':
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
});