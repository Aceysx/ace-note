import React from 'react'
import {Row, Col, Input} from "antd"
import {connect} from 'react-redux'
import {UPDATE_FILES} from "./dispatch-command/commands";
import LeftMenu from "./components/left-menu/left-menu";

const {TextArea} = Input
const {ipcRenderer} = window.electron

class App extends React.Component {
  state = {
    fileContent: ''
  }

  componentDidMount() {
    ipcRenderer.on('init-done', (event, data) => {
      console.log(data)
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

  openFile = file => {
    ipcRenderer.send('open-file', file)
  }

  render() {
    const {leftMenu} = this.props

    return <div>
      <Row>
        <Col span={4}>
          <LeftMenu leftMenu={leftMenu}/>
        </Col>
        <Col span={20}>
          <TextArea rows={4} value={this.state.fileContent}/>
        </Col>
      </Row>
    </div>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs))
})

const mapStateToProps = ({leftMenu}) => ({
  leftMenu
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
