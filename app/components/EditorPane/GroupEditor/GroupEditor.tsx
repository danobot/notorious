import React from 'react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faClock } from "@fortawesome/free-regular-svg-icons";
// import { faHistory, faTrashAlt, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { Padding } from '../style';

export default function GroupEditor({ subNotes, note, noteActions }) {

  return (
    <Padding style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr"}}>
            {subNotes.map(n=><div key={`index-item-${n._id}`}><h5 onClick={e=> noteActions.selectNoteAction(n._id)}>{n.title || "Untitled Note"}</h5></div>)}

          </Padding>
  );
}
