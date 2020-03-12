import styled from 'styled-components';

export const MiddleMenuStyle = styled.div`
  background-color: ${props => props.theme.colors.background.light};
  color: ${props => props.theme.colors.background.dark};
  height: 100%;
`
export const MiddleMenuStyleOld = styled.div`
  margin-left: 200px;
  width: 300px;
  // background-color: ${props => props.theme.colors.background.light};
  color: ${props => props.theme.colors.background.dark};
  position: fixed;
  height: 100%;
  overflow: auto;
  top: 0;
`
export const NoteList = styled.div`
// color: ${props => props.theme.colors.text.dark};
`
export const TopBar = styled.div`
// color: ${props => props.theme.colors.text.dark};
`
export const MiddleLayout = styled.div`

`
export const NoteList2= styled.div`
flex: 1 auto;
margin: 0;
padding: 0;
  width: 100%;
  outline: none;
  height: 100%;
  overflow: auto;
`
export const TopBar2 = styled.div`
color: green;
`
export const MiddleLayout2 = styled.div`
  flex-direction: column;
  flex: 1 auto;

`
