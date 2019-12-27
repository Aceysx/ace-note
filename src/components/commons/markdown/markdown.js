import React from 'react'
import {Divider} from "antd";
import '../../../css/overwrite-hyperMD-style.css'

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
    md = HyperMD.fromTextArea(node, )
  }


  render() {
    const {myRef} = this.state
    const {file} = this.props
    if (md) {
      try {
        md.setValue(file.content || '写点东西吧✏️')
      }catch (e) {
        md.setValue(file.content || '写点东西吧✏️')
      }

    }
    return <div className='layout_right_content_layout_right_content_markdown_scroll'>
      <div style={{height: 50}}></div>
      <Divider style={{display: 'inline-block', marginLeft: 10}}/>
      <textarea style={{minHeight: 4000}}
                ref={myRef}/>
    </div>;
  }
}