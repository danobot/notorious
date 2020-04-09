import React from 'react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faClock } from "@fortawesome/free-regular-svg-icons";
// import { faHistory, faTrashAlt, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Padding } from '../style';

export default function IndexEditor({ subNotes, note, noteActions }) {

  return (
    <Padding>
            <h3>Index of "{note.title || "Untitled"}"</h3>
            <ol style={{marginTop: '10px'}}>
            {subNotes.map(n=><li key={`index-item-${n._id}`}><h5 onClick={e=> noteActions.selectNoteAction(n._id)}>{n.title || "Untitled Note"}</h5></li>)}

            </ol>
          </Padding>
  );
}
