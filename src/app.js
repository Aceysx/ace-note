import React from 'react'
import {Layout} from "antd"
import {connect} from 'react-redux'
import {
  SELECTED_DIR_STACK,
  UPDATE_CURRENT_EDIT_FILE,
  UPDATE_FILES,
  UPDATE_SELECTED_DIR
} from "./reducers/dispatch-command/commands"
import LeftMenu from "./components/left-menu/left-menu"
import './css/app.css'
import Logo from './images/logo_transparent.png'
import FileResource from './resources/file-resources'
import Note from "./components/note/note";
import Setting from './components/setting/setting'
const {Sider, Content} = Layout

const MENU = {
  NOTE: 'note',
  SETTING: 'setting'
}

class App extends React.Component {
  state = {
    current: MENU.NOTE
  }

  componentDidMount() {
    this.props.updateDirs(FileResource.initNoteBook())
    //todo 初始化时将 root path 加入到 selectedDirStack  中
  }

  pushPathToSelectedDirStack = path => {
    const {selectedDirStack} = this.props
    if (selectedDirStack[selectedDirStack.length - 1] !== path) {
      selectedDirStack.push(path);
      this.props.updateSelectedDirStack(selectedDirStack)
    }
  }

  updateSelectedDir = path => {
    if (path === MENU.SETTING) {
      this.setState({current: MENU.SETTING})
      return
    }
    this.setState({current:MENU.NOTE})
    this.pushPathToSelectedDirStack(path);
    this.props.updateSelectedDir(FileResource.findSubFiles(path))
    this.props.updateDirs(FileResource.initNoteBook())
  }

  modifyFileName = (oldPath, newFileName) => {
    const {selectedDir, currentEditFile} = this.props
    let newPath = FileResource.modifyFileName({oldPath, newFileName});
    if (currentEditFile.path === oldPath) {
      this.props.updateCurrentEditFile(
        FileResource.findFile(newPath)
      )
    }
    this.updateSelectedDir(selectedDir.path)
  }

  modifyFileContent = (path, content) => {
    const {selectedDir} = this.props
    this.props.updateCurrentEditFile(
      FileResource.modifyFileContent({path, content})
    )
    this.updateSelectedDir(selectedDir.path)
  }

  createFileOrDir = ({path, type}) => {
    FileResource.createFileOrDir({type, path})
    this.updateSelectedDir(path)
  }

  deleteFileOrDir = ({path, type}) => {
    const {selectedDir} = this.props
    FileResource.delete({path, type})
    this.updateSelectedDir(selectedDir.path)
  }

  render() {
    const {current} = this.state
    const {leftMenu, selectedDir, currentEditFile, selectedDirStack} = this.props
    return <Layout className='layout'>
      <Sider
        className='layout_left_sider'
        theme='light'
      >
        <div style={{height: 80}}>
          <img src={Logo}
               width={200} style={{marginTop: '-60px'}}/>
        </div>
        <LeftMenu
          leftMenu={leftMenu}
          selectedDir={selectedDir}
          createFileOrDir={this.createFileOrDir}
          updateMenu={this.updateSelectedDir}
        />
      </Sider>
      <Layout className='layout_right_content_layout'>
        <Content>
          {
            current === MENU.NOTE
              ? <Note
                selectedDir={selectedDir}
                currentEditFile={currentEditFile}
                updateCurrentEditFile={this.props.updateCurrentEditFile}
                updateSelectedDir={this.updateSelectedDir}
                deleteFileOrDir={this.deleteFileOrDir}
                selectedDirStack={selectedDirStack}
                updateSelectedDirStack={this.props.updateSelectedDirStack}
                modifyFileContent={this.modifyFileContent}
                modifyFileName={this.modifyFileName}
              />
              : ''
          }
          {
            current === MENU.SETTING
              ? <Setting/>
              : ''
          }
        </Content>
      </Layout>
    </Layout>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir)),
  updateCurrentEditFile: file => dispatch(UPDATE_CURRENT_EDIT_FILE(file)),
  updateSelectedDirStack: selectedDirStack => dispatch(SELECTED_DIR_STACK(selectedDirStack)),
})

const mapStateToProps = ({leftMenu, selectedDir, currentEditFile, selectedDirStack}) => ({
  leftMenu,
  selectedDir,
  selectedDirStack,
  currentEditFile
})
export default connect(mapStateToProps, mapDispatchToProps)(App)