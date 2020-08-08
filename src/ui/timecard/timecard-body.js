import React from 'react'
import {connect} from 'react-redux'
import {Divider, Icon, Modal} from "antd"

import TitleBar from "../title-bar/title-bar"
import TimecardCalendar from "./timecard-calendar"
import TimecardPlansBody from "./timecard-plans-body"
import TimecardPlanCreator from "./timecard-plan-creator"
import TimecardModel from "../../model/timecard"
import {publish} from "../event/publish-event"
import {UPDATE_TIMECARD_LABELS, UPDATE_TIMECARD_PLANS} from "../../redux/reducers/dispatch-command/commands"
import {TIMECARD_PLAN_STATUS_CHANGE} from "../event/event"

import '../../resources/css/timecard.css'

class TimecardBody extends React.Component {
  state = {
    creatorModalVisible: false,
    editPlan: null,
    isUpdate: false,
  }

  componentDidMount() {
    const plans = TimecardModel.getPlansByYear('2020')
    const labels = TimecardModel.getLabels()
    this.props.updateTimecardPlans(plans)
    this.props.updateTimecardlabels(labels)
  }

  editPlan = plan => {
    this.setState({
      creatorModalVisible: true,
      isUpdate: true,
      editPlan: plan
    })
  }

  closeCreateModal = () => {
    this.setState({
      creatorModalVisible: false,
      isUpdate: false,
      editPlan: null
    })
  }

  delPlan = plan => {
    TimecardModel.delPlan(plan)
    publish(TIMECARD_PLAN_STATUS_CHANGE, {props: this.props})
  }

  render() {
    const {leftMenuVisible, timecardPlans, timecardLabels} = this.props
    const {creatorModalVisible, editPlan, isUpdate} = this.state
    return <div>
      <TitleBar
        title=' 📆 Timecard'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>
      <TimecardCalendar
        plans={timecardPlans}/>
      <Divider/>

      <TimecardPlansBody
        labels={timecardLabels}
        plans={timecardPlans}
        edit={this.editPlan}
        del={this.delPlan}
      />

      <Modal
        title="Create plan"
        visible={creatorModalVisible}
        width='80%'
        style={{height: 600}}
        footer={null}
        onCancel={this.closeCreateModal}
      >
        <TimecardPlanCreator
          isUpdate={isUpdate}
          editPlan={editPlan}
          labels={timecardLabels}
          createPlan={timecard => {
            TimecardModel.createPlan(timecard)
            this.closeCreateModal()
            publish(TIMECARD_PLAN_STATUS_CHANGE, {props: this.props})
          }}/>
      </Modal>

      <div
        className='create-button-fixed cursor_pointer'
        onClick={() => this.setState({creatorModalVisible: true})}>
        <Icon type="plus"
              className='cursor_pointer'
              style={{fontSize: '25px',fontWeight:'bold'}}/>
      </div>
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
