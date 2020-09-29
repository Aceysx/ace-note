import React from "react"
import moment from 'moment'
import {Input, message, Tag} from "antd"

const {TextArea} = Input
const DEFAULT_PLAN = {
  date: '',
  title: '',
  summary: '',
  type: 'month',
  tasks: ''
}

export default class TimecardMonthEditor extends React.Component {
  state = {
    plan: DEFAULT_PLAN
  }

  componentDidMount() {
    const {plan} = this.props
    this.setState({plan})
  }

  updateState = (value, type) => {
    const {plan} = this.state
    this.setState({
      plan: {...plan, [type]: value}
    })
  }

  updatePlan = () => {
    const {plan} = this.state
    this.props.updateMonthPlan({
      ...plan,
      type: 'month',
      date: plan.date || moment().format("YYYY-MM")
    })
    message.success('update success')
  }

  render() {
    const {plan = DEFAULT_PLAN} = this.state
    const {tasks, summary} = plan

    return <div>
      <h3>
        <span>Tasks</span>
        <Tag color="#2db7f5"
             className='cursor_pointer'
             onClick={this.updatePlan}
             style={{float: 'right'}}>update</Tag>
      </h3>
      <TextArea rows={15}
                value={tasks}
                onChange={e => this.updateState(e.target.value, 'tasks')}/>

      <h3>Summary</h3>
      <TextArea rows={20}
                value={summary}
                onChange={e => this.updateState(e.target.value, 'summary')}/>
    </div>
  }
}