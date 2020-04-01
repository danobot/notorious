import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as contentAreaActions from '../ContentAreaCont/actions';
import * as actions from './actions';
import * as noteActions from '../../reducers/noteActions';
import { allNotes } from '../MainMenu/selectors';





class MiddleMenuCont extends React.PureComponent {
  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.selection !== this.props.selection && this.props.selection) {

  //   }
  // }
  render() {
    return <MiddleMenu {...this.props}/>;
  }
}
function mapStateToProps(state) {
  const noteSetSelector = (filter, allNotes, notes) => {
    console.log("noteSetSelector", filter)
    if (typeof filter === "object") {
      return allNotes.filter(n => filter.indexOf(n._id) > -1)
    }
    if (filter && filter.indexOf("tag::") > -1 ) {
      const tag = filter.split("::")[1]
      return allNotes.filter(n => n.tags && n.tags.indexOf(tag) > -1)
    }

    switch(filter) {
      case "ALL":
        return allNotes
      case "TRASH":
        return notes.filter(i => i.deleted)
      case "FAV":
        return allNotes.filter(i => i.starred)
      default:
        return allNotes.filter(i => (i.parent === filter))
      }
    }
  return {
    selection: state.mainMenu.filter,
    visibleNotes: noteSetSelector(state.mainMenu.filter, allNotes(state), state.notes),
    addButtonDisabled: state.mainMenu.filter === "TRASH",
    selectedNote: state.contentArea.selectedNote
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(contentAreaActions, noteActions, actions), dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MiddleMenuCont);
