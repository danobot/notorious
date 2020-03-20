import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import mainMenuReducer from '../containers/MainMenu/reducers';
import homePageReducer from '../containers/HomePage/reducers';
import contentAreaReducer from '../containers/ContentAreaCont/reducers';
import notesReducer from './notes';
import notebooksReducer from './notebooks';
import configReducer from './configs';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    notes: notesReducer,
    // notebooks: notebooksReducer,
    mainMenu: mainMenuReducer,
    settings: homePageReducer,
    contentArea: contentAreaReducer,
    configs: configReducer
  });;
}
