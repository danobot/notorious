import React from 'react';
import { MainMenuStyle, MenuHeading } from './style';
import FlatMenu from './FlatMenu';
import MenuItem from './MenuItem';
import {
  ContextMenu,
  MenuItem as ContexMenuItem,
  ContextMenuTrigger
} from 'react-contextmenu';

import ModalForm from '../util/ModalForm';

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
    console.log(data.foo);
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
      <ContextMenuTrigger id="mainmenu_notebooks">
        <MenuItem
          label={
            <MenuHeading>
              <span></span>Notebooks
            </MenuHeading>
          }
          compKey="Notebooks"
        />
      </ContextMenuTrigger>
      <MenuItem label={'Test menu Item'} compKey="ye" />
      {/* <TreeMenu items={data && data.results}/> */}
      <FlatMenu
        items={notebooks}
        selectNotebook={selectNotebook}
        selectedNotebook={selectedNotebook}
      />
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
        initialValue={''}
        handleCancel={e => hideNotebookModal()}
      />
    </MainMenuStyle>
  );
}
