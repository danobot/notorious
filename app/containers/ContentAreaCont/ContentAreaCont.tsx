import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../../components/MainMenu/MainMenu';

import { MainMenuStateType } from '../../reducers/types';
import * as actions from './actions';
import * as noteActions from '../../reducers/noteActions';
import EditorPane from '../../components/EditorPane/EditorPane';
import { findChildren } from '../MainMenu/selectors';

class ContentAreaCont extends PureComponent {
  componentWillMount = () => {
    console.log('ContentAreaCont will mount');

  }
  render() {
    return <EditorPane key={this.props.contentArea.selectedNote} {...this.props} />;

  }
}

function mapStateToProps(state: MainMenuStateType) {
  return {
    contentArea: state.contentArea,
    note: state.notes.filter(e=> e._id === state.configs.selectedNote)[0]
    //children: findChildren(state.configs.selectedNote || '')

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  console.log(actions)
  return bindActionCreators(Object.assign(actions, noteActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentAreaCont);
