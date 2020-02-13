import React from 'react'
import {Tree} from 'antd'
import File from '../../model/file'
import SideBarHeader from './sidebar-header'
import MENU from '../note/menu-item'

import '../../resources/css/overwrite-react-contextmenu-style.css'

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
          title={File.name(dir.path)}
          key={dir.path}>
          {this.listTree(subDirs)}
        </TreeNode>
      })
  }

  buildTopItem = (icon, title) => {
    return <span style={{
      display: 'block',
      margin: '5px 0 10px 10px',
      fontWeight: 700,
      color: 'rgba(25, 23, 17, 0.5)'
    }}>{icon} {title}</span>
  }

  render() {
    const {leftMenu} = this.props

    return <div>
      <div style={{height: 100}}>
        <SideBarHeader/>
      </div>
      <span
        onClick={() => this.props.switchToMenu(MENU.SEARCH)}
      >{this.buildTopItem('🔍 ', 'Quick Find')}</span>
      <span
        onClick={() => this.props.switchToMenu(MENU.SETTING)}
      >{this.buildTopItem('⚙️ ', 'Settings')}</span>

      {
        leftMenu.path
          ?
          <div>
            <span
              onClick={() => {
                this.props.switchToMenu(MENU.note)
                this.props.updateMenu(leftMenu.path)
              }}
            >{this.buildTopItem('📒 ', 'Notebook')}</span>
            <DirectoryTree
              defaultExpandedKeys={[leftMenu.path]}
              onSelect={this.onSelect}>
              {this.listTree(leftMenu.sub)}
            </DirectoryTree>
          </div>
          : ''
      }
    </div>
  }
}