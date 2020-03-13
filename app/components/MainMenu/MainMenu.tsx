import React from 'react';
import { MainMenuStyle, MenuHeading } from './style';
import FlatMenu from './FlatMenu';
import MenuItem from './MenuItem';
export default function MainMenu({notebooks, selectNotebook, selectedNotebook}) {
  return (
      <MainMenuStyle>
        {/* <p>{JSON.stringify(data, true, 2)}</p> */}

        <MenuItem label={ <MenuHeading><span></span>Notebooks</MenuHeading>} compKey="Notebooks"/>
        {/* <TreeMenu items={data && data.results}/> */}
        <FlatMenu items={notebooks } selectNotebook={selectNotebook} selectedNotebook={selectedNotebook} />

      </MainMenuStyle>
  );
}
