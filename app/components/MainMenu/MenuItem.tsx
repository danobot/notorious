import React from 'react';
import { MenuItemStyle } from './style';

export default function MenuItem({onClickHandler=()=>{}, icon, label, compKey}) {
  return (
      <MenuItemStyle onClick={e=>onClickHandler()} key={compKey}>
          <span>{icon}</span>
          {label}
          <span className="float-right">Test</span>
          </MenuItemStyle>
  );
}
