import styled from 'styled-components';
import { Tree } from 'antd';
const { TreeNode } = Tree;


export const MainMenuStyle = styled.div`

  background-color: ${props => props.theme.colors.background.dark}  !important;
  color: ${props => props.theme.colors.text.light} !important;

  height: 100%;
 /* cursor: pointer; */


`
export const NoteHeader = styled.div`
  margin: 10px 10px 10px 10px;
  z-index: 10;
`
export const NoteTitle = styled.h1`

`
export const NoteMeta = styled.div`
  margin: 5px 0 5px 0;
  color: ${props => props.theme.colors.text.muted}
`

export const NoteMetaIcon = styled.span`
  margin-right: 5px;
`
export const EditorStyle = styled.div`
  border: none;
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

export const MainMenuStyleOld = styled.div`
  margin: 0;
  padding: 0;
  // width: 200px;
  background-color: ${props => props.theme.colors.background.dark};
  color: ${props => props.theme.colors.text.light} !important;
  // position: fixed;
  height: 100%;
  overflow: auto;
  .ant-tree-node-content-wrapper, .ant-tree, .ant-tree-title,  {
    color: ${props => props.theme.colors.text.light} !important;
    &.ant-tree-node-selected, &.ant-tree-node-content-wrapper-normal {
      background-color: ${props => props.theme.colors.background.dark};

    }
  };


`
export const MenuItem = styled.div`
  height: 25px;
  cursor: hand;
`
export const MyInput = styled.div`
.ant-input, .ant-input:focus {
  border: none;
  border-color: ${props => props.theme.colors.text.light};
  outline: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
`

export const CustomSelect = styled.div`
  .rs__value-container, .rs__control, .rs__control--is-focused, .rs__control--menu-is-open {
    border: none;
    padding: 0;
    outline: none;
    border-color: 'transparent' !important;
    box-shadow: 'none' !important;

`
