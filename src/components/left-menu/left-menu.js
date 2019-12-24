import React from 'react'
import {Tree} from "antd"
import Files from '../../utils/files'

const {TreeNode, DirectoryTree} = Tree

export default class LeftMenu extends React.Component {
  onSelect = (keys, event) => {
    console.log('Trigger Select', keys, event);
  }

  onExpand = () => {
    console.log('Trigger Expand');
  }

  listTree = dirs => {
    return dirs.filter(item => item.type === 'dir')
      .map(dir => {
        const subDirs = dir.sub.filter(item => item.type === 'dir')
        return <TreeNode
          style={{paddingLeft: subDirs.length ? 0 : 25}}
          title={Files.nameByPath(dir.path)}
          key={dir.path}>
          {this.listTree(subDirs)}
        </TreeNode>
      })
  }

  render() {
    const {leftMenu} = this.props

    return <div>
      <DirectoryTree
        defaultExpandAll multiple
        onSelect={this.onSelect} onExpand={this.onExpand}>
        <TreeNode title={'workspace'} key={'workspace'}>
          {
            this.listTree(leftMenu.sub)
          }
        </TreeNode>
      </DirectoryTree>
    </div>
  }
}