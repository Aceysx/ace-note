import React from 'react'
import {Descriptions} from "antd";
import LabelManagementBox from "./label-management-box";

export default class SettingBody extends React.Component {

  render() {
    const {labels} = this.props
    return <div style={{textAlign: 'left', padding: '0 50px'}}>
      <Descriptions title="Label's Management"/>
      <LabelManagementBox
        labels={labels}
        createLabel={this.props.createLabel}
        updateLabel={this.props.updateLabel}
      />
    </div>
  }
}
