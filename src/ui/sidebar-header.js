import React from 'react'
import Logo from '../resources/images/logo_transparent.png'
import {Icon, Menu, Dropdown, Divider} from 'antd'

const SideBarHeader = ({isNoteMenuItem, selectedDir, leftMenu, createFileOrDir}) => {

  const create = ({key}) => {
    const path = selectedDir.path || leftMenu.path
    createFileOrDir({path, type: key})
  }
  const menu = (
    <Menu onClick={create}>
      <Menu.Item key='dir'>
        <span>创建文件夹</span>
      </Menu.Item>
      <Menu.Item key='md'>
        <span>创建markdown</span>
      </Menu.Item>
    </Menu>
  )

  return <div style={{position: 'fixed', zIndex: 100, width: 220, background: '#f8f6f1'}}>
    <div style={{height: 80}}>
      <img src={Logo}
           width={200}
           style={{marginTop: '-50px'}}/>
    </div>
    <Dropdown overlay={menu} disabled={!isNoteMenuItem}>
                    <span className='left-menu-created'>
                      <Icon type="plus-circle"/> 新建
                    </span>
    </Dropdown>
    <Divider/>
  </div>
}
export default SideBarHeader