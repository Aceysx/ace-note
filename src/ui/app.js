import * as React from 'react'
import {Empty, Layout} from 'antd'
import {connect} from 'react-redux'
import FileResource from '../infrastructure/file-resource'
import Note from './note/note'
import Setting from './setting/setting'
import GitResource from '../infrastructure/git-resource'
import LeftMenu from './left-menu/left-menu'
import {
  SELECTED_DIR_STACK,
  UPDATE_FILES,
  UPDATE_NOTES_TAGS,
  UPDATE_SELECTED_DIR
} from '../redux/reducers/dispatch-command/commands'

import '../resources/css/app.css'

const {Sider, Content} = Layout

const MENU = {
  NONE: 'none',
  NOTE: 'note',
  SETTING: 'setting'
}

class App extends React.Component {
  state = {
    current: MENU.NOTE,
    leftMenuVisible: true
  }

  componentDidMount() {
    const {selectedDirStack} = this.props
    let workspace = window.getNoteWorkspacePath()
    if (!workspace) {
      workspace = this.initWorkspace()
      this.pushPathToSelectedDirStack(selectedDirStack)
    }
    this.props.updateDirs(FileResource.initNoteBook(workspace))
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
  }

  updateNotesTags = (path, notesTags) => {
    FileResource.modifyFileContent({path, content: JSON.stringify(notesTags)})
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
  }

  isEmpty = (current, selectedDir) => {
    return current === MENU.NOTE && selectedDir.sub === undefined
  }

  updateSelectedDir = (selectedDir, type) => {
    if (type === 'search') {
      this.props.updateSelectedDir(selectedDir)
      return
    }
    if (selectedDir === MENU.SETTING) {
      this.setState({current: MENU.SETTING})
      return
    }
    this.setState({current: MENU.NOTE})
    this.pushPathToSelectedDirStack(selectedDir);
    this.props.updateSelectedDir(FileResource.findSubFiles(selectedDir))
  }

  pushPathToSelectedDirStack = path => {
    if (path === '搜索结果') {
      return
    }
    const {selectedDirStack} = this.props;
    if (selectedDirStack[selectedDirStack.length - 1] !== path) {
      selectedDirStack.push(path);
      this.props.updateSelectedDirStack(selectedDirStack)
    }
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

  render() {
    const {current, leftMenuVisible} = this.state
    const {leftMenu, selectedDir, notesTags, selectedDirStack} = this.props
    return <Layout className='layout'>
      <Sider
        className='layout_left_sider'
        hidden={!leftMenuVisible}
        theme='light'
      >
        <LeftMenu
          pushToRepo={this.pushToRepo}
          leftMenu={leftMenu}
          updateMenu={this.updateSelectedDir}
        />
      </Sider>
      <Layout className='layout_right_content_layout'>
        <Content>
          {
            current === MENU.NOTE && selectedDir.sub !== undefined
              ? <Note
                leftMenuVisible={leftMenuVisible}
                leftMenu={leftMenu}
                updateNotesTags={this.updateNotesTags}
                notesTags={notesTags}
                updateDirs={this.props.updateDirs}
                updateSelectedDir={this.updateSelectedDir}
                selectedDir={selectedDir}
                updateSelectedDirStack={this.props.updateSelectedDirStack}
                selectedDirStack={selectedDirStack}
                changeLeftMenuVisible={() => this.setState({leftMenuVisible: !this.state.leftMenuVisible})}
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
              ? <div style={{margin: '50%'}}>
                <Empty description={false}/>
              </div>
              : ''
          }
        </Content>
      </Layout>
    </Layout>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateNotesTags: noteTags => dispatch(UPDATE_NOTES_TAGS(noteTags)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir)),
  updateSelectedDirStack: selectedDirStack => dispatch(SELECTED_DIR_STACK(selectedDirStack)),
})

const mapStateToProps = ({
                           leftMenu,
                           selectedDir,
                           selectedDirStack,
                           notesTags
                         }) => ({
  leftMenu,
  selectedDir,
  selectedDirStack,
  notesTags
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
