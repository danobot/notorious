import React, { useState, useRef } from 'react';


import SimpleMDE from "react-simplemde-editor";
import FieldForm from './FieldForm/FieldForm';
import Moment from "react-moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faHistory, faTrashAlt, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default function CollectionEditor({ subNotes, noteActions }) {

  return (
    <>
      {subNotes.map(editor => <p>{editor.title}</p>)}

    </>
  );
}
