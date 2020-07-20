import React from 'react'
import {Col, Divider, List, Row, Tag} from "antd";

const TimecardPlansBody = ({timecardPlans, timecardLabels}) => {
  return <Row type='flex' justify='center'>
    {
      timecardLabels.map(label => {
        return <Tag
          className='tag'
          color={label.color}>
          {label.id + label.title}
        </Tag>
      })
    }
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
                <span style={{float: 'right'}}>is summary {item.isSummary ? '1' : 0}</span>
              </p>
              }
              description={
                <span>
                  {
                    Object.keys(item.labels).map(labelId => {
                      console.log(item.labels)
                      const label = timecardLabels.find(label => label.id === labelId) || {}
                      console.log(label)
                      return <Tag
                        className='tag'
                        color={'red'}>
                    <span className='cursor_pointer'>
                      {label.title}
                    </span>
                        <Divider type={'vertical'}/>
                        <span style={{fontSize: '12px'}}></span>
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