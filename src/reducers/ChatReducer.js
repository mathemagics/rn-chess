import {
  RECEIVE_MSG
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_MSG:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
