import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from '../containers/CounterPage/reducers';
import mainMenuReducer from '../containers/MainMenu/reducers';
import homePageReducer from '../containers/HomePage/reducers';
import contentAreaReducer from '../containers/ContentAreaCont/reducers';
import notesReducer from './notes';
import notebooksReducer from './notebooks';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    notes: notesReducer,
    notebooks: notebooksReducer,
    mainMenu: mainMenuReducer,
    settings: homePageReducer,
    contentArea: contentAreaReducer
  });;
}
