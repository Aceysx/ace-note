import React from 'react'
import {Divider} from "antd";
import '../../../css/overwrite-hyperMD-style.css'

const HyperMD = require('hypermd')
require("codemirror/mode/htmlmixed/htmlmixed")
require("codemirror/mode/stex/stex")
require("codemirror/mode/yaml/yaml")


export default class Markdown extends React.Component {
  state = {
    myRef: React.createRef(),
    markdownBoxRef: React.createRef(),
  }

  componentDidMount() {
    const node = this.state.myRef.current

    HyperMD.fromTextArea(node, {
      hmdModeLoader: false,
    })
   this.resize()
  }

  resize = () => {
    const {markdownWidth} = this.state
    const {clientWidth, clientHeight,offsetWidth,scrollWidth} = this.state.markdownBoxRef.current;
    console.log(clientWidth,scrollWidth,offsetWidth)
    if (markdownWidth !== clientWidth) {
      this.setState({markdownWidth: clientWidth, markdownHeight: clientHeight});
    }
  }

  render() {
    const {markdownBoxRef, myRef} = this.state
    return <div className='layout_right_content_layout_right_content_markdown_scroll'
                ref={markdownBoxRef}>
      <div style={{height: 50}}></div>
      <Divider style={{display: 'inline-block'}}/>
      <textarea id="myTextarea"
                style={{minHeight: 4000}}
                ref={myRef}>
        # Hello World# Hello World tebie chang d
        tebie chang de yiduanhua
      </textarea>
    </div>
  }
}