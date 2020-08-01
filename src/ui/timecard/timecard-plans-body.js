import React from 'react'
import {Col, Divider, List, Row, Tag} from "antd";

const TimecardPlansBody = ({plans, labels}) => {
  return <Row type='flex' justify='center'>

    <Col span={15}>
      <List
        itemLayout="horizontal"
        dataSource={plans}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<p>
                <span>{item.date + ': ' + item.title}
                </span>
                <span style={{float: 'right'}}>is summary {item.isSummary ? '1' : 0}</span>
              </p>
              }
              description={
                <span>
                  {
                    item.labels.map((label) => {
                      const found = labels.find(item => parseInt(item.id) === parseInt(Object.keys(label)[0])) || {}
                      const value = Object.values(label)[0]
                      return <Tag
                        key={found.id}
                        className='tag'
                        color={found.color}>
                    <span className='cursor_pointer'>
                      {found.title}
                    </span>
                        <Divider type={'vertical'}/>
                        <span style={{fontSize: '12px'}}>{value}</span>
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