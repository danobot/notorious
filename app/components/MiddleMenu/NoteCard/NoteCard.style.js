import styled from 'styled-components';

export const NoteCardStyle = styled.div`
  // background-color: green;
  background-color: ${props => props.selected ? props.theme.colors.background.selected : 'inherit'};
  height: 100px;
  padding: 5px;
  overflow: hidden;
  border-bottom: 1px solid ${props => props.theme.colors.background.lift};
  color: ${props => props.selected ? props.theme.colors.text.light : props.theme.colors.text.muted};
  .noteListTitle {
    color: ${props => props.selected ? props.theme.colors.text.light : props.theme.colors.text.black};
    font-weight: bold;
  }

  .noteCardMeta {
    font-size: 80%;

  }
  .noteTags {
    .ant-tag {
      font-size: 8pt;
      padding: 0px 2px 0px 2px;
      margin-right: 2px;
      border-radius: 1px;
      border: none;
      color: ${props => props.selected ? props.theme.colors.text.light : props.theme.colors.text.black};
      background: transparent;

    }
  }
`

