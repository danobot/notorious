import styled from 'styled-components';
import { Button } from 'antd';

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
/* color: ${props => props.theme.colors.text.dark}; */
 margin-bottom: 30px; /* required to make the last note in scroll list fully visible */
`
export const TopBar = styled.div`
  background: ${props => props.theme.colors.background.menu};
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  /* color: ${props => props.theme.colors.text.dark}; */
  height: 40px;
  width: 100%;
  z-index: 2;
  padding: 7px 5px 7px 5px;
`

export const NotoriousButtonStyle = styled(Button)`
  border: none;
  background: transparent;

  .ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active {
    background-color: ${props => props.theme.colors.background.selected};
    background: transparent;
  }

`
export const MiddleLayout = styled.div`

`

export const TopBarItem = styled.div`
  display: table-cell;
  margin: 0 3px 0 0;
  width: 100%;
  padding: 2px;
`



export const TopBarButton = styled.div`

border: none;
`
