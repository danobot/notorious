import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import * as noteActions from '../../reducers/noteActions';
import EditorPane from '../../components/EditorPane/EditorPane';
import { findChildren, findSelectedNote, findExistingTags, findNote } from '../MainMenu/selectors';

class ContentAreaCont extends PureComponent {
  
  render() {
    return <EditorPane key={this.props.contentArea.selectedNote} {...this.props} />;

  }
}

function mapStateToProps(state, props) {
  const note = findSelectedNote(state)
  return {
    contentArea: state.contentArea,
    note: note, //state.notes.filter(e=> e._id === state.configs.selectedNote)[0],
    subNotes: findChildren(state),
    existingTags: findExistingTags(state),
    parent: note &&  findNote(note.parent)(state)

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    noteActions: bindActionCreators(noteActions, dispatch),
    ...bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentAreaCont);
