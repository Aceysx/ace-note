import React from 'react'
import Calendar from 'react-github-contribution-calendar'
import {Col, Row} from "antd";
import Time from "../../model/time";

const total_part_of_one_day = 24 * 60 / 20

const TimecardCalendar = ({plans}) => {
  const values = {}
  plans.forEach(plan => {
    const key = plan.date
    const value = plan.tasks.reduce((sum, current) => {
      return sum + Object.values(current.label)[0]
    }, 0)
    values[key] = Math.ceil(value / total_part_of_one_day)
  })
  return <Row type='flex' justify='center'>
    <Col span={15}>
      <Calendar panelColors={['#EEE', '#36b8ff', '#1e678f', '#0e2e40',]} values={values}
                until={Time.format(Time.tomorrow())}/>
    </Col>
  </Row>
}

export default TimecardCalendar