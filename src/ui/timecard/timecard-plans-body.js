import React from 'react'
import {Col, Divider, List, Row, Tag} from "antd";

const data = [
  {
    title: '[2020-02-02]',
  },
  {
    title: '[2020-02-03]',
  },
  {
    title: '[2020-02-04]',
  },
  {
    title: '[2020-02-05]',
  },
];
const TimecardPlansBody = ({timecardPlans}) => {
  return <Row type='flex' justify='center'>
    <Col span={20}>
      <List
        itemLayout="horizontal"
        dataSource={timecardPlans}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<p>
                <span>{item.date + ' ' + item.title}
                </span>
                <span style={{float: 'right'}}>is summary {item.isSummary?'1':0}</span>
              </p>
              }
              description={
                <span>
                  {
                    Object.keys(item.labels).map(labelId => {
                      return <Tag
                        className='tag'
                        color={'red'}>
                    <span className='cursor_pointer'>
                      {labelId}
                    </span>
                        <Divider type={'vertical'}/>
                        <span style={{fontSize: '12px'}}> 1</span>
                      </Tag>
                    })
                  }
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Col>
  </Row>
}

export default TimecardPlansBody