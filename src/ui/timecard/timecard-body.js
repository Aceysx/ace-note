import React from 'react'
import {connect} from 'react-redux'
import {Divider, Icon, Modal, Tabs} from "antd"

import TitleBar from "../title-bar/title-bar"
import TimecardCalendar from "./timecard-calendar"
import TimecardPlansBody from "./timecard-plans-body"
import TimecardPlanCreator from "./timecard-plan-creator"
import TimecardModel from "../../model/timecard"
import {publish} from "../../event/event-listener"
import {UPDATE_TIMECARD_LABELS, UPDATE_TIMECARD_PLANS} from "../../redux/reducers/dispatch-command/commands"
import {TIMECARD_PLAN_STATUS_CHANGE} from "../../event/event"
import PLAN_ICON from '../../resources/images/plan.png'
import STATISTICS_ICON from '../../resources/images/statistics.png'
import SETTINGS_ICON from '../../resources/images/settings.png'
import '../../resources/css/timecard.css'

const {TabPane} = Tabs

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
  filterDailyPlans = plans => {
    return plans.filter(plan => {
      return plan.type === 'day' || !plan.type
    })
  }

  render() {
    const {leftMenuVisible, timecardPlans, timecardLabels} = this.props
    const {creatorModalVisible, editPlan, isUpdate} = this.state
    return <div>
      <TitleBar
        title={<span><img src={require('../../resources/images/timecard.png')}/>Timecard</span>}
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <Tabs defaultActiveKey="1"
            style={{textAlign: 'center', zIndex: 1000}}>
        <TabPane tab={
          <span className='cursor_pointer'>
            <img src={PLAN_ICON} width={18}/>
            <Divider type={'vertical'}/>
            Plans
          </span>} key="1">
          <div style={{textAlign: 'left'}}>
            <TimecardCalendar
              plans={this.filterDailyPlans(timecardPlans)}/>
            <Divider/>
            <TimecardPlansBody
              labels={timecardLabels}
              plans={timecardPlans}
              edit={this.editPlan}
              del={this.delPlan}
              create={plan => TimecardModel.createPlan(plan)}
            />
            <div
              className='create-button-fixed cursor_pointer'
              onClick={() => {
                this.setState({creatorModalVisible: true})
              }}>
              <Icon type="plus"
                    className='cursor_pointer'
                    style={{fontSize: '25px', fontWeight: 'bold'}}/>
            </div>
          </div>
        </TabPane>
        <TabPane tab={
          <span className='cursor_pointer'>
            <img src={STATISTICS_ICON} width={18}/>
            <Divider type={'vertical'}/>
            Statistic
          </span>
        } key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab={
          <span className='cursor_pointer'>
            <img src={SETTINGS_ICON} width={18}/>
            <Divider type={'vertical'}/>
            Settings
          </span>
        } key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>


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
