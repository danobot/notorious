import React from 'react';
import { MenuItemStyle, MenuItemIcon, MenuItemLabel } from './style';

export default function MenuItem({
  onClickHandler = () => {},
  icon,
  label,
  compKey,
  right,
  indent,
   skipIcon=false
}) {
  return (
    <MenuItemStyle
      onClick={e => onClickHandler()}
      key={compKey}
      indent={indent}
    >
      {!skipIcon && <MenuItemIcon>{icon}</MenuItemIcon>}
      <MenuItemLabel>{label}</MenuItemLabel>
      {right}
    </MenuItemStyle>
  );
}

