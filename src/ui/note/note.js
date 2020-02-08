import React from 'react'
import {Empty, message} from 'antd'
import SubMenu from './sub-menu/sub-menu'
import Markdown from './markdown/markdown'
import SearchBar from './search-bar'
import {connect} from 'react-redux'
import NoteTagModel from '../../model/note-tag'
import File from '../../model/file'
import FileResource from '../../infrastructure/file-resource'
import {
  UPDATE_CURRENT_EDIT_FILE,
} from '../../redux/reducers/dispatch-command/commands'

class Note extends React.Component {
  state = {
    isSubMenuFold: false
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.selectedDir.path === nextProps.selectedDir.path) {
      return false
    }
    this.setState({isSubMenuFold: false})
  }

  modifyFileName = (oldPath, newFileName) => {
    if (this._exist(newFileName)) {
      message.warning('文件已存在')
      return false;
    }
    if (this._validate(newFileName)) {
      message.warning('文件名不能包含【\\\\/:*?\"<>|】')
      return false;
    }
    const {selectedDir, currentEditFile} = this.props
    let newPath = FileResource.modifyFileName({oldPath, newFileName})
    if (currentEditFile.path === oldPath) {
      this.props.updateCurrentEditFile(
        FileResource.findFile(newPath)
      )
    }
    this.props.updateSelectedDir(selectedDir.path)
    this.props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
  }

  modifyFileContent = (path, content) => {
    this.props.updateCurrentEditFile(
      FileResource.modifyFileContent({path, content})
    )
  }

  createFileOrDir = ({path, type}) => {
    let file = FileResource.createFileOrDir({type, path});
    this.props.updateSelectedDir(path)
    if (type === 'dir') {
      this.props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
      return
    }
    this.props.updateCurrentEditFile(file)
  }

  deleteFileOrDir = ({path, type}) => {
    const {selectedDir, notesTags} = this.props
    FileResource.delete({path, type})
    this.props.updateSelectedDir(selectedDir.path)

    if (type === 'file') {
      const _path = path.split(window.getNoteWorkspacePath())[1]
      this.props.updateNotesTags(window.getNoteTagsPath(),
        NoteTagModel.delete(_path, notesTags))
      this.props.updateCurrentEditFile({})
    }

    if (type === 'dir') {
      this.props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
    }
  }

  searchFiles = content => {
    const selectedDir = {
      path: '搜索结果',
      sub: this._searchByTitleOrTag(content)
    }
    this.props.updateSelectedDir(selectedDir, 'search')
  }

  _searchByTitleOrTag = content => {
    const {leftMenu, notesTags} = this.props
    const allFiles = this._formatAllFiles(leftMenu.sub)
    const inFilesPath = allFiles.filter(file => {
      return File.name(file.path).includes(content)
    })
    const foundInTags = notesTags.filter(tagFile => tagFile.tags.join(',').includes(content))
    const inTagPath = allFiles.filter(file => foundInTags.find(tagFile => file.path.includes(tagFile.path)))
    inFilesPath.push(...inTagPath)
    return inFilesPath
  }

  _formatAllFiles = sub => {
    const files = []
    sub.forEach(item => {
      if (item.type === 'dir') {
        files.push(...this._formatAllFiles(item.sub))
      }
      if (item.type === 'file') {
        files.push(item)
      }
    })
    return files
  }

  _exist = fileName => {
    return this.props.selectedDir.sub.filter(file => {
      return File.name(file.path) === fileName
    }).length === 1
  }

  _validate = fileName => {
    const reg = new RegExp('[\\\\/:*?\"<>|]')
    return reg.test(fileName)
  }

  render() {
    const {
      selectedDir, currentEditFile, selectedDirStack,
      notesTags, updateNotesTags
    } = this.props
    const {isSubMenuFold} = this.state

    return <div>
      {
        isSubMenuFold
          ? ''
          : <SubMenu
            modifyFileName={this.modifyFileName}
            createFileOrDir={this.createFileOrDir}
            deleteFileOrDir={this.deleteFileOrDir}
            currentEditFile={currentEditFile}
            updateCurrentEditFile={this.props.updateCurrentEditFile}
            updateNotesTags={this.props.updateNotesTags}
            notesTags={notesTags}
            updateSelectedDir={this.props.updateSelectedDir}
            selectedDir={selectedDir}
            updateSelectedDirStack={this.props.updateSelectedDirStack}
            selectedDirStack={selectedDirStack}
          />
      }
      <div className={`layout_right_content_layout_right_content_markdown `}>
        {
          currentEditFile.path
            ? <Markdown file={currentEditFile}
                        notesTags={notesTags}
                        modifyFileContent={this.modifyFileContent}
                        modifyFileName={this.modifyFileName}
                        updateNotesTags={updateNotesTags}
                        isSubMenuFold={isSubMenuFold}
                        changeSubMenuFold={() => this.setState({isSubMenuFold: !isSubMenuFold})}
            />
            : <div style={{margin: '50%'}}>
              <Empty
                description={false}/>
            </div>
        }
      </div>
      <SearchBar
        searchFiles={this.searchFiles}/>
    </div>
  }
}

const mapDispatchToProps = dispatch => ({
  updateCurrentEditFile: file => dispatch(UPDATE_CURRENT_EDIT_FILE(file))
})

const mapStateToProps = ({currentEditFile}) => ({
  currentEditFile
})
export default connect(mapStateToProps, mapDispatchToProps)(Note)
