import React from 'react'
import {Icon, Tree, notification} from 'antd'
import Files from '../../utils/files'
import '../../resources/css/overwrite-react-contextmenu-style.css'
import '../../resources/css/left-menu.css'
import SideBarHeader from './sidebar-header'
import SideBarBottom from './sidebar-bottom'
import {PUSH_TO_REPO_FINISHED} from '../../resources/listener-event';

const {TreeNode, DirectoryTree} = Tree
const NOTE_WORKSPACE_PATH = () => window.localStorage.getItem('workspace')

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
    this.props.pushToRepo(NOTE_WORKSPACE_PATH())
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
    const {leftMenu, selectedDir, isNoteMenuItem} = this.props

    return <div>
      <div style={{height: 140}}>
        <SideBarHeader
          isNoteMenuItem={isNoteMenuItem}
          selectedDir={selectedDir}
          leftMenu={leftMenu}
          createFileOrDir={this.createFileOrDir}
        />
      </div>
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
      <div style={{height: 30}}/>
      <SideBarBottom
        pushToRepo={this.pushToRepo}/>
    </div>
  }
}