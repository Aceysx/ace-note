import React from 'react'
import {Card, Icon, Popconfirm} from 'antd'
import path from 'path'
import '../../css/file-card.css'

const FileCard = ({file, openFile, deleteFileOrDir, selectedPath}) => {
  return <Card className={`file-card-box ${selectedPath === file.path ? 'file-card-box-selected' : ''}`}>
    <p className='file-card-li-title'
       onClick={() => openFile(file)}>
      {
        file.type === 'dir'
          ? <Icon type="folder" className='file-card-dir-icon'/>
          : <Icon type="file-markdown" className='file-card-file-icon'/>
      }
      {path.basename(file.path)}
    </p>
    <p className='file-card-extra'>
      <span><Icon type="clock-circle"/> {file.mtime.split('T')[0]}</span>
      <Popconfirm title="确认删除？"
                  okText="是"
                  onConfirm={() => deleteFileOrDir(file)}
                  cancelText="否">
        <span className='file-card-extra-delete-icon'><Icon type="delete"/></span>
      </Popconfirm>
    </p>
  </Card>
}

export default FileCard