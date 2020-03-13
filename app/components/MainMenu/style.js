import styled from 'styled-components';
import { Tree } from 'antd';
const { TreeNode } = Tree;


export const MainMenuStyle = styled.div`

  background-color: ${props => props.theme.colors.background.dark}  !important;
  color: ${props => props.theme.colors.text.light} !important;

  height: 100%;
// cursor: pointer;


`
export const MenuHeading = styled.h3`
  padding: 0 0 0 0;
  color: ${props => props.theme.colors.text.muted} !important;
  font-size: 90%;
  font-weight: bold;
`

export const MenuItemNormal = styled.div`
`
export const MenuItemStyle = styled.div`
  padding: 10px 10px 10px 10px;
`
export const MenuItemSelected = styled(MenuItemNormal)`
  background-color: ${props => props.theme.colors.menu.selected}
`
