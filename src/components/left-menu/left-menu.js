import React from 'react'
import {Divider, Dropdown, Icon, Menu, Tree} from "antd"
import Files from '../../utils/files'
import '../../css/overwrite-react-contextmenu-style.css'
import '../../css/left-menu.css'

const {TreeNode, DirectoryTree} = Tree


export default class LeftMenu extends React.Component {
  onSelect = keys => {
    //todo
    if(keys[0] === 'setting')return
    this.props.updateMenu(keys[0])
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

  createFileOrDir = ({key}) => {
    const {selectedDir, leftMenu} = this.props
    const path = selectedDir.path || leftMenu.path
    this.props.createFileOrDir({path, type: key})
  }

  render() {
    const {leftMenu} = this.props
    const menu = (
      <Menu onClick={this.createFileOrDir}>
        <Menu.Item key='dir'>
          <span>创建文件夹</span>
        </Menu.Item>
        <Menu.Item key='md'>
          <span>创建markdown</span>
        </Menu.Item>
      </Menu>
    );

    return <div>
      {
        leftMenu.path
          ?
          <div>
            <Dropdown overlay={menu}>
              <span className='left-menu-created'>
                <Icon type="plus-circle"/> 新建
              </span>
            </Dropdown>
            <Divider/>
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