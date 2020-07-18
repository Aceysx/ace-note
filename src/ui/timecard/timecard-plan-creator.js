import React from 'react'
import {Button, DatePicker, Input} from "antd";
import moment from "moment";

const {TextArea} = Input
const planTemplate = `[{
\t"title": "",
\t"label": {
\t\t"1": 2
\t}
}]
`
export default class TimecardPlanCreator extends React.Component {
  state = {
    date: moment(new Date().getTime()),
    title: '',
    plans: planTemplate,
    summary: ''
  }

  createPlan = () => {
    const {title, plans, summary, date} = this.state
    this.props.createPlan(
      {
        _path: window.getTimecardPath(),
        date: moment(date).format("YYYY-MM-DD"),
        title, plans: JSON.parse(plans), summary
      }
    )
  }

  render() {
    const {title, plans, summary, date} = this.state
    return <div>
      date:
      <div><DatePicker showTime format="YYYY-MM-DD"
                       value={date}
                       onChange={date => this.setState({date})}
      /></div>

      title area:
      <TextArea rows={3}
                value={title}
                onChange={e => this.setState({title: e.target.value})}/>
      plan area:
      <TextArea rows={10}
                value={plans}
                onChange={e => this.setState({plans: e.target.value})}/>

      summary area:
      <TextArea rows={10}
                value={summary}
                onChange={e => this.setState({summary: e.target.value})}/>
      <Button onClick={this.createPlan}>save/edit</Button>
    </div>
  }
}