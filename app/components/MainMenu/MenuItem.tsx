import React, {useState} from 'react';
import { MenuItemStyle, MenuItemIcon, MenuItemLabel, MenuItemNormal, MenuItemSelected } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrop } from 'react-dnd'
import { faCaretSquareRight, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { DragItemTypes } from '../../utils/dragItemTypes';

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
  const [id, setId] = useState( )
  const handleClick = () => {
    setVis(!v)
  }
    // console.log("MainItem "+noteId)
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragItemTypes.NOTE,
    drop: (data) => {
      cacheParentId()
      return { name: id}
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  })
  // const isActive = canDrop && isOver
  // let style = {}
  // if (isActive) {
  //   style.backgroundColor = 'darkgreen'
  // } else if (canDrop && droppable) {
  //   style.backgroundColor = 'darkkhaki'
  // }
  return (
    <MenuItemComponent
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
        {right}
      </MenuItemStyle>
      {v ? children : <></>}
    </MenuItemComponent>
  );
}

