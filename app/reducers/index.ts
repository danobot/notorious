import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import mainMenuReducer from '../containers/MainMenu/reducers';
import middleMenuReducer from '../containers/MiddleMenu/reducers';
import homePageReducer from '../containers/HomePage/reducers';
import contentAreaReducer from '../containers/ContentAreaCont/reducers';
import notesReducer from './notes';
import notebooksReducer from './notebooks';
import configReducer from './configs';
import modalReducer from './modals';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    notes: notesReducer,
    mainMenu: mainMenuReducer,
    middleMenu: middleMenuReducer,
    settings: homePageReducer,
    contentArea: contentAreaReducer,
    configs: configReducer,
    modals: modalReducer
  });;
}
