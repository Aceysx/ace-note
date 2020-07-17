import React from "react";
import {Divider, Icon, Tooltip} from "antd";

const Question = () => {
  return <Tooltip title={<div>
    <p>Global Shortcuts</p>
    <span>* ⌘+f -> open search bar</span><br/>
    <span>* ⌘+1 -> fold/unfold left sidebar</span><br/>
    <span>* ⌘+2 -> fold/unfold the list of note</span><br/>
    <Divider/>
    <p>Markdown Shortcuts</p>
    <span>* ⌘+x -> delete one line</span><br/>
    <span>* ⌘+b -> bold word</span><br/>
    <span>* ⌘+d -> add strikethrough </span><br/>
    <span>* ⌘+3 -> ### </span><br/>
    <span>* ⌘+4 -> #### </span><br/>
    <span>* ⌘+5 -> ##### </span><br/>
    <span>* ⌘+'  -> ` </span><br/>
    <span>* ⌘+m  -> switch mindMap view mode in markdown editor </span><br/>
  </div>}>
      <span style={{position: 'fixed', fontSize: 18, right: 70, top: -1}}>
          <Icon type="question-circle"/>
      </span>
  </Tooltip>
}
export default Question