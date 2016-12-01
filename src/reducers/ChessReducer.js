import { CLICK_SQUARE } from '../actions/types';

const INITIAL_STATE = {
 highlighted: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLICK_SQUARE:
      console.log('highlight:', action.payload);
      return { ...state, highlighted: [action.payload] };
    default:
      return state;
  }
};
