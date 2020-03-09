import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as actions from '../ContentAreaCont/actions';

// import { MiddleMenuStateType } from '../../reducers/types';

const URL = "classes/Note"
class MiddleMenuCont extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if (prevProps.selection !== this.props.selection && this.props.selection) {

    }
  }
  render() {
    return <MiddleMenu {...this.props}/>;
  }
}

function mapStateToProps(state) {
  return {
    selection: state.mainMenu.nbSelection,
    visibleNotes: state.notes
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MiddleMenuCont);
