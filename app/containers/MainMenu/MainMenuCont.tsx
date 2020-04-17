import React, { PureComponent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainMenu from '../../components/MainMenu/MainMenu';
import { notebookSelector, findExistingTags } from './selectors'
import { MainMenuStateType } from '../../reducers/types';
import * as actions from './actions';
import * as notebookActions from '../../reducers/notebookActions';
import * as noteActions from '../../reducers/noteActions';
import * as modalActions from '../../reducers/modalActions';
import * as contentAreaActions from '../ContentAreaCont/actions';
import * as homeActions from '../HomePage/actions';
import { menuItemSorter, alphaSorter } from '../../utils/utils';
import { waitSync } from 'redux-pouchdb';



class MainMenuCont extends PureComponent {
  //  componentDidUpdate = (prevProps) => {
  //    if (prevProps.notes !== this.props.notes) {
  //     const { syncNotesSuccess, syncNotesError} = this.props
  //     waitSync("notes").then(d => {
  //       syncNotesSuccess()
  //     }).catch(e=> {
  //       console.log("error sync: ", e)
  //       syncNotesError()
  //     })
  //   }
  // }
  render() {

    return <MainMenu {...this.props}/>;

  }
}

function mapStateToProps(state: MainMenuStateType) {
  return {
    notebooks: notebookSelector(state).filter( n => n.parent === "root").sort(menuItemSorter),
    selectedNotebook: state.configs ? state.configs.selectedNotebook : null,
    modals: state.modals,
    tags: findExistingTags(state).sort(alphaSorter),
    notesSync: state.settings.notesSync,
    syncType: state.settings.syncType,
    spinner: state.settings.spinner,
    ...state.mainMenu

  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, modalActions, notebookActions, noteActions,contentAreaActions, homeActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuCont);
