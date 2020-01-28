import React from 'react'
import {Divider, Empty, Icon} from "antd"
import FileCard from "../../commons/file-card"
import FileResource from "../../../resources/file-resources"
import '../../../resources/css/sub-menu.css'
import Files from "../../../utils/files";
import {NoteTagModel} from "../../../model/note-tag";
const NOTE_WORKSPACE_PATH = window.localStorage.getItem('workspace')
const NOTES_TAGS_FILE = window.localStorage.getItem('workspace') + '/__tags'
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

  back = () => {
    const {selectedDirStack} = this.props
    if (selectedDirStack.length > 1) {
      selectedDirStack.pop();
      this.openFile({path: selectedDirStack[selectedDirStack.length - 1], type: 'dir'})
      this.props.updateSelectedDirStack(selectedDirStack)
    }
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
    const {notesTags} = this.props
    const {old, now, type} = editedFileName
    if (Files.nameByPath(old) !== now) {
      this.props.modifyFileName(old, now, type)
    }
    if (type === 'file') {
      const _path = old.split(NOTE_WORKSPACE_PATH)[1]
      this.props.updateNotesTags(
        NOTES_TAGS_FILE,
        NoteTagModel.updateNoteTagPath(_path, now, notesTags))
    }
  }

  change2EditModal = file => {
    const editedFileName = {
      old: file.path,
      now: Files.nameByPath(file.path),
      type: file.type
    }
    this.setState({editedFileName})
  }

  sort = (filesOrDirs) => {
    let dirs = [], files = []
    filesOrDirs.forEach(item => {
      if (item.type === 'dir') dirs.push(item)
      else files.push(item)
    })

    return [...dirs.sort((a, b) => a.ctime > b.ctime ? -1 : 1),
      ...files.sort((a, b) => a.ctime > b.ctime ? -1 : 1)]
  }

  subFiles = selectedDir => {
    const {editedFileName, selectedDirPath} = this.state

    return this.sort(selectedDir.sub)
      .map(file => {
        return <FileCard key={file.path}
                         selectedPath={selectedDirPath}
                         deleteFileOrDir={this.props.deleteFileOrDir}
                         file={file}
                         editedFileName={editedFileName}
                         changeFileName={this.changeFileName}
                         updateFileName={this.updateFileName}
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
          <div className='back-icon cursor_pointer'
               onClick={this.back}>
            <Icon type="enter"/>
          </div>
          <div className='sub-menu-tool-title'>
            {Files.nameByPath(selectedDir.path)}
          </div>
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
      <div className='layout_right_content_layout_left_menu_bottom'>
        <Divider/>
        共 {selectedDir.sub.length} 项
      </div>
    </div>
  }
}

export default SubMenu