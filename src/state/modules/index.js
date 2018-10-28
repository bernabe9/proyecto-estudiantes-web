import { combineReducers } from 'redux-immutable';

import router from 'modules/router';
import exercise from 'modules/exercise';

const rootReducer = combineReducers({
  router,
  exercise
});

export default rootReducer;
