import React from 'react'
import {Divider, Icon, Modal, Tabs} from "antd"

import TitleBar from "../title-bar/title-bar"
import TimecardCalendar from "./timecard-calendar"
import TimecardPlansBody from "./timecard-plans-body"
import TimecardPlanCreator from "./timecard-plan-creator"
import TimecardModel from "../../model/timecard"
import {publish} from "../../event/event-listener"
import {TIMECARD_PLAN_STATUS_CHANGE, TIMECARD_UPDATE_LABEL} from "../../event/event"
import PLAN_ICON from '../../resources/images/plan.png'
import STATISTICS_ICON from '../../resources/images/statistics.png'
import SETTINGS_ICON from '../../resources/images/settings.png'
import '../../resources/css/timecard.css'
import SettingBody from "./settings/setting-body";

const {TabPane} = Tabs

export default class TimecardBody extends React.Component {
  state = {
    creatorModalVisible: false,
    editPlan: null,
    isUpdate: false,
  }

  _updateLabels = () => {
    this.props.updateTimecardlabels(TimecardModel.getLabels())
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

  createPlan = plan => {
    TimecardModel.createPlan(plan)
    publish(TIMECARD_PLAN_STATUS_CHANGE, {props: this.props})
  }

  delPlan = plan => {
    TimecardModel.delPlan(plan)
    publish(TIMECARD_PLAN_STATUS_CHANGE, {props: this.props})
  }

  updateLabel = label => {
    TimecardModel.updateLabel(label)
    this._updateLabels()
    publish(TIMECARD_UPDATE_LABEL, {props: this.props})
  }

  createLabel = () => {
    const {timecardLabels} = this.props
    const id = parseInt(timecardLabels.length ? timecardLabels[timecardLabels.length - 1].id : 0) + 1
    TimecardModel.createLabel({
      id,
      title: 'New Label',
      color: '#0C797D'
    })
    this._updateLabels()
  }

  _filterDailyPlans = plans => {
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
              plans={this._filterDailyPlans(timecardPlans)}/>
            <Divider/>
            <TimecardPlansBody
              labels={timecardLabels}
              plans={timecardPlans}
              edit={this.editPlan}
              del={this.delPlan}
              create={this.createPlan}
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
          <SettingBody
            updateLabel={this.updateLabel}
            createLabel={this.createLabel}
            labels={timecardLabels}
          />
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
