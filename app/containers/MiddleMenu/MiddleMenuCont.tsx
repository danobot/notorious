import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as actions from '../ContentAreaCont/actions';
import * as noteActions from '../../reducers/noteActions';





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
  return {
    selection: state.mainMenu.nbSelection,
    visibleNotes: state.notes.filter(i => (state.mainMenu.nbSelection && i.parent === state.mainMenu.nbSelection)),
    selectedNote: state.contentArea.selectedNote,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, noteActions), dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MiddleMenuCont);
