import * as React from 'react'
import {Card, Icon, Input, Popconfirm} from 'antd'
import File from '../../../model/file'

import '../../../resources/css/file-card.css'

const FileCard = ({
                    file, openFile, deleteFileOrDir, selectedPath, editedFileName, changeFileName,
                    updateFileName, openEditInput, closeEditInput, pinFile
                  }) => {

  const getParentDir = file => {
    return {
      path: File.dir(file.path),
      type: 'dir'
    }
  }

  const clickPinedIcon = () => {
    if (File.isPined(file.path)) {
      pinFile(file.path, File.name(File.unPin(file.path)))
      return
    }
    pinFile(file.path, File.name(File.pin(file.path)))
  }
  return <Card className={`file-card-box ${selectedPath === file.path ? 'file-card-box-selected' : ''}`}>
      <span
        onClick={clickPinedIcon}
        className={`cursor_pointer file-card-pin-icon ${File.isPined(file.path) ? 'file-card-pined-icon' : ''} `}>
          📌 
        </span>
    {
      editedFileName.old === file.path
        ? <p><Input size="small"
                    autoFocus
                    value={editedFileName.now}
                    onChange={e => changeFileName(e.target.value)}
                    onPressEnter={updateFileName}
                    suffix={
                      <Icon onClick={closeEditInput}
                            type="close"
                            style={{color: 'rgba(0,0,0,.45)'}}/>
                    }/>
        </p>
        : <p className='file-card-li-title cursor_pointer'
             onClick={() => openFile(file)}>
          <img src={File.getIconBy(file.type)()} className='file-card-icon'/>
          {File.name(file.path)}
        </p>
    }
    <p className='file-card-extra'>
      <Icon type="folder-open"
            className='cursor_pointer'
            style={{fontSize: 14, color: '#b7906b'}}
            onClick={() => openFile(getParentDir(file))}
      />
      <label> {file.ctime.split('T')[0]}</label>

      <Popconfirm title="确认删除？"
                  okText="是"
                  onConfirm={() => deleteFileOrDir(file)}
                  cancelText="否">
        <span className='file-card-extra-delete-icon'>
          <Icon className='cursor_pointer' type="delete"/>
        </span>
      </Popconfirm>
      <span className='file-card-extra-edit-icon '
            onClick={() => openEditInput(file)}>
        <Icon type="edit"/>
      </span>
    </p>
  </Card>
}

export default FileCard