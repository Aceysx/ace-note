import React from 'react'
import TitleBar from "../title-bar/title-bar"
import {connect} from 'react-redux'

import TimecardCalendar from "./timecard-calendar";
import TimecardPlansBody from "./timecard-plans-body";
import {Divider, Modal} from "antd";
import TimecardPlanCreator from "./timecard-plan-creator";
import {UPDATE_TIMECARD_LABELS, UPDATE_TIMECARD_PLANS} from "../../redux/reducers/dispatch-command/commands";
import TimecardModel from "../../model/timecard";
import {publish} from "../event/publish-event";
import {CREATE_TIMECARD_PLAN} from "../event/event"
import '../../resources/css/timecard.css'

class TimecardBody extends React.Component {
  state = {
    creatorModalVisible: false,
    editPlan: null
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
      editPlan: plan
    })
  }

  closeCreateModal=()=>{
    this.setState({
      creatorModalVisible: false,
      editPlan:null
    })
  }
  render() {
    const {leftMenuVisible, timecardPlans, timecardLabels} = this.props
    const {creatorModalVisible, editPlan} = this.state
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
          editPlan={editPlan}
          labels={timecardLabels}
          createPlan={timecard => {
            TimecardModel.createPlan(timecard)
            this.closeCreateModal()
            publish(CREATE_TIMECARD_PLAN, {props: this.props})
          }}/>
      </Modal>

      <div
        className='create-button-fixed cursor_pointer'
        onClick={() => this.setState({creatorModalVisible: true})}>
        New
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
