import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as actions from '../ContentAreaCont/actions';
import * as noteActions from '../../reducers/noteActions';
import { allNotes, findSelectedNote, findChildrenOfNote } from '../MainMenu/selectors';
import MenuItem from '../../components/MainMenu/MenuItem';
import { MenuHeading, MenuItemRightFloat, MenuItemSelected, MenuItemNormal, MenuItemStyle } from '../../components/MainMenu/style';
import {
  ContextMenu,
  MenuItem as ContexMenuItem,
  ContextMenuTrigger
} from 'react-contextmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown, faPlusCircle, faFolder } from '@fortawesome/free-solid-svg-icons';
import { DotLine } from '../../components/util/utils.style';




class TreeMenuCont extends React.Component {
  state = {
    open: false
  }


  render() {
    const {selectedNotebook, selectNotebook, note, subNotes, handlers, children} = this.props
    const {
      cmCreateNotebookInside,
      cmShowInMenuHandler,
      cmDeleteNoteHandler,
      cmOpenInEditor
    } = handlers;
    const {_id, title} = note
    console.log(selectedNotebook)
    const icon = this.state.open ? <FontAwesomeIcon onClick={e=> this.setState({open: false})} icon={faChevronDown} /> : <FontAwesomeIcon onClick={e=> this.setState({open: true})} icon={faChevronRight} />

    // we dont want to close a notebook menu when it is first selected. We want to close it on click (given its already selected) and open it given its closed.
    const singleClickHandler = (selectedNotebook !== _id) ? () => {selectNotebook(note._id);  this.setState({open: true})} : () => {selectNotebook(note._id); this.setState({open: !this.state.open})}
    return <div>

        {subNotes && subNotes.length ===0 && <ContextMenuTrigger id={`main-menu-context-${_id}`} key={`main-menu-context-trigger-a-${_id}`}>

            <MenuItem
            indent={this.props.level*6}
            label={<DotLine>{note.title}</DotLine>}
            icon={<FontAwesomeIcon icon={faFolder} />}
            key={note._id} right={<MenuItemRightFloat>{children.length}</MenuItemRightFloat>}
            selected={selectedNotebook === _id}
            onClickHandler={e=>selectNotebook(note._id)} key={"menucokponent"+_id}
            />
          </ContextMenuTrigger>
          }
        {subNotes && subNotes.length > 0 && <>   <ContextMenuTrigger id={`main-menu-context-${_id}`} key={`main-menu-context-trigger-b-${_id}`}>
        <MenuItem
          key={"menucokponent"+_id} onClickHandler={e=> {singleClickHandler() }}
          indent={this.props.level*6}
          key={"MenuItem"+_id}
          label={
            <MenuHeading>
              <DotLine>{note.title }</DotLine>
            </MenuHeading>
          }
          icon={icon}
          selected={selectedNotebook === _id}

          // right={
          //       <MenuItemRightFloat><FontAwesomeIcon icon={faPlusCircle} /></MenuItemRightFloat>
          // }
          compKey={"parentnotebook"+_id}
        />
        </ContextMenuTrigger>


        { this.state.open && subNotes.map(n=> <TreeMenuContWrapped
            note={n}
            key={"treemendsu"+this.props.level + n._id}
            level={this.props.level+1}
            selectNotebook={selectNotebook}
            children={children}
            handlers={handlers} />) }


        </>
      }
      <ContextMenu key={`main-menu-context-menu-${_id}`} id={`main-menu-context-${_id}`} >


        <ContexMenuItem data={{ note: note }} onClick={cmOpenInEditor}>
          Open in editor
        </ContexMenuItem>
        <ContexMenuItem
          data={{ note: note }}
          onClick={(e, data) => {
            this.setState({open: true})
          cmCreateNotebookInside(e, data)
          }}
        >
          New sub-notebook
        </ContexMenuItem>
        <ContexMenuItem data={{ note: note }} onClick={cmShowInMenuHandler}>
          {note.showInMenu ? (
            <span>Remove from menu</span>
          ) : (
            <span>Show in menu</span>
          )}
        </ContexMenuItem>

        <ContexMenuItem
          data={{ note: note }}
          onClick={cmDeleteNoteHandler}
          style={{ backgroundColor: 'red' }}
          // disabled={note.children && note.children.length>0}
        >
          Delete
        </ContexMenuItem>
      </ContextMenu>
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    allNotes: allNotes(state),
    subNotes: findChildrenOfNote(props.note)(state).filter(n => n.showInMenu), // children that can be displayed in menu
    children: findChildrenOfNote(props.note)(state), // all children
    level: props.level || 0,
    selectedNotebook: state.mainMenu.filter,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, noteActions), dispatch)
}

const TreeMenuContWrapped = connect(mapStateToProps, mapDispatchToProps)(TreeMenuCont)
export default TreeMenuContWrapped;
