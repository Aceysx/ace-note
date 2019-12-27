import React from 'react'
import {Card} from 'antd'
import '../../css/file-card.css'

const FileCard = ({file})=>{
  return  <Card className='file-card-box'>
    {file.path}
  </Card>
}

export default FileCard