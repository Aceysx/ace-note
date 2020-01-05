import React from 'react'
import {Col, Divider, Icon, Input, Row, notification} from "antd";
import '../../../css/overwrite-hyperMD-style.css'
import '../../../css/markdown.css'
import Files from "../../../utils/files";

const HyperMD = require('hypermd')
require("codemirror/mode/htmlmixed/htmlmixed")
require("codemirror/mode/stex/stex")
require("codemirror/mode/yaml/yaml")

let md
export default class Markdown extends React.Component {
  state = {
    mdRef: React.createRef(),
    changedPath: '',
    isContentChanged: false
  }

  componentDidMount() {
    const node = this.state.mdRef.current
    const {file} = this.props
    this.setState({
      changedPath: Files.nameByPath(file.path)
    }, () => {
      md = HyperMD.fromTextArea(node, {
        extraKeys: {
          'Cmd-S': this.modifyFileContent,
          'Ctrl-S': this.modifyFileContent
        }
      })
      md.on('change', (instance, target) => {
        const {file} = this.props
        if (target.origin !== 'setValue') {
          const isContentChanged = instance.getValue() !== file.content;
          this.setState({isContentChanged})
        }
      })

      this._updateMarkdownContent(file.content)
    })
  }

  componentWillReceiveProps(nextProps) {
    const {file} = nextProps
    if (this.props.file.path !== file.path) {
      this.setState({changedPath: Files.nameByPath(file.path)})
    }
    if (this.props.file.content !== file.content) {
      this._updateMarkdownContent(file.content)
    }
    this.setState({isContentChanged: false})
  }

  _updateMarkdownContent = data => {
    try {
      md.setValue(data)
    } catch (e) {
      md.setValue(data)
    }
  }

  modifyFileName = () => {
    const {file} = this.props
    const {changedPath} = this.state
    this.props.modifyFileName(file.path, changedPath)
  }

  modifyFileContent = () => {
    const {file} = this.props
    const currentContent = md.getValue()
    if (file.content !== currentContent) {
      this.props.modifyFileContent(file.path, currentContent)
      notification.success({message: '更新成功'})
    }
  }

  render() {
    const {mdRef, changedPath, isContentChanged} = this.state
    return <div className='layout_right_content_layout_markdown_scroll'>
      <div className='markdown_box_header'>
        <Row style={{height: 50}}>
          <Col span={20}>
            <Input className='markdown_box_title'
                   onPressEnter={this.modifyFileName}
                   onChange={e => this.setState({changedPath: e.target.value})}
                   size="large" value={changedPath || ''}/>
          </Col>
        </Row>
        <Divider style={{display: 'inline-block', marginLeft: 10}}/>
        <div className='markdown_box_bar'>
          <div className='markdown_box_tool'>
            {
              isContentChanged
                ?
                <span className='cursor_pointer'
                      onClick={this.modifyFileContent}>
                  <Icon type="save"/> 点击保存(CTRL+S)
                </span>
                : ''
            }
          </div>
        </div>
      </div>
      <div style={{height: 120}}></div>
      <textarea
        style={{minHeight: 4000}}
        ref={mdRef}/>
    </div>
  }
}