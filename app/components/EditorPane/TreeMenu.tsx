import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;
import {Treebeard} from 'react-treebeard';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
// import ExpandMoreIcon from 'material-ui/icons/ExpandMore';
// import ChevronRightIcon from 'material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});


class TreeMenu extends React.Component {

  renderTree = nodes => {
    console.log("rendering: ", nodes)
    console.log("children: ", this.props.items.filter(e => e._id === e._id)[0])
    return <TreeNode key={nodes._id} title={nodes.title}>
      {Array.isArray(nodes.children) ? nodes.children.map(node => this.renderTree(this.props.items.filter(e => node._id === e._id)[0])) : null}
  </TreeNode>
  }
  renderTreeMaterial = nodes => {
    console.log("rendering: ", nodes)
    console.log("children: ", this.props.items.filter(e => e._id === e._id)[0])
    return <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.title}>
      {Array.isArray(nodes.children) ? nodes.children.map(node => this.renderTree(this.props.items.filter(e => node._id === e._id)[0])) : null}
    </TreeItem>
  }

  onDragEnter = info => {
    console.log(info);
    // expandedKeys
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };
  onToggle(node, toggled){
    const {cursor, data} = this.state;
    if (cursor) {
        this.setState(() => ({cursor, active: false}));
    }
    node.active = true;
    if (node.children) {
        node.toggled = toggled;
    }
    this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
}



  render() {
    console.log(this.props.items)

    return (
      <>
      { this.props.items && this.props.items.filter(i=> i.isChild === false).map(prent => {
        // return <Treebeard key={prent._id} data={prent} />
          return <Tree key={prent._id} theme="dark"
            className="draggable-tree"
            // defaultExpandedKeys={this.state.expandedKeys}
            // draggable
            // blockNode
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
          >
            {this.renderTree(prent)}
          </Tree>
        })
      }
      </>
    );


  }
}

export default TreeMenu;
