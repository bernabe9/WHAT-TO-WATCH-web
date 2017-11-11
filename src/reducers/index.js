import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import router from './routerReducer';
import movie from './movieReducer';

const rootReducer = combineReducers({
  router,
  form,
  movie
});

export default rootReducer;
