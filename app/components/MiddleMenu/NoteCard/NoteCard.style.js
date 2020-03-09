import styled from 'styled-components';

export const NoteCardStyle = styled.div`
  background-color: ${props => props.selected ? props.theme.colors.background.selected : props.theme.colors.background.light};
  height: 100px;
`
export const NoteListTitle = styled.div`
  color: black;
`
