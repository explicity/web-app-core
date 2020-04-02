import { Routine } from 'redux-saga-routines';
import { combineReducers } from 'redux';

import { reducerCreator } from '../../../helpers/reducer.helper';
import { register, login, logout } from '../routines';

const initialState = {
  isAuthorized: false,
  currentUser: null
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case login.SUCCESS: {
      const { currentUser } = action.payload;

      return {
        ...state,
        currentUser,
        isAuthorized: Boolean(currentUser && currentUser.UserIdEncrypted)
      };
    }
    case logout.SUCCESS:
      return {
        ...state,
        currentUser: null,
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