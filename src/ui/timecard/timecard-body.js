import React from 'react'
import TitleBar from "../title-bar/title-bar"
import TimecardCalendar from "./timecard-calendar";
import TimecardPlansBody from "./timecard-plans-body";
import {Divider} from "antd";

export default class TimecardBody extends React.Component {

  render() {
    const {leftMenuVisible} = this.props

    return <div>
      <TitleBar
        title=' 📆 Timecard'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>
      <TimecardCalendar/>
      <Divider/>
      <TimecardPlansBody/>
    </div>
  }
}