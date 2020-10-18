import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import Settings from './Settings';
import Auth from './Auth';
import account from './account';
import category from './category';
import brand from './brand';
import product from './product';


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  account,
  product,
  category,
  brand,
});
