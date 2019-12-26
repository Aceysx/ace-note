import React from 'react'
import {Row, Menu, Input, Layout, Divider} from "antd"
import {connect} from 'react-redux'
import {UPDATE_FILES, UPDATE_SELECTED_DIR} from "./dispatch-command/commands"
import LeftMenu from "./components/left-menu/left-menu"
import './css/app.css'

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
    let files = ipcRenderer.sendSync('find-sub-files', path);
    this.props.updateSelectedDir(files)
  }

  listSubFiles = selectedDir => {
    return selectedDir.sub.map(file => {
      return <p>{file.path}</p>
    })
  }

  render() {
    const {leftMenu, selectedDir} = this.props

    return <Layout className='layout'>
      <Sider
        className='layout_left_sider'
        theme='light'
      >
        {/*占位*/}
        <div style={{height: 50}}></div>
        <LeftMenu
          leftMenu={leftMenu}
          findSubFiles={this.findSubFiles}
        />
      </Sider>
      <Layout className='layout_right_content_layout'>
        {/*占位*/}
        <div style={{height: 20}}></div>
        <Divider/>
        <Content>
          {
            selectedDir.path
              ? <div className='layout_right_content_layout_left_menu'>
                {this.listSubFiles(selectedDir)}
              </div>
              : ''
          }

          <div className='layout_right_content_layout_left_menu'>
            Really
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            long
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
            ...
            <br/>
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

const mapStateToProps = ({leftMenu,selectedDir}) => ({
  leftMenu,
  selectedDir
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
