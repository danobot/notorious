import React, { PureComponent } from 'react';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import NotesWrapper from '../../components/NotesWrapper/NotesWrapper';
import { notebookSelector, findExistingTags } from './selectors'
import * as notebookActions from '../../reducers/notebookActions';
import * as noteActions from '../../reducers/noteActions';
import { allNotes } from '../MainMenu/selectors';
class MainMenuCont extends React.Component {
  render() {
    const Comp = this.props.children
    return <Comp children={this.props.subnotes} note={this.props.note} />;

  }
}

function mapStateToProps(state, {noteId, childIds}) {
  return {
    subnotes: childIds ? allNotes(state).filter( n => childIds.indexOf(n._id) > -1 )  : [],
    note: noteId ? allNotes(state).filter( n => n._id == noteId )[0] : null,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(notebookActions, noteActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuCont);
