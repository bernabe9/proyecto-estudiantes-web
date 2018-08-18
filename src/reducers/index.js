import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import router from './routerReducer';

const rootReducer = combineReducers({
  form,
  router
});

export default rootReducer;
