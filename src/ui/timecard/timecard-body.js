import React from 'react'
import TitleBar from "../title-bar/title-bar"
import {connect} from 'react-redux'

import TimecardCalendar from "./timecard-calendar";
import TimecardPlansBody from "./timecard-plans-body";
import {Button, Divider, Modal} from "antd";
import TimecardPlanCreator from "./timecard-plan-creator";
import {UPDATE_TIMECARD_LABELS, UPDATE_TIMECARD_PLANS} from "../../redux/reducers/dispatch-command/commands";
import TimecardModel from "../../model/timecard";

class TimecardBody extends React.Component {
  state = {
    creatorModalVisible: true
  }

  componentDidMount() {
    const plans = TimecardModel.getPlansByYear('2020')
    const labels = TimecardModel.getLabels()
    console.log(labels)
    this.props.updateTimecardPlans(plans)
    this.props.updateTimecardlabels(labels)
  }

  render() {
    const {leftMenuVisible, timecardPlans, timecardLabels} = this.props
    const {creatorModalVisible} = this.state

    return <div>
      <TitleBar
        title=' 📆 Timecard'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>
      <TimecardCalendar/>
      <Divider/>
      <Button type="primary"
              onClick={() => this.setState({creatorModalVisible: true})}>
        New</Button>
      <TimecardPlansBody
        timecardLabels={timecardLabels}
        timecardPlans={timecardPlans}
      />

      <Modal
        title="Create plan"
        visible={creatorModalVisible}
        width='80%'
        style={{height: 600}}
        footer={null}
        onCancel={() => this.setState({creatorModalVisible: false})}
      >
        <TimecardPlanCreator
          labels={timecardLabels}
          createPlan={TimecardModel.createPlan}/>
      </Modal>
    </div>
  }
}

const mapDispatchToProps = dispatch => ({
  updateTimecardPlans: plans => dispatch(UPDATE_TIMECARD_PLANS(plans)),
  updateTimecardlabels: (labels) => dispatch(UPDATE_TIMECARD_LABELS(labels)),
})

const mapStateToProps = ({timecardPlans, timecardLabels}) => ({
  timecardPlans, timecardLabels
})
export default connect(mapStateToProps, mapDispatchToProps)(TimecardBody)
