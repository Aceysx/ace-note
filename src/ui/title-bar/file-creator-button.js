import React from 'react'
import {Dropdown, Icon, Menu} from 'antd'

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
        <span>Create Markdown</span>
      </Menu.Item>
      <Menu.Item key='html'>
        <span>Create Html</span>
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