import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-pouchdb';
import createRootReducer from '../reducers';
import { Store, counterStateType } from '../reducers/types';



const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: counterStateType): Store {
  const store = createStore(rootReducer, initialState, enhancer);
  persistStore(store);

  return store;
}

export default { configureStore, history };
