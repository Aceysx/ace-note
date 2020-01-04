import React from 'react'
import {Divider, Empty} from "antd"
import FileCard from "../../commons/file-card"
import FileResource from "../../../resources/file-resources"
import path from 'path'

const DEFAULT_EDITED_FILE_NAME = {
  old: null,
  now: '',
  type: ''
}

class SubMenu extends React.Component {
  state = {
    selectedDirPath: '',
    editedFileName: DEFAULT_EDITED_FILE_NAME
  }

  openFile = file => {
    this.setState({selectedDirPath: file.path})
    if (file.type === 'dir') {
      this.props.updateSelectedDir(file.path)
      return
    }
    if (file.path === this.props.currentEditFile.path) {
      return
    }
    this.props.updateCurrentEditFile(
      FileResource.findFile(file.path)
    )
  }

  changeFileName = now => {
    const {editedFileName} = this.state
    editedFileName.now = now
    this.setState({editedFileName})
  }

  updateFileName = () => {
    const {editedFileName} = this.state
    const {old, now, type} = editedFileName
    if (path.basename(old) !== now) {
      this.props.modifyFileName(old, now, type)
    }
    this.setState({editedFileName: DEFAULT_EDITED_FILE_NAME})
  }

  change2EditModal = file => {
    const editedFileName = {
      old: file.path,
      now: path.basename(file.path),
      type: file.type
    }
    this.setState({editedFileName})
  }

  subFiles = selectedDir => {
    const {editedFileName, selectedDirPath} = this.state
    return selectedDir.sub.map(file => {
      return <FileCard key={file.path}
                       selectedPath={selectedDirPath}
                       deleteFileOrDir={this.props.deleteFileOrDir}
                       file={file}
                       editedFileName={editedFileName}
                       changeFileName={this.changeFileName}
                       updateFileName={this.updateFileName}
                       cancelEditModal={this.updateFileName}
                       change2EditModal={this.change2EditModal}
                       openFile={this.openFile}
      />
    })
  }

  render() {
    const {selectedDir} = this.props
    const subFiles = this.subFiles(selectedDir)
    return <div className='layout_right_content_layout_left_menu'>
      <div className='layout_right_content_layout_left_menu_scroll'>
        <div className='layout_right_content_layout_left_menu_tool'>
          <div>{path.basename(selectedDir.path)}</div>
        </div>
        <Divider/>
        {
          subFiles.length
            ? subFiles
            : <Empty
              style={{marginTop: '20%', width: '250px'}}
              description={false}
              image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
      </div>
    </div>
  }
}

export default SubMenu