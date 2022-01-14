import { combineReducers } from 'redux';
import tabReducer from './Tabs/tabReducer';
import marketReducer from './Market/marketReducer';

export default combineReducers({
  tabReducer,
  marketReducer
});
