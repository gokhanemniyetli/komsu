import { RESET_USER_PASSWORD } from '../actions/Types';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_USER_PASSWORD:
      return { ...state, loading: true };
    
  default:
      return state;

  }
};
