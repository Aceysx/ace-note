import React from 'react'
import {Card} from 'antd'
import path from 'path'
import '../../css/file-card.css'

const FileCard = ({file, openFile, selectedPath}) => {
  return <Card className={`file-card-box ${selectedPath === file.path ? 'file-card-box-selected' : ''}`}
               onClick={() => openFile(file)}>
    {path.basename(file.path)}
  </Card>
}

export default FileCard