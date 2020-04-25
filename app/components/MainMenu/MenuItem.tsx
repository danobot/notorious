import React, {useState} from 'react';
import { MenuItemStyle, MenuItemIcon, MenuItemLabel, MenuItemNormal, MenuItemSelected } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCaretSquareRight, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

export default function MenuItem({
  onClickHandler = () => {},
  icon,
  label,
  compKey,
  right,
  indent,
  collapsible=false,
  visible=false,
   skipIcon=false,
   selected,
   children
}) {
  const MenuItemComponent = (selected) ? MenuItemSelected : MenuItemNormal;
  const [v, setVis] = useState(visible )
  const handleClick = () => {
    setVis(!v)
  }
  return (
    <MenuItemComponent>
      <MenuItemStyle
        onClick={e => onClickHandler()}
        key={compKey}
        indent={indent}
      >
        {!collapsible && !skipIcon && <MenuItemIcon onClick={e => handleClick()}>{icon}</MenuItemIcon>}
        {collapsible && <MenuItemIcon onClick={e => handleClick()}>{<FontAwesomeIcon style={{fontSize: '11pt'}}
            icon={v ? faCaretSquareDown : faCaretSquareRight}
          />}</MenuItemIcon>}
        <MenuItemLabel>{label}</MenuItemLabel>
        {right}
      </MenuItemStyle>
      {v ? children : <></>}
    </MenuItemComponent>
  );
}

