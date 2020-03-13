import styled from 'styled-components';

export const NoteCardStyle = styled.div`
  // background-color: green;
  background-color: ${props => props.selected ? props.theme.colors.background.selected : 'inherit'};
  height: 100px;
  padding: 5px;
  overflow: hidden;
  border-bottom: 1px solid ${props => props.theme.colors.background.lift};
`
export const NoteListTitle = styled.div`
  color: black;
  font-weight: bold;
`
export const NoteCardMeta = styled.div`
  color: ${props => props.theme.colors.text.coloured };
  font-size: 80%;
`
export const NotePreview = styled.div`
  color: ${props => props.theme.colors.text.muted };
`
export const NoteTags = styled.div`
  .ant-tag {
    font-size: x-small;
    padding: 0px 2px 0px 2px;
    margin-right: 2px;
    border-radius: 1px;
  }
`
