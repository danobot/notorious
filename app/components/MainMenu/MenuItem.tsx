import React, {useState} from 'react';
import { MenuItemStyle, MenuItemIcon, MenuItemLabel, MenuItemNormal, MenuItemSelected } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrop } from 'react-dnd';
import { faCaretSquareRight, faCaretSquareDown, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import { DragItemTypes } from '../../utils/DragItemTypes';

export default function MenuItem({
  noteId,
  onClickHandler = () => {},
  cacheParentId = () => {},
  icon,
  label,
  compKey,
  right,
  indent,
  droppable=false,
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
    // console.log("MainItem "+noteId)
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragItemTypes.NOTE,
    drop: (data) => {
      cacheParentId()
      return { name: noteId}
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  })
  const isActive = canDrop && isOver && droppable
  let style = {};
  if (isActive) {
    style.backgroundColor = '#292d4e';
    // style.border= '1px solid white';
  } else if (canDrop && droppable) {
    // style.backgroundColor = 'blue'
  }
  return (
    <MenuItemComponent
    style={style}
    ref={drop}
    >
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
        { right }
      </MenuItemStyle>
      {v ? children : <></>}
    </MenuItemComponent>
  );
}

