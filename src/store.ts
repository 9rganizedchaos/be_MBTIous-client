import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from './reducers/index';
import thunk from "redux-thunk";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    "testReducer",
    "viewReducer"
  ]
}

const enhancedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const store = createStore(enhancedReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;