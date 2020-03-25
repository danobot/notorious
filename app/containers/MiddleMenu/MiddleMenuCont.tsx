import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as actions from '../ContentAreaCont/actions';
import * as noteActions from '../../reducers/noteActions';
import { savingNew } from '../MainMenu/selectors';





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
  const noteSetSelector = (filter, notes) => {
    switch(filter) {
      case "ALL":
        return notes
      case "TRASH":
        return notes.filter(i => i.trashed)
      default:
        return notes.filter(i => (i.parent === filter))
      }
    }
  return {
    selection: state.mainMenu.filter,
    visibleNotes: noteSetSelector(state.mainMenu.filter, state.notes),
    selectedNote: state.contentArea.selectedNote,
    savingNew: savingNew()
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, noteActions), dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MiddleMenuCont);
