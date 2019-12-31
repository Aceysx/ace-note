import React from 'react'
import {Card, Icon} from 'antd'
import path from 'path'
import '../../css/file-card.css'

const FileCard = ({file, openFile, selectedPath}) => {
  return <Card className={`file-card-box ${selectedPath === file.path ? 'file-card-box-selected' : ''}`}
               onClick={() => openFile(file)}>
    <p className='file-card-li-title'>
      {
        file.type === 'dir'
          ? <Icon type="folder" className='file-card-dir-icon'/>
          : <Icon type="file-markdown" className='file-card-file-icon'/>
      }
      {path.basename(file.path)}
    </p>
    <p className='file-card-time'>
      <Icon type="clock-circle"/> {file.mtime.split('T')[0]}
    </p>
  </Card>
}

export default FileCard