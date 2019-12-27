import React from 'react'
import {Divider, Tree} from "antd"
import Files from '../../utils/files'

const {TreeNode, DirectoryTree} = Tree

export default class LeftMenu extends React.Component {
  onSelect = keys => {
    this.props.findSubFiles(keys[0])
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
      {
        leftMenu.path
          ? <DirectoryTree
              defaultExpandedKeys={[leftMenu.path]}
            onSelect={this.onSelect}>

            <TreeNode title={'我的文件夹'} key={leftMenu.path}>
              {
                this.listTree(leftMenu.sub)
              }
            </TreeNode>
          </DirectoryTree>
          : ''
      }
    </div>
  }
}