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
  font-size: 110%;
  font-weight: bold;
  margin: 10px 0 0 0;
  font-variant-caps: all-small-caps;
`
export const TreeHeading = styled.div`
  padding: 0 0 0 0;
  color: ${props => props.theme.colors.text.muted} !important;
  font-size: 90%;
  font-weight: bold;
`




export const MenuItemNormal = styled.div`
`
export const MenuItemRowItem = styled.div`
display: table-cell;
margin: 0 3px 0 0;
`
export const MenuItemRightFloat = styled(MenuItemRowItem)`
  color: ${props => props.theme.colors.text.muted};
  font-size: smaller;
  vertical-align: center;
  font-weight: bold;

`
export const MenuItemIcon = styled(MenuItemRowItem)`
  width: 15px;
color: ${props => props.theme.colors.text.muted};
font-size: smaller;
padding: 0 5px 0 0 ;

`
export const MenuItemLabel = styled(MenuItemRowItem)`
width: 100%;
td {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 0;
}

`



export const MenuItemStyle = styled.div`
  padding: 5px 10px 5px ${props => 7+props.indent || 7}px;
  color: ${props => props.theme.colors.text.muted} !important;
  cursor: default;
  white-space: nowrap;
`
export const MenuItemSelected = styled(MenuItemNormal)`
  background-color: ${props => props.theme.colors.menu.selected}
`
export const MainMenuBottom = styled.div`
font-size: x-small;
color: ${props => props.theme.colors.text.muted} !important;
padding: 0 10px 0 10px;
position: absolute;
bottom: 0;
`
