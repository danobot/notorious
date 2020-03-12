import React from 'react';
import { MenuItem,MenuItemSelected } from './style';

export default function FlatMenu({items, selectNotebook, selectedNotebook}) {
  let style = {}
  return (
<>
      { items && items.map(item => (selectedNotebook === item._id ? <MenuItemSelected onClick={e=>selectNotebook(item)} key={item._id}><span></span>{item.title}</MenuItemSelected> :
        <MenuItem onClick={e=>selectNotebook(item)} key={item._id}><span></span>{item.title}</MenuItem>
      ))}
</>

  );
}
