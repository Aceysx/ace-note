import React from 'react'
import {Button, DatePicker, Form, Input, message, Tag} from "antd";
import moment from "moment";

const {TextArea} = Input
const planTemplate = `[
{"title": "","label": {"1": 2}},
{"title": "","label": {"1": 2}},
{"title": "","label": {"1": 2}}
]
`
export default class TimecardPlanCreator extends React.Component {
  state = {
    date: moment(new Date().getTime()),
    title: moment(new Date()).format("YYYY-MM-DD"),
    plans: planTemplate,
    summary: ''
  }

  check = plans => {
    try {
      const planObject = JSON.parse(plans);
      const {labels = []} = this.props
      return planObject.every(plan => {
        const {label} = plan
        let labelsId = Object.keys(label);
        if (labelsId.length === 1) {
          return labels.some(item => parseInt(item.id) === parseInt(labelsId[0]))
        }
      })
    } catch (e) {
      return false;
    }
  }

  createPlan = () => {
    const {title, plans, summary, date} = this.state
    if (!this.check(plans)) {
      message.error('please check the format of plan')
      return
    }
    this.props.createPlan(
      {
        _path: window.getTimecardPath(),
        date: moment(date).format("YYYY-MM-DD"),
        title, plans: JSON.parse(plans), summary
      }
    );
  }

  render() {
    const {title, plans, summary, date} = this.state
    const {labels} = this.props

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
      <Form.Item label="Date">
        <DatePicker showTime format="YYYY-MM-DD"
                    value={date}
                    onChange={date => this.setState({date})}
        />
      </Form.Item>
      <Form.Item label="title">
        <TextArea rows={1}
                  value={title}
                  onChange={e => this.setState({title: e.target.value})}/>
      </Form.Item>
      <Form.Item label="plans">
        <TextArea rows={7}
                  value={plans}
                  onChange={e => this.setState({plans: e.target.value})}/>
      </Form.Item>
      <Form.Item label="summary">
        <TextArea rows={5}
                  value={summary}
                  onChange={e => this.setState({summary: e.target.value})}/>
      </Form.Item>
      <Button className='cursor_pointer' onClick={this.createPlan} block>SAVE</Button>
    </div>
  }
}