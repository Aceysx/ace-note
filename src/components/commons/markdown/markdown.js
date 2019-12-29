import React from 'react'
import {Col, Divider, Row, Input, Button} from "antd";
import '../../../css/overwrite-hyperMD-style.css'
import '../../../css/markdown.css'
const HyperMD = require('hypermd')
require("codemirror/mode/htmlmixed/htmlmixed")
require("codemirror/mode/stex/stex")
require("codemirror/mode/yaml/yaml")

let md
export default class Markdown extends React.Component {
  state = {
    myRef: React.createRef(),
  }

  componentDidMount() {
    const node = this.state.myRef.current
    md = HyperMD.fromTextArea(node,)
  }


  render() {
    const {myRef} = this.state
    const {file} = this.props
    if (md) {
      try {
        md.setValue(file.content || '写点东西吧✏️')
      } catch (e) {
        md.setValue(file.content || '写点东西吧✏️')
      }

    }
    return <div className='layout_right_content_layout_markdown_scroll'>
      <Row style={{height: 50}}>
        <Col span={20}>
          <Input className='title'
                 size="large" value={file.path || ''}/>
        </Col>
      </Row>
      <Divider style={{display: 'inline-block', marginLeft: 10}}/>
      <Row type='flex'>
        <Button tyle='link'>save</Button>
      </Row>

      <textarea style={{minHeight: 4000}}
                ref={myRef}/>
    </div>
  }
}