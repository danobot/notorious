import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as contentAreaActions from '../ContentAreaCont/actions';
import * as actions from './actions';
import * as noteActions from '../../reducers/noteActions';
import { allNotes } from '../MainMenu/selectors';
import { alphaTitleSorter, alphaTitleSorterReverse, customNoteSorter, updatedAtSorter } from '../../utils/utils';





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
  const notebookLabelMaker = (filter, notes, middleMenu) => {
    if (typeof filter === "object") {
      if (middleMenu.search) {
        return "Search: " + middleMenu.search

      } else {
        return filter
      }
    }
    if (filter && filter.indexOf("tag::") > -1 ) {
      const tag = filter.split("::")[1]
      return "Tag: " + tag
    }

    switch(filter) {
      case "ALL":
        return "All Notes"
      case "TRASH":
        return "Trash"
      case "FAV":
        return "My Favourites"
      default:
        const match = notes.filter(i => (i._id === filter))
        if (match.length === 1){
          return match[0].title
        }
        return ""
      }
  }
  const noteSetSelector = (filter, allNotes, notes) => {
    // console.log("noteSetSelector", filter)
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
  const noteSorter = (notes, middleMenu) => {

    switch(middleMenu.sorter) {
      case actions.SORT_ALPHA:
        return notes.sort(alphaTitleSorter)
      case actions.SORT_ALPHA_REVERSE:
        return notes.sort(alphaTitleSorterReverse)
      case actions.SORT_UPDATED_AT:
        return notes.sort(updatedAtSorter)
      case actions.SORT_CUSTOM:
        return notes.sort(customNoteSorter)
      default:
        return notes
      }
    }

  return {
    selection: state.mainMenu.filter,
    visibleNotes: noteSorter(noteSetSelector(state.mainMenu.filter, allNotes(state), state.notes), state.middleMenu),

    // visibleNotes: noteSetSelector(state.mainMenu.filter, allNotes(state), state.notes),
    addButtonDisabled: state.mainMenu.filter === "TRASH",
    selectedNote: state.contentArea.selectedNote,
    headerLabel: notebookLabelMaker(state.mainMenu.filter, state.notes, state.middleMenu),
    sorter: state.middleMenu.sorter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(contentAreaActions, noteActions, actions), dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MiddleMenuCont);
