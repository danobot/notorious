import React from 'react';
import { MenuItemStyle, MenuItemIcon, MenuItemLabel, MenuItemNormal, MenuItemSelected } from './style';

export default function MenuItem({
  onClickHandler = () => {},
  icon,
  label,
  compKey,
  right,
  indent,
   skipIcon=false,
   selected
}) {
  const MenuItemComponent = (selected) ? MenuItemSelected : MenuItemNormal;

  return (
    <MenuItemComponent>
      <MenuItemStyle
        onClick={e => onClickHandler()}
        key={compKey}
        indent={indent}
      >
        {!skipIcon && <MenuItemIcon>{icon}</MenuItemIcon>}
        <MenuItemLabel>{label}</MenuItemLabel>
        {right}
      </MenuItemStyle>
    </MenuItemComponent>
  );
}

