import React from 'react'
import {Divider, Empty} from 'antd'
import FileCard from './file-card'
import FileResource from '../../../infrastructure/file-resource'
import NoteTagModel from '../../../model/note-tag'
import File from '../../../model/file'

import '../../../resources/css/sub-menu.css'

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

  closeEditInput = () => {
    this.setState({editedFileName: DEFAULT_EDITED_FILE_NAME})
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
    let noteWorkspacePath = window.getNoteWorkspacePath()
    const {editedFileName} = this.state
    const {notesTags} = this.props
    const {old, now, type} = editedFileName
    if (File.name(old) !== now) {
      this.props.modifyFileName(old, now, type)
    }
    const relativePath = old.split(noteWorkspacePath)[1]
    if (type === 'file') {
      this.props.updateNotesTags(
        window.getNoteTagsPath(),
        NoteTagModel.updateNoteTagPath(relativePath, now, notesTags))
    }
    if (type === 'dir') {
      const parent = File.dir(relativePath)
      const newPath = File.join([parent, now])
      this.props.updateNotesTags(
        window.getNoteTagsPath(),
        NoteTagModel.updateNoteTagDirPath(
          relativePath,
          newPath,
          notesTags
        ))
    }
  }

  pinFile = (old, now) => {
    const type = 'file'
    const {notesTags} = this.props

    this.props.modifyFileName(old, now, type)
    const _path = old.split(window.getNoteWorkspacePath())[1]
    this.props.updateNotesTags(
      window.getNoteTagsPath(),
      NoteTagModel.updateNoteTagPath(_path, now, notesTags))
  }

  openEditInput = file => {
    const editedFileName = {
      old: file.path,
      now: File.name(file.path),
      type: file.type
    }
    this.setState({editedFileName})
  }

  sort = (filesOrDirs) => {
    let dirs = [], files = [], pined = []
    filesOrDirs.forEach(item => {
      if (item.type === 'dir') {
        dirs.push(item)
      }
      if (File.isPined(item.path)) {
        pined.push(item)
      }
      if (!File.isPined(item.path) && item.type === 'file') {
        files.push(item)
      }
    })
    return [
      ...dirs.sort((a, b) => a.name > b.name ? -1 : 1),
      ...pined.sort((a, b) => a.name > b.name ? -1 : 1),
      ...files.sort((a, b) => a.name > b.name ? -1 : 1)
    ]
  }

  subFiles = selectedDir => {
    const {editedFileName, selectedDirPath} = this.state
    return this.sort(selectedDir.sub)
      .map(file => {
        return <FileCard key={file.path}
                         selectedPath={selectedDirPath}
                         deleteFileOrDir={this.props.deleteFileOrDir}
                         file={file}
                         pinFile={this.pinFile}
                         editedFileName={editedFileName}
                         changeFileName={this.changeFileName}
                         updateFileName={this.updateFileName}
                         openEditInput={this.openEditInput}
                         openFile={this.openFile}
                         closeEditInput={this.closeEditInput}
        />
      })
  }

  render() {
    const {selectedDir} = this.props
    const subFiles = this.subFiles(selectedDir)
    return <div className='layout_right_content_layout_left_menu'>
      <div className='layout_right_content_layout_left_menu_scroll'>
        {
          subFiles.length
            ? subFiles
            : <Empty
              style={{marginTop: '20%', width: '220px'}}
              description={false}
              image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
        <div style={{height: 100}}/>
      </div>
      <div className='layout_right_content_layout_left_menu_bottom'>
        <Divider/>
        {selectedDir.sub.length} items
      </div>
    </div>
  }
}

export default SubMenu