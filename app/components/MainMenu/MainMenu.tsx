import React from 'react';
import { MainMenuStyle } from './style';
import FlatMenu from './FlatMenu';
export default function MainMenu({notebooks, selectNotebook}) {
  return (
      <MainMenuStyle>
        {/* <p>{JSON.stringify(data, true, 2)}</p> */}
        <h2>FastNote</h2>
        {/* <TreeMenu items={data && data.results}/> */}
        <FlatMenu items={notebooks } selectNotebook={selectNotebook} />

      </MainMenuStyle>
  );
}
