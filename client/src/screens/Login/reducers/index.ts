import { combineReducers } from 'redux';

import { reducerCreator } from '../../../helpers/reducer.helper';
import { register, login, logout } from '../routines';

const initialState = {
  isAuthorized: false,
  user: null
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case register.SUCCESS:
    case login.SUCCESS: {
      const { user } = action.payload;

      return {
        ...state,
        user,
        isAuthorized: Boolean(user && user.id)
      };
    }
    case logout.SUCCESS:
      return {
        ...state,
        user: null,
        isAuthorized: false
      };
    default:
      return state;
  }
};

const requests = combineReducers({
  profile: reducerCreator([login.TRIGGER])
});

export default combineReducers({ profile, requests });
