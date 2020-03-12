import styled from 'styled-components';

export const NoteCardStyle = styled.div`
  // background-color: green;
  background-color: ${props => props.selected ? props.theme.colors.background.selected : props.theme.colors.background.lift};
  height: 100px;
`
export const NoteListTitle = styled.div`
  color: black;
`
