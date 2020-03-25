import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faFile,
  faTrash,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  ContextMenu,
  MenuItem as ContexMenuItem,
  ContextMenuTrigger
} from 'react-contextmenu';
import { Button } from 'antd';
import { MainMenuStyle, MenuHeading, MenuItemRightFloat } from './style';
import FlatMenu from './FlatMenu';
import MenuItem from './MenuItem';

import ModalForm from '../util/ModalForm';
import TreeMenu from './TreeMenu';
import TreeMenuCont from '../../containers/TreeMenuCont/TreeMenuCont';

export default function MainMenu({
  notebooks,
  selectNotebook,
  selectedNotebook,
  showNotebookModalToggle,
  hideNotebookModal,
  showNotebookModal,
  createNotebook
}) {
  const contextCreateNewNotebook = (e, data) => {
    showNotebookModal();
  };
  const contextAction = (e, data) => {
    console.log(data.foo);
  };
  const newNotebookSubmitAction = data => {
    hideNotebookModal();
    console.log('newNotebookSubmitAction', data);
    createNotebook({ title: data.value });
  };
  return (
    <MainMenuStyle>
      {/* <p>{JSON.stringify(data, true, 2)}</p> */}

      <MenuItem
        label="All notes"
        icon={<FontAwesomeIcon icon={faBook} />}
        compKey="allNotesMenuItem"
        onClickHandler={e=> selectNotebook("ALL")}
      />

      <MenuItem
        label="Trash"
        icon={<FontAwesomeIcon icon={faTrash} />}
        compKey="trashMenuItem"
        onClickHandler={e=> selectNotebook("TRASH")}

      />
      {/* <TreeMenu items={data && data.results}/> */}
      <ContextMenuTrigger id="mainmenu_notebooks">
        <MenuItem
          label={<MenuHeading>Notebooks</MenuHeading>}
          skipIcon={true}
          right={
            <MenuItemRightFloat>
              <FontAwesomeIcon
                onClick={e => contextCreateNewNotebook(e, null)}
                icon={faPlusCircle}
              />
            </MenuItemRightFloat>
          }
          compKey="Notebooks"
        />
      </ContextMenuTrigger>

      {notebooks.map(n => (
        <TreeMenuCont
          note={n}
          key={`treemenu${n._id}`}
          selectNotebook={selectNotebook}
          selectedNotebook={selectedNotebook}
        />
      ))}
      {/* <FlatMenu
        items={notebooks}
        selectNotebook={selectNotebook}
        selectedNotebook={selectedNotebook}
      /> */}
      <ContextMenu id="mainmenu_notebooks">
        <ContexMenuItem
          data={{ foo: 'bar' }}
          onClick={contextCreateNewNotebook}
        >
          New Notebook
        </ContexMenuItem>
      </ContextMenu>

      <ModalForm
        visible={showNotebookModalToggle}
        title="Create Notebook"
        placeholder="Notebook title"
        formSubmitHandler={newNotebookSubmitAction}
        initialValue=""
        handleCancel={e => hideNotebookModal()}
      />
    </MainMenuStyle>
  );
}
