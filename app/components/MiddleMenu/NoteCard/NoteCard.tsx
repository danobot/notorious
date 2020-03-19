import React from 'react';
import { NoteCardStyle, NoteListTitle, NotePreview, NoteTags, NoteCardMeta } from './NoteCard.style';
const removeMd = require('remove-markdown');
import EllipsisText from "react-ellipsis-text";
import { Tag } from 'antd';
import Moment from "react-moment";

export default function NoteCard(props) {
  const {title, content, tags, _id, createdAt, updatedAt} = props.note
  return (
    <NoteCardStyle key={_id+'stye'} onClick={e=>props.handleClick(props.note)} selected={props.selected}>
      <NoteListTitle>{title || "Untitled Note"}</NoteListTitle>
      <NoteCardMeta><Moment fromNow>{createdAt}</Moment></NoteCardMeta>
      <NoteTags>
        {tags && tags.length > 0 && tags.map(t=><Tag key={`${_id}-${t}` }>{t}</Tag>)}
      </NoteTags>
      <NotePreview>
        <EllipsisText text={removeMd(content)} length={60} />
      </NotePreview>

    </NoteCardStyle>
  );
}
