import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../../components/MainMenu/MainMenu';

import { MainMenuStateType } from '../../reducers/types';
import * as actions from './actions';
import * as notebookActions from '../../reducers/notebookActions';

class MainMenuCont extends PureComponent {
  componentWillMount = () => {
    console.log('MainMenuCont will mount');

  }
  render() {
    return <MainMenu key={this.props.selection} {...this.props}/>;

  }
}

function mapStateToProps(state: MainMenuStateType) {
  return {
    notebooks: state.notebooks,
    selectedNotebook: state.mainMenu.nbSelection,
    ...state.mainMenu

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, notebookActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuCont);
