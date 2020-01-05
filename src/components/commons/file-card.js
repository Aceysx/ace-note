import React from 'react'
import {Card, Icon, Input, Popconfirm} from 'antd'
import '../../css/file-card.css'
import Files from "../../utils/files";

const FileCard = ({
                    file, openFile, deleteFileOrDir, selectedPath, editedFileName, changeFileName,
                    updateFileName, change2EditModal
                  }) => {

  return <Card className={`file-card-box ${selectedPath === file.path ? 'file-card-box-selected' : ''}`}>
    {
      editedFileName.old === file.path
        ? <p><Input size="small"
                    autoFocus
                    value={editedFileName.now}
                    onChange={e => changeFileName(e.target.value)}
                    onBlur={updateFileName}
                    onPressEnter={updateFileName}/>
        </p>
        : <p className='file-card-li-title'
             onClick={() => openFile(file)}>
          {
            file.type === 'dir'
              ? <Icon type="folder" className='file-card-dir-icon'/>
              : <Icon type="file-markdown" className='file-card-file-icon'/>
          }
          {Files.nameByPath(file.path)}
        </p>
    }
    <p className='file-card-extra'>
      <span><Icon type="clock-circle"/> {file.mtime.split('T')[0]}</span>
      <Popconfirm title="确认删除？"
                  okText="是"
                  onConfirm={() => deleteFileOrDir(file)}
                  cancelText="否">
        <span className='file-card-extra-delete-icon'><Icon type="delete"/></span>
      </Popconfirm>
      <span className='file-card-extra-edit-icon'
            onClick={() => change2EditModal(file)}>
        <Icon type="edit"/>
      </span>
    </p>
  </Card>
}

export default FileCard