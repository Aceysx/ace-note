import React from 'react'
import Calendar from 'react-github-contribution-calendar'
import {Col, Row} from "antd";

var values = {
  '2016-06-23': 1,
  '2016-06-26': 2,
  '2016-06-27': 3,
  '2016-06-28': 4,
  '2016-06-29': 4
}
var until = '2016-06-30';
const TimecardCalendar = ({}) => {
  return <Row type='flex' justify='center'>
    <Col span={15}>
      <Calendar values={values} until={until}/>
    </Col>
  </Row>
}

export default TimecardCalendar