import React from 'react';
import { NoteCardStyle, NoteListTitle } from './NoteCard.style';

export default function NoteCard(props) {
  const {title} = props.note
  return (
    <NoteCardStyle onClick={e=>props.handleClick(props.note)}>
      <NoteListTitle>{title}</NoteListTitle>
    </NoteCardStyle>
  );
}
