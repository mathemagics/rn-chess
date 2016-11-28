import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
  errors: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_ATTEMPT:
      return { ...state, loading: true, errors: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state, 
        ...INITIAL_STATE,
        user: action.payload
      };
    case LOGIN_USER_FAIL:
      return { ...state,
        loading: false,
        errors: 'Authentication Failed',
        password: ''
      };
    default:
      return state;
  }
};
