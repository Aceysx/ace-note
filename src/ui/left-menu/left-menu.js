import React from 'react'
import {Badge, Tooltip, Tree} from 'antd'
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
          title={<span className='cursor_pointer'>{File.name(dir.path)}</span>}
          key={dir.path}>
          {this.listTree(subDirs)}
        </TreeNode>
      })
  }

  buildTopItem = (icon, title) => {
    return <span style={{
      display: 'block',
      margin: '5px 0 5px 10px',
    }}>
      <span style={{fontSize: 18}}>{icon}</span>
      <span className='cursor_pointer' style={{fontWeight: 700, color: 'rgba(25, 23, 17, 0.5)'}}>
      {title}
    </span></span>
  }

  render() {
    const {leftMenu} = this.props

    return <div>
      <div style={{height: 100}}>
        <SideBarHeader/>
      </div>
      <Tooltip title='⌘+f'>
      <span

        onClick={() => this.props.switchToMenu(MENU.SEARCH)}>
        {this.buildTopItem('🔍 ', MENU.SEARCH)}
      </span>
      </Tooltip>
      <span
        onClick={() => this.props.switchToMenu(MENU.SETTING)}>
        {this.buildTopItem('⚙️ ', MENU.SETTING)}
      </span>
      <span
        onClick={() => this.props.switchToMenu(MENU.CARDS_REVIEW)}>
        {this.buildTopItem(' 📑️ ', MENU.CARDS_REVIEW)}
      </span>
      <span
        onClick={() => this.props.switchToMenu(MENU.TAG)}>
        {this.buildTopItem('🏷️ ', MENU.TAG)}
      </span>
      {
        leftMenu.path
          ?
          <div>
            <span
              onClick={() => {
                this.props.switchToMenu(MENU.note)
                this.props.updateMenu(leftMenu.path)
              }}
            >{this.buildTopItem('📔 ', 'Notebook')}</span>
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