import React from 'react'
import {Tree} from "antd"
import Files from '../../utils/files'
import {ContextMenu, ContextMenuTrigger, MenuItem, SubMenu} from "react-contextmenu";
import '../../css/overwrite-react-contextmenu-style.css'
import FileResource from "../../resources/file-resources";

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
  createFileOrDir = data => {
    const {type, path} = data
    const leftMenu = FileResource.createFileOrDir({type, path})
    this.props.updateLeftMenu(leftMenu)
  }

  render() {
    const {leftMenu} = this.props

    return <div>
      <ContextMenu id="some_unique_identifier">
        <SubMenu title='新建'>
          <MenuItem onClick={(e, data) => this.createFileOrDir(e,data)}
                    data={{type: 'dir', path: leftMenu.path}}>新建文件夹</MenuItem>
          <MenuItem onClick={(e, data) => this.createFileOrDir(data)}
                    data={{type: 'md', path: leftMenu.path}}>新建文件</MenuItem>
        </SubMenu>
      </ContextMenu>
      {
        leftMenu.path
          ?
          <ContextMenuTrigger id="some_unique_identifier">
            <DirectoryTree
              defaultExpandedKeys={[leftMenu.path]}
              onSelect={this.onSelect}>
              <TreeNode title={'我的文件夹'} key={leftMenu.path}>
                {
                  this.listTree(leftMenu.sub)
                }
              </TreeNode>

            </DirectoryTree>
          </ContextMenuTrigger>
          : ''
      }
    </div>
  }
}