import { combineReducers } from 'redux';

import { reducerCreator } from 'helpers/reducer.helper';
import { register, login, logout, fetchCurrentUser } from '../routines';

const initialState = {
  isLoading: true,
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
        isLoading: false,
        user,
        isAuthorized: Boolean(user && user.id)
      };
    }
    case fetchCurrentUser.SUCCESS: {
      const user = action.payload;

      return {
        ...state,
        isLoading: false,
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
    case fetchCurrentUser.FAILURE:
    case login.FAILURE:
    case register.FAILURE: {
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthorized: false
      };
    }
    default:
      return state;
  }
};

const requests = combineReducers({
  auth: reducerCreator([login.TRIGGER, register.TRIGGER])
});

export default combineReducers({ profile, requests });
