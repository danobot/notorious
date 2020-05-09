import React from 'react';
import { List } from 'antd';
import NotesWrapper from '../../containers/util/NotesWrapper';
import { FinderListItemStyle } from './utils.style'
export default function FinderResultList({ data, header, onResultClick }) {
    if ( data.length > 0) {
      return <List
      size="small"
      header={<span style={{fontWeight: 'bolder'}}>{header}</span>}
      dataSource={data}
      renderItem={nId => (
        <NotesWrapper key={nId} noteId={nId}>
          {({ note }) => {
            return note ? <FinderListItemStyle><List.Item onClick={e => onResultClick(nId)} style={{padding: '0 0 0 10px', cursor: "pointer"}}>
              {note.title}
            </List.Item> </FinderListItemStyle>: <></>
          }}
        </NotesWrapper>
      )}
      />
    } else {
      return <></>
    }
}
