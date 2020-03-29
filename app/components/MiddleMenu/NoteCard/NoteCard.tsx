import React from 'react';
import EllipsisText from 'react-ellipsis-text';
import { Tag } from 'antd';
import Moment from 'react-moment';
import styled from 'styled-components';

import {
  ContextMenu,
  ContextMenuTrigger,
  MenuItem,
  SubMenu
} from 'react-contextmenu';
import {
  NoteCardStyle,
} from './NoteCard.style';
import { RightFloaty } from '../../../style/utils.style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock, faListAlt  } from "@fortawesome/free-regular-svg-icons";
import {  faFolderOpen, faInbox, faColumns, faTasks, faFile, faThumbtack, faTh, faStream} from "@fortawesome/free-solid-svg-icons";

const removeMd = require('remove-markdown');
export const InlineItem = styled.div`
  display: inline;
  margin-right: 3px;
  font-size: smaller;
  > .svg-inline--fa {
    margin-right: 2px;
  }
`
export default function NoteCard(props) {
  const {
    cmPinNoteHandler,
    cmCreateChildNoteHandler,
    cmShowInMenuHandler,
    cmChangeKindHandler,
    cmDeleteNoteHandler
  } = props.handlers;
  const { title, content, tags, _id, createdAt, updatedAt,children, kind, pinned, showInMenu } = props.note;
  return (
    <>
      <ContextMenuTrigger id={`${_id}cm`}>
        <NoteCardStyle
          key={`${_id}style`}
          onClick={e => props.handleClick(props.note._id)}
          {...props}
        >
          <div className="noteListTitle">{title || 'Untitled Note'}</div>
          <div className="noteCardMeta">
            {children && children.length > 0 && <InlineItem><FontAwesomeIcon icon={faFolderOpen} title={`Contains ${children.length} subnotes`} />{children.length}</InlineItem>}
            <InlineItem title={new Date(createdAt)}><Moment fromNow>{createdAt}</Moment></InlineItem>

            {tags &&
              tags.length > 0 &&<InlineItem >{ tags.map(t => <span style={{marginLeft: '3px', fontStyle: 'italic'}}>{t}</span>) }</InlineItem>}
            <RightFloaty>
              {pinned && <InlineItem><FontAwesomeIcon title="This note is pinned" icon={faThumbtack} /></InlineItem>}
              {showInMenu && <InlineItem><FontAwesomeIcon title="Shown in menu" icon={faStream} /></InlineItem>}
              {kind === 'collection' && <InlineItem><FontAwesomeIcon title="Note Type: Collection" icon={faInbox} /></InlineItem>}
              {kind === 'tasks' && <InlineItem><FontAwesomeIcon title="Note Type: tasks" icon={faTasks} /></InlineItem>}
              {kind === 'index' && <InlineItem><FontAwesomeIcon title="Note Type: index" icon={faListAlt} /></InlineItem>}
              {kind === 'columns' && <InlineItem><FontAwesomeIcon title="Note Type: columns" icon={faColumns} /></InlineItem>}
              {kind === 'group' && <InlineItem><FontAwesomeIcon title="Note Type: group" icon={faTh} /></InlineItem>}

            </RightFloaty>
          </div>
          <div className="noteTags">

          </div>
            <div className="notePreview">
            <EllipsisText text={removeMd(content)} length={60} />

            </div>
        </NoteCardStyle>
      </ContextMenuTrigger>

      <ContextMenu id={`${_id}cm`} key={`${_id}cm`}>
        <MenuItem data={{ note: props.note }} onClick={cmPinNoteHandler}>
          {props.note.pinned ? <span>Unpin</span> : <span>Pin to top</span>}
        </MenuItem>
        <MenuItem
          data={{ note: props.note }}
          onClick={cmCreateChildNoteHandler}
        >
          New sub-note
        </MenuItem>
        <MenuItem data={{ note: props.note }} onClick={cmShowInMenuHandler}>
          {props.note.showInMenu ? (
            <span>Remove from menu</span>
          ) : (
            <span>Show in menu</span>
          )}
        </MenuItem>
        <SubMenu title="Change kind to..." delay={0}>
          <MenuItem
            data={{ note: props.note, kind: 'collection' }}
            onClick={cmChangeKindHandler}
          >
           <FontAwesomeIcon icon={faFolderOpen} /> Collection
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'index' }}
            onClick={cmChangeKindHandler}
          >
           <FontAwesomeIcon icon={faListAlt} /> Index
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'tasks' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faTasks} /> Tasks
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'columns' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faColumns} /> Column
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'group' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faTh} /> Group
          </MenuItem>
          <MenuItem
            data={{ note: props.note, kind: 'normal' }}
            onClick={cmChangeKindHandler}
          >
            <FontAwesomeIcon icon={faFile} />  Normal
          </MenuItem>
        </SubMenu>
        <MenuItem
          data={{ note: props.note }}
          onClick={cmDeleteNoteHandler}
          style={{ backgroundColor: 'red' }}
        >
          Delete
        </MenuItem>
      </ContextMenu>
    </>
  );
}
