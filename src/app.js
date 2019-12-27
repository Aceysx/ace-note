import React from 'react'
import {Row, Menu, Input, Layout, Divider, Col} from "antd"
import {connect} from 'react-redux'
import {UPDATE_FILES, UPDATE_SELECTED_DIR} from "./dispatch-command/commands"
import LeftMenu from "./components/left-menu/left-menu"
import FileCard from './components/commons/file-card'
import './css/app.css'
import Markdown from "./components/commons/markdown/markdown";

const {SubMenu} = Menu
const {TextArea} = Input
const {Sider, Content} = Layout
const {ipcRenderer} = window.electron

class App extends React.Component {
  state = {
    fileContent: '',
    collapsed: false
  }

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
    let files = ipcRenderer.sendSync('find-sub-files', '/Users/xinsi/demo/ace-editor/node_modules/.bin');
    this.props.updateSelectedDir(files)
  }

  listSubFiles = selectedDir => {
    return selectedDir.sub.map(file => {
      return <FileCard key={file.path} file={file}/>
    })
  }

  render() {
    const {leftMenu, selectedDir} = this.props

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
        {/*占位*/}
        <Content>
          {
            selectedDir.path
              ? <div className='layout_right_content_layout_left_menu'>
                <div className='layout_right_content_layout_left_menu_scroll'>
                  {this.listSubFiles(selectedDir)}
                </div>
              </div>
              : ''
          }
          <div
            className={`layout_right_content_layout_right_content_markdown `}>
            <Markdown/>
          </div>
        </Content>
      </Layout>
    </Layout>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir))
})

const mapStateToProps = ({leftMenu, selectedDir}) => ({
  leftMenu,
  selectedDir
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
