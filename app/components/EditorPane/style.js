import styled from 'styled-components';
import { Tree } from 'antd';
import { TopBar } from '../MiddleMenu/MiddleMenu.style';
const { TreeNode } = Tree;


export const MainMenuStyle = styled.div`

  background-color: ${props => props.theme.colors.background.dark}  !important;
  color: ${props => props.theme.colors.text.light} !important;

  height: 100%;
 /* cursor: pointer; */


`
export const NoteHeader = styled(TopBar)`
  /* padding: 10px 10px 0 10px; */
  z-index: 10;
`
export const NoteTitle = styled.h1`

`
export const NoteMeta = styled.div`
  padding: 2px 0 2px 5px;
  vertical-align: center;
  color: ${props => props.theme.colors.text.muted}
`

export const NoteMetaIcon = styled.span`
  margin-right: 5px;
`
export const EditorStyle = styled.div`
  border: none;

  width: 100%;

  .CodeMirror {
    border-left: none;
    border-right: none;
    border-radius: 0;
    z-index: 0;
  }
  .editor-toolbar {
    color: ${props => props.theme.colors.text.muted};
    border-top: none;
    border-left: none;
    border-right: none;

  }
`

export const MenuItem = styled.div`
  height: 25px;
  cursor: hand;
`

export const Padding = styled.div`
  padding: 0px 5px 0px 5px;
  display: block;
  width: 100%;
`
export const MyInput = styled.div`
.ant-input, .ant-input:focus {
  border: none;
  width: 100%;
  border-color: ${props => props.theme.colors.text.light};
  outline: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  width:100%;
}
`

export const CustomSelect = styled.div`
z-index: 1000;
.rs__indicators {
  visibility: hidden;
}
.rs__value-container, .rs__control, .rs__control--is-focused, .rs__control--menu-is-open {
  border: none;
  padding: 0;
  outline: none;
  border-color: 'transparent' !important;
  box-shadow: 'none' !important;
  z-index: 1000;
}
.rs__menu {
    z-index: 1000;
  }
`


/* Wrapper */
export const EditorPaneStyle = styled.div`
  /* background: yellow; */
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px 40px 40px auto;
  height: 100%;

`


export const EditorRowMeta = styled.div`
  /* background: green; */
  grid-row-start: 1;
  grid-row-end: 1;
  width: 100%;
  position: sticky;


`
export const EditorRowTitle = styled.div`
  /* background: orange; */
  grid-row-start: 2;
  grid-row-end: 2;
  width: 100%;
  position: sticky;


`
export const EditorRowTags = styled.div`
  /* background: purple; */
  grid-row-start: 3;
  grid-row-end: 3;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.background.lift};
`

export const EditorRowMain = styled.div`
  /* background: brown; */
  grid-row-start: 4;
  grid-row-end: 4;
  overflow: hidden;

`


