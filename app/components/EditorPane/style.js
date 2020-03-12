import styled from 'styled-components';
import { Tree } from 'antd';
const { TreeNode } = Tree;


export const MainMenuStyle = styled.div`

  background-color: ${props => props.theme.colors.background.dark}  !important;
  color: ${props => props.theme.colors.text.light} !important;

  height: 100%;
// cursor: pointer;


`
export const NoteHeader = styled.div`
  margin: 10px 10px 10px 10px;
`
export const NoteTitle = styled.h1`

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
  height: 25px'
cursor: hand;
`
