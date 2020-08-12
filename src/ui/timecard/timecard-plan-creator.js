import React from 'react'
import moment from "moment"
import {Button, DatePicker, Divider, Form, Input, message, Radio, Tag} from "antd"
import PLAN_TEMPLATE from './template/plan-template'

const {TextArea} = Input

export default class TimecardPlanCreator extends React.Component {
  state = {
    date: moment(new Date().getTime()),
    title: moment(new Date()).format("YYYY-MM-DD"),
    tasks: PLAN_TEMPLATE[0].content,
    summary: '',
    template: PLAN_TEMPLATE[0].title
  }

  componentDidMount() {
    if (this.props.editPlan) {
      const {date, title, tasks, summary} = this.props.editPlan
      this.setState({
        date: moment(date),
        title,
        tasks: JSON.stringify(tasks),
        type:'day',
        summary
      })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.editPlan) {
      const {date, title, tasks, summary} = nextProps.editPlan
      this.setState({
        date: moment(date),
        title,
        tasks: JSON.stringify(tasks),
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
      title: moment(new Date()).format("YYYY-MM-DD"),
      tasks: PLAN_TEMPLATE[0].title,
      summary: ''
    })
  }
  createPlan = () => {
    const {title, tasks, summary, date} = this.state
    if (!this.check(tasks)) {
      message.error('please check the format of plan')
      return
    }
    this.props.createPlan(
      {
        _path: window.getTimecardPath(),
        date: moment(date).format("YYYY-MM-DD"),
        title, tasks, summary
      }
    )
    this.reset()
  }
  changeTemplate = template => {
    let found = PLAN_TEMPLATE.find(item => item.title === template);
    const {title, content} = found
    this.setState({
      template: title,
      tasks: content
    })
  }

  render() {
    const {title, tasks, summary, date, template} = this.state
    const {labels, isUpdate} = this.props
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
      <label>Template：</label>
      <Radio.Group value={template}
                   onChange={e => this.changeTemplate(e.target.value)}>
        {
          PLAN_TEMPLATE.map(template => {
            return <Radio.Button value={template.title}>{template.title}</Radio.Button>
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
      <Form.Item label="Task">
        <TextArea rows={7}
                  value={tasks}
                  onChange={e => this.setState({tasks: e.target.value})}/>
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