import { combineReducers } from 'redux';

import article from 'screens/Articles/reducers';
import user from 'screens/Login/reducers';

export default combineReducers({ article, user });
