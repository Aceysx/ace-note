import React from 'react'
import {Descriptions, Divider} from "antd";
import LabelManagementBox from "./label-management-box";
import TemplateManagementBox from "./template-management-box";

export default class SettingBody extends React.Component {

  render() {
    const {labels, planTemplates} = this.props
    return <div style={{textAlign: 'left', padding: '0 50px'}}>
      <Descriptions title="Label's Management"/>
      <LabelManagementBox
        labels={labels}
        createLabel={this.props.createLabel}
        updateLabel={this.props.updateLabel}
      />
      <Divider style={{margin: '30px 0'}}/>
      <Descriptions title="Plan's Template Management"/>
      <TemplateManagementBox
        planTemplates={planTemplates}
        labels={labels}
        createPlanTemplate={this.props.createPlanTemplate}
      />
    </div>
  }
}
