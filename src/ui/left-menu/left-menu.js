import React from 'react'
import {Icon, Tree} from 'antd'
import Files from '../../utils/files'
import '../../resources/css/overwrite-react-contextmenu-style.css'
import '../../resources/css/left-menu.css'

const {TreeNode, DirectoryTree} = Tree

export default class LeftMenu extends React.Component {
  onSelect = keys => {
    this.props.updateMenu(keys[0])
  }

  listTree = dirs => {
    return dirs.filter(item => item.type === 'dir')
      .map(dir => {
        const subDirs = dir.sub.filter(item => item.type === 'dir')
        return <TreeNode
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
          ?
          <div>
            <DirectoryTree
              defaultExpandedKeys={[leftMenu.path]}
              onSelect={this.onSelect}>
              <TreeNode title={'我的文件夹'} key={leftMenu.path}>
                {
                  this.listTree(leftMenu.sub)
                }
              </TreeNode>
              <TreeNode title='设置'
                        key='setting'
                        icon={<Icon type="setting"/>}>
              </TreeNode>
            </DirectoryTree>
          </div>
          : ''
      }
    </div>
  }
}