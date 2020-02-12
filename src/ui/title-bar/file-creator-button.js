import React from 'react'
import {Menu, Dropdown, Icon} from 'antd'

const FileCreatorButton = ({selectedDir, createFileOrDir}) => {
  const create = ({key}) => {
    const {path} = selectedDir
    createFileOrDir({path, type: key})
  }

  const menu = (
    <Menu onClick={create}>
      <Menu.Item key='dir'>
        <span>Create Directory</span>
      </Menu.Item>
      <Menu.Item key='md'>
        <span>Create markdown</span>
      </Menu.Item>
    </Menu>
  )
  return <Dropdown overlay={menu}>
    <span className='title-bar-menu-item'>
          <Icon type="plus"/>
        </span>
  </Dropdown>
}

export default FileCreatorButton