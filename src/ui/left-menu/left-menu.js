import React from 'react'
import {Icon, Tree, notification} from 'antd'
import File from '../../model/file'
import SideBarHeader from './sidebar-header'
import SideBarBottom from './sidebar-bottom'
import {PUSH_TO_REPO_FINISHED} from '../../model/listener-event'

import '../../resources/css/overwrite-react-contextmenu-style.css'
import MENU from '../note/menu-item';

const {TreeNode, DirectoryTree} = Tree

export default class LeftMenu extends React.Component {

  componentDidMount() {
    window.electron.ipcRenderer.on(PUSH_TO_REPO_FINISHED, (e, result) => {
      const {isSuccess, message} = result
      if (isSuccess) {
        notification.success({message, duration: 2})
        return
      }
      notification.error({message, duration: 2})
    })
  }

  onSelect = keys => {
    this.props.updateMenu(keys[0])
  }

  pushToRepo = () => {
    notification.info({message: '正在推送......', duration: 2})
    this.props.pushToRepo(window.getNoteWorkspacePath())
  }

  listTree = dirs => {
    return dirs.filter(item => item.type === 'dir')
      .map(dir => {
        const subDirs = dir.sub.filter(item => item.type === 'dir')
        return <TreeNode
          title={this.buildSubItem(File.name(dir.path))}
          key={dir.path}>
          {this.listTree(subDirs)}
        </TreeNode>
      })
  }

  buildSubItem = title => {
    return <span style={{fontWeight: 550, color: 'rgba(25, 23, 17, 0.6)'}}>{title}</span>
  }

  buildTopItem = (icon, title) => {
    return <span style={{
      display: 'block',
      margin: '5px 0 10px 10px',
      fontWeight: 700,
      color: 'rgba(25, 23, 17, 0.5)'
    }}><Icon type={icon}/> {title}</span>
  }

  render() {
    const {leftMenu} = this.props

    return <div style={{paddingTop: 10}}>
      <div style={{height: 80}}>
        <SideBarHeader/>
      </div>
      <div style={{height: 30}}/>
      <span>{this.buildTopItem('search', 'Quick Find')}</span>
      <span
        onClick={() => this.props.switchToMenu(MENU.SETTING)}
      >{this.buildTopItem('setting', 'Settings')}</span>

      {
        leftMenu.path
          ?
          <div>
            <span
              onClick={() => {
                this.props.switchToMenu(MENU.note)
                this.props.updateMenu(leftMenu.path)
              }}
            >{this.buildTopItem('book', 'Notebook')}</span>
            <DirectoryTree
              defaultExpandedKeys={[leftMenu.path]}
              onSelect={this.onSelect}>
              {this.listTree(leftMenu.sub)}
            </DirectoryTree>
          </div>
          : ''
      }
      <div style={{height: 30}}/>
      <SideBarBottom
        pushToRepo={this.pushToRepo}/>
    </div>
  }
}