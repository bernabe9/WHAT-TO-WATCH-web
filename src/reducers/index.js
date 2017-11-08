import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import router from './routerReducer';

const rootReducer = combineReducers({
  router,
  form
});

export default rootReducer;
