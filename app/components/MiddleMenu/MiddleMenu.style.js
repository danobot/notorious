import styled from 'styled-components';
import { Button } from 'antd';


export const NoteList = styled.div`
/* color: ${props => props.theme.colors.text.dark}; */
 /* margin-bottom: 30px; required to make the last note in scroll list fully visible */
`
export const TopBar = styled.div`
  background: ${props => props.theme.colors.background.menu};
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  /* color: ${props => props.theme.colors.text.dark}; */
  /* height: 40px; */
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


// Layout

export const StickyLayoutWrapper = styled.div`
background: yellow;
  display: grid;
  grid-template-columns: 5%%;
  grid-template-rows: 35px 25px auto;
  height: 100%;
`

export const MiddleMenuStyle = styled(StickyLayoutWrapper)`
  background-color: ${props => props.theme.colors.background.light};
  color: ${props => props.theme.colors.background.dark};
  height: 100%;
`
export const StickyLayoutTitle = styled.div`
  /* background: green; */
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 1;
  grid-column-end: 20;
  vertical-align: center;
  border-top: 1px solid ${props => props.theme.colors.background.lift};
  border-bottom: 1px solid ${props => props.theme.colors.background.lift};

  `
export const StickyLayoutMiddle = styled.div`
/* background: orange; */
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 19;

  justify-content: center;
  align-items: center;
  padding: 5px 0px 1px 5px;
`
export const StickyLayoutAddButton = styled.div`
/* background: orange; */
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 19;
  grid-column-end: 20;
  text-align: center;
  padding: 5px 3px 3px 3px;


`

export const StickyLayoutMain = styled.div`
/* background: brown; */
  grid-row-start: 3;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 20;

`
