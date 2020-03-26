import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../../components/MainMenu/MainMenu';
import { notebookSelector } from './selectors'
import { MainMenuStateType } from '../../reducers/types';
import * as actions from './actions';
import * as notebookActions from '../../reducers/notebookActions';
import * as noteActions from '../../reducers/noteActions';
import * as modalActions from '../../reducers/modalActions';
import * as contentAreaActions from '../ContentAreaCont/actions';

class MainMenuCont extends PureComponent {
  componentWillMount = () => {
    console.log('MainMenuCont will mount');

  }
  render() {
    return <MainMenu {...this.props}/>;

  }
}

function mapStateToProps(state: MainMenuStateType) {
  return {
    notebooks: notebookSelector(state).filter( n => n.parent === "root"),
    selectedNotebook: state.configs.selectedNotebook,
    showNotebookModalToggle: state.modals.showNotebookModalToggle,
    modalData: state.modals.showNotebookData,
    ...state.mainMenu

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, modalActions, notebookActions, noteActions,contentAreaActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuCont);
