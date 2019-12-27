import React from 'react'
import {Divider, Layout} from "antd"
import {connect} from 'react-redux'
import {UPDATE_CURRENT_EDIT_FILE, UPDATE_FILES, UPDATE_SELECTED_DIR} from "./dispatch-command/commands"
import LeftMenu from "./components/left-menu/left-menu"
import FileCard from './components/commons/file-card'
import './css/app.css'
import Markdown from "./components/commons/markdown/markdown";

const {Sider, Content} = Layout
const {ipcRenderer} = window.electron

class App extends React.Component {
  componentDidMount() {
    ipcRenderer.on('init-done', (event, data) => {
      this.props.updateDirs(data)
    })

    ipcRenderer.on('refresh-dirs-done', (event, files) => {
      this.props.updateDirs(files)
    })

    ipcRenderer.on('open-file-done', (event, fileContent) => {
      this.setState({fileContent})
    })

    ipcRenderer.send('init', 'init')
  }

  findSubFiles = path => {
    let files = ipcRenderer.sendSync('find-sub-files', path);
    this.props.updateSelectedDir(files)
  }

  openFile = file => {
    if (file.type === 'dir') {
      this.findSubFiles(file.path)
      return
    }
    if (file.path === this.props.currentEditFile.path) {
      return
    }
    this.props.updateCurrentEditFile(ipcRenderer.sendSync('open-file', file.path));
  }

  listSubFiles = selectedDir => {
    return selectedDir.sub.map(file => {
      return <FileCard key={file.path}
                       file={file}
                       openFile={this.openFile}
      />
    })
  }

  render() {
    const {leftMenu, selectedDir,currentEditFile} = this.props
    return <Layout className='layout'>
      <Sider
        className='layout_left_sider'
        theme='light'
      >
        <div style={{height: 50}}></div>
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
            <Markdown file={currentEditFile}/>
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

const mapStateToProps = ({leftMenu, selectedDir,currentEditFile}) => ({
  leftMenu,
  selectedDir,
  currentEditFile
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
