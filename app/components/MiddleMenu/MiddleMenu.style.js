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
margin-top: 50px;
`
export const TopBar = styled.div`
  position: absolute;
  // color: ${props => props.theme.colors.text.dark};
  height: 50px;
  width: 100%;
  z-index: 2;
`

export const MiddleLayout = styled.div`

`
