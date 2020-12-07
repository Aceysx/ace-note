import React from 'react'
import moment from "moment"
import {Button, DatePicker, Divider, Form, Input, Radio, Tag} from "antd"
import PlanCreatorBox from "./settings/plan-creator-box";

const {TextArea} = Input

export default class TimecardPlanCreator extends React.Component {
  state = {
    date: moment(new Date().getTime()),
    title: '',
    tasks: [],
    summary: '',
    templateId: 0
  }

  componentDidMount() {
    this.reset()
    if (this.props.editPlan) {
      const {date, title, tasks, summary} = this.props.editPlan
      this.setState({
        date: moment(date),
        title,
        tasks,
        type: 'day',
        summary
      })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.reset()
    if (nextProps.editPlan) {
      const {date, title, tasks, summary} = nextProps.editPlan
      this.setState({
        date: moment(date),
        title,
        tasks,
        summary
      })
    }
  }

  check = tasks => {
    try {
      const taskObject = JSON.parse(tasks);
      const {labels = []} = this.props
      return taskObject.every(task => {
        const {label} = task
        let labelsId = Object.keys(label);
        if (labelsId.length === 1) {
          return labels.some(item => parseInt(item.id) === parseInt(labelsId[0]))
        }
      })
    } catch (e) {
      return false;
    }
  }

  reset = () => {
    this.setState({
      date: moment(new Date().getTime()),
      title: [],
      tasks: [],
      summary: ''
    })
  }
  createPlan = () => {
    let {title, tasks, summary, date} = this.state
    this.props.createPlan(
      {
        date: moment(date).format("YYYY-MM-DD"),
        title, tasks, summary
      }
    )
    this.reset()
  }

  changeTemplate = templateId => {
    const {planTemplates = []} = this.props
    let found = planTemplates.find(item => item.id === templateId);
    const {id, tasks} = found
    this.setState({
      templateId: id,
      tasks: JSON.parse(JSON.stringify(tasks))
    })
  }

  render() {
    const {title, tasks, summary, date, templateId} = this.state
    const {labels = [], isUpdate, planTemplates} = this.props
    return <div>
      {
        labels.map(label => {
          return <Tag
            key={label.id}
            className='tag'
            color={label.color}>
            {label.id + label.title}
          </Tag>
        })
      }
      <Divider/>
      <label>Templates：</label>
      <Radio.Group value={templateId}
                   onChange={e => this.changeTemplate(e.target.value)}>
        {
          planTemplates.map(template => {
            return <Radio.Button value={template.id}>{template.title}</Radio.Button>
          })
        }
      </Radio.Group>
      <Form.Item label="Date">
        <DatePicker
          disabled={isUpdate}
          showTime format="YYYY-MM-DD"
          value={date}
          onChange={date => this.setState({date})}
        />
      </Form.Item>
      <Form.Item label="Title">
        <TextArea rows={1}
                  value={title}
                  onChange={e => this.setState({title: e.target.value})}/>
      </Form.Item>
      <Form.Item label="Tasks">
        <PlanCreatorBox
          tasks={tasks}
          updateTasks={tasks => this.setState({tasks})}
          planTemplates={planTemplates}
          labels={labels}
        />
      </Form.Item>
      <Form.Item label="Summary">
        <TextArea rows={5}
                  value={summary}
                  onChange={e => this.setState({summary: e.target.value})}/>
      </Form.Item>
      <Button className='cursor_pointer' onClick={this.createPlan} block>SAVE</Button>
    </div>
  }
}