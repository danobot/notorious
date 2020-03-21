import styled from 'styled-components';
import { Tree } from 'antd';
import { RightFloaty } from '../../style/utils.style';
const { TreeNode } = Tree;


export const MainMenuStyle = styled.div`

  background-color: ${props => props.theme.colors.background.dark}  !important;
  color: ${props => props.theme.colors.text.light} !important;
  height: 100%;
`
export const MenuHeading = styled.div`
  padding: 0 0 0 0;
  color: ${props => props.theme.colors.text.muted} !important;
  font-size: 90%;
  font-weight: bold;
`




export const MenuItemRightFloat = styled(RightFloaty)`
  color: ${props => props.theme.colors.text.muted};
  font-size: smaller;
  vertical-align: center;
  font-weight: bold;

`
export const MenuItemNormal = styled.div`
`
export const MenuItemRowItem = styled.div`
  display: inline-block;
  margin: 0 3px 0 0;
`
export const MenuItemIcon = styled(MenuItemRowItem)`
  width: 15px;
color: ${props => props.theme.colors.text.muted};
font-size: smaller;

`
export const MenuItemLabel = styled(MenuItemRowItem)`

`



export const MenuItemStyle = styled.div`
  padding: 5px 10px 5px ${props => 7+props.indent || 7}px;
  color: ${props => props.theme.colors.text.muted} !important;
  cursor: default;
`
export const MenuItemSelected = styled(MenuItemNormal)`
  background-color: ${props => props.theme.colors.menu.selected}
`
