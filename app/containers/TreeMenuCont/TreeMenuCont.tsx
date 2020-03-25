import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MiddleMenu from '../../components/MiddleMenu/MiddleMenu';
import * as actions from '../ContentAreaCont/actions';
import * as noteActions from '../../reducers/noteActions';
import { allNotes, findSelectedNote, findChildrenOfNote } from '../MainMenu/selectors';
import MenuItem from '../../components/MainMenu/MenuItem';
import { MenuHeading, MenuItemRightFloat, MenuItemSelected, MenuItemNormal, MenuItemStyle } from '../../components/MainMenu/style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown, faPlusCircle, faFile } from '@fortawesome/free-solid-svg-icons';
import { DotLine } from '../../components/util/utils.style';




class TreeMenuCont extends React.Component {
  state = {
    open: false
  }


  render() {
    const {selectedNotebook, selectNotebook, note, subNotes} = this.props
    const {_id, title} = note
    const icon = this.state.open ? <FontAwesomeIcon onClick={e=> this.setState({open: false})} icon={faChevronDown} /> : <FontAwesomeIcon onClick={e=> this.setState({open: true})} icon={faChevronRight} />
    const MenuItemComponent = (selectedNotebook === _id) ? MenuItemSelected : MenuItemNormal
    return <div>
        {subNotes && subNotes.length ===0 && <MenuItemComponent onClick={e=>selectNotebook(note._id)} key={"menucokponent"+_id}>
          <MenuItem indent={this.props.level*6} label={<DotLine>{note.title}</DotLine>} icon={<FontAwesomeIcon icon={faFile} />}
           key={note._id} right={<MenuItemRightFloat>{note.children.length}</MenuItemRightFloat>}
           >

           </MenuItem>
          </MenuItemComponent>}
        {subNotes && subNotes.length > 0 && <>       <MenuItemComponent key={"menucokponent"+_id} onClick={e=>selectNotebook(note._id)}>  <MenuItem
        indent={this.props.level*6}
          key={"MenuItem"+_id}
          label={
            <MenuHeading>
              <DotLine>{note.title }</DotLine>
            </MenuHeading>
          }
          icon={icon}
          right={
                <MenuItemRightFloat><FontAwesomeIcon icon={faPlusCircle} /></MenuItemRightFloat>
          }
          compKey={"parentnotebook"+_id}
        /> </MenuItemComponent>


        { this.state.open && subNotes.map(n=> <TreeMenuContWrapped note={n} key={"treemendsu"+this.props.level + n._id} level={this.props.level+1} selectNotebook={selectNotebook}
          selectedNotebook={selectedNotebook}/>) }
        </>
      }
    </div>;
  }
}

function mapStateToProps(state, props) {
  return {
    allNotes: state.notes,
    subNotes: findChildrenOfNote(props.note)(state).filter(n => n.showInMenu),
    level: props.level || 0,
    selectedNotebook: state.mainMenu.filter,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(Object.assign(actions, noteActions), dispatch)
}

const TreeMenuContWrapped = connect(mapStateToProps, mapDispatchToProps)(TreeMenuCont)
export default TreeMenuContWrapped;
