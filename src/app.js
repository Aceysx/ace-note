import React from 'react'
import {Divider, Layout} from "antd"
import {connect} from 'react-redux'
import {UPDATE_CURRENT_EDIT_FILE, UPDATE_FILES, UPDATE_SELECTED_DIR} from "./reducers/dispatch-command/commands"
import LeftMenu from "./components/left-menu/left-menu"
import FileCard from './components/commons/file-card'
import './css/app.css'
import Markdown from "./components/commons/markdown/markdown";
import Logo from './images/logo_transparent.png'
import FileResource from './resources/file-resources'

const {Sider, Content} = Layout


class App extends React.Component {
  state = {
    selectedPath: ''
  }

  componentDidMount() {
    this.props.updateDirs(FileResource.initNoteBook())
  }

  findSubFiles = path => {
    this.props.updateSelectedDir(FileResource.findSubFiles(path))
  }

  openFile = file => {
    this.setState({selectedPath: file.path})
    if (file.type === 'dir') {
      this.findSubFiles(file.path)
      return
    }
    if (file.path === this.props.currentEditFile.path) {
      return
    }
    this.props.updateCurrentEditFile(
      FileResource.findFile(file.path)
    )
  }

  modifyFileName = (oldPath, newFileName) => {
    const {selectedDir} = this.props
    this.props.updateCurrentEditFile(
      FileResource.modifyFileName({oldPath, newFileName})
    )
    this.findSubFiles(selectedDir.path)
  }

  modifyFileContent = (path, content) => {
    const {selectedDir} = this.props
    this.props.updateCurrentEditFile(
      FileResource.modifyFileContent({path, content})
    )
    this.findSubFiles(selectedDir.path)
  }

  listSubFiles = selectedDir => {
    return selectedDir.sub.map(file => {
      return <FileCard key={file.path}
                       selectedPath={this.state.selectedPath}
                       file={file}
                       openFile={this.openFile}
      />
    })
  }

  render() {
    const {leftMenu, selectedDir, currentEditFile} = this.props
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
          findSubFiles={this.findSubFiles}
        />
      </Sider>
      <Layout className='layout_right_content_layout'>
        <Content>
          {
            selectedDir.path
              ? <div className='layout_right_content_layout_left_menu'>

                <div className='layout_right_content_layout_left_menu_scroll'>
                  <div style={{height: 50}}></div>
                  <Divider/>
                  {this.listSubFiles(selectedDir)}
                </div>
              </div>
              : ''
          }
          <div className={`layout_right_content_layout_right_content_markdown `}>
            <Markdown file={currentEditFile}
                      modifyFileContent={this.modifyFileContent}
                      modifyFileName={this.modifyFileName}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir)),
  updateCurrentEditFile: file => dispatch(UPDATE_CURRENT_EDIT_FILE(file)),
})

const mapStateToProps = ({leftMenu, selectedDir, currentEditFile}) => ({
  leftMenu,
  selectedDir,
  currentEditFile
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
