import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../../components/MainMenu/MainMenu';
import { notebookSelector, findExistingTags } from './selectors'
import { MainMenuStateType } from '../../reducers/types';
import * as actions from './actions';
import * as notebookActions from '../../reducers/notebookActions';
import * as noteActions from '../../reducers/noteActions';
import * as modalActions from '../../reducers/modalActions';
import * as contentAreaActions from '../ContentAreaCont/actions';
import { menuItemSorter, alphaSorter } from '../../utils/utils';
class MainMenuCont extends PureComponent {
  render() {
    return <MainMenu {...this.props}/>;

  }
}

function mapStateToProps(state: MainMenuStateType) {
  return {
    notebooks: notebookSelector(state).filter( n => n.parent === "root").sort(menuItemSorter),
    selectedNotebook: state.configs ? state.configs.selectedNotebook : null,
    showNotebookModalToggle: state.modals.showNotebookModalToggle,
    modalData: state.modals.showNotebookData,
    tags: findExistingTags(state).sort(alphaSorter),
    ...state.mainMenu

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, modalActions, notebookActions, noteActions,contentAreaActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuCont);
