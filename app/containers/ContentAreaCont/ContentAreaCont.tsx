import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../../components/MainMenu/MainMenu';

import { MainMenuStateType } from '../../reducers/types';
import * as actions from './actions';
import * as noteActions from '../../reducers/noteActions';
import EditorPane from '../../components/EditorPane/EditorPane';
import { findChildren, findSelectedNote, findExistingTags } from '../MainMenu/selectors';

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
    note: findSelectedNote(state), //state.notes.filter(e=> e._id === state.configs.selectedNote)[0],
    subNotes: findChildren(state),
    existingTags: findExistingTags(state)

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    noteActions: bindActionCreators(noteActions, dispatch),
    ...bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentAreaCont);
