import * as React from 'react'
import {Empty, Layout} from 'antd'
import {connect} from 'react-redux'
import FileResource from '../infrastructure/file-resource'
import Note from './note/note'
import Setting from './setting/setting'
import GitResource from '../infrastructure/git-resource'
import LeftMenu from './left-menu/left-menu'
import SearchBar from './search-bar/search-bar'
import MENU from './note/menu-item'
import File from '../model/file'
import {UPDATE_FILES, UPDATE_NOTES_TAGS, UPDATE_SELECTED_DIR} from '../redux/reducers/dispatch-command/commands'

import '../resources/css/app.css'

const { Sider, Content } = Layout

class App extends React.Component {
  state = {
    current: MENU.NOTE,
    leftMenuVisible: true,
    isSearchModalVisible: false
  }

  componentDidMount() {
    let workspace = window.getNoteWorkspacePath()
    if (!workspace) {
      workspace = this.initWorkspace()
    }
    this.props.updateDirs(FileResource.initNoteBook(workspace))
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
  }

  updateNotesTags = (path, notesTags) => {
    FileResource.modifyFileContent({ path, content: JSON.stringify(notesTags) })
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
  }

  isEmpty = (current, selectedDir) => {
    return current === MENU.NOTE && selectedDir.sub === undefined
  }

  updateSelectedDir = (selectedDir) => {
    this.switchToMenu(MENU.NOTE)
    this.props.updateSelectedDir(FileResource.findSubFiles(selectedDir))
  }

  switchToMenu = current => {
    if (current === MENU.SEARCH) {
      this.setState({ isSearchModalVisible: true })
      return
    }
    this.setState({ current })
  }

  pushToRepo = (workspace) => {
    GitResource.pushToRepo(workspace)
  }

  resetWorkspace = () => {
    const workspace = this.initWorkspace()
    this.props.updateDirs(FileResource.initNoteBook(workspace))
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))

  }

  initWorkspace = () => {
    const workspace = FileResource.openDir()
    window.localStorage.setItem('workspace', workspace)
    window.localStorage.removeItem('note')
    return workspace
  }

  searchFiles = content => {
    const selectedDir = {
      path: MENU.SEARCH_RESULT,
      sub: this._searchByTitleOrTag(content)
    }
    this.props.updateSelectedDir(selectedDir)
  }

  _searchByTitleOrTag = content => {
    const { leftMenu, notesTags } = this.props
    const allFiles = this._formatAllFiles(leftMenu.sub)
    const inFilesPath = allFiles.filter(file => {
      return File.name(file.path).includes(content)
    })
    const foundInTags = notesTags.filter(tagFile => tagFile.tags.join(',').includes(content))
    const inTagPath = allFiles.filter(file => foundInTags.find(tagFile => file.path.includes(tagFile.path)))
    inFilesPath.push(...inTagPath)
    return [...new Set(inFilesPath)]
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

  render() {
    const { current, leftMenuVisible, isSearchModalVisible } = this.state
    const { leftMenu, selectedDir, notesTags } = this.props
    return <Layout className='layout'>
      <Sider
        className='layout_left_sider'
        hidden={!leftMenuVisible}
        theme='light'
      >
        <LeftMenu
          changeLeftMenuVisible={leftMenuVisible => this.setState({ leftMenuVisible })}
          switchToMenu={this.switchToMenu}
          leftMenu={leftMenu}
          updateMenu={this.updateSelectedDir}
        />
      </Sider>
      <Layout className='layout_right_content_layout'>
        <Content>
          {
            current === MENU.NOTE && selectedDir.sub !== undefined
              ? <Note
                pushToRepo={this.pushToRepo}
                leftMenuVisible={leftMenuVisible}
                changeLeftMenuVisible={leftMenuVisible => this.setState({ leftMenuVisible })}
                leftMenu={leftMenu}
                updateNotesTags={this.updateNotesTags}
                notesTags={notesTags}
                updateDirs={this.props.updateDirs}
                updateSelectedDir={this.updateSelectedDir}
                selectedDir={selectedDir}
              />
              : ''
          }
          {
            current === MENU.SETTING
              ? <Setting
                resetWorkspace={this.resetWorkspace}
                workspace={leftMenu.path}
              />
              : ''
          }
          {
            this.isEmpty(current, selectedDir)
              ? <div style={{ margin: '50%' }}>
                <Empty description={false} />
              </div>
              : ''
          }
        </Content>
      </Layout>
      <SearchBar
        isSearchModalVisible={isSearchModalVisible}
        searchFiles={this.searchFiles}
        closeSearchModal={() => this.setState({ isSearchModalVisible: false })}
      />
    </Layout>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateNotesTags: noteTags => dispatch(UPDATE_NOTES_TAGS(noteTags)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir)),
})

const mapStateToProps = ({
  leftMenu,
  selectedDir,
  notesTags
}) => ({
  leftMenu,
  selectedDir,
  notesTags
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
