import React from 'react';
import { MenuItem } from './style';

export default function FlatMenu({items, selectNotebook}) {
  return (
<>
      { items && items.map(prent => (
        <MenuItem onClick={e=>selectNotebook(prent)} key={prent._id}><span></span>{prent.title}</MenuItem>

      ))}
</>

  );
}
