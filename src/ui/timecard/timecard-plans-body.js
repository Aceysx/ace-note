import React from 'react'
import {Col, Divider, Icon, List, Row, Tag} from "antd"

const TimecardPlansBody = ({plans, labels, edit}) => {
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
                <span style={{float: 'right'}}>
                  <Icon className='cursor_pointer'
                        style={{fontSize: 16}}
                        type="form"
                        onClick={() => edit(item)}/>
                   </span>
              </p>
              }
              description={
                <span>
                  {
                    item.tasks.map((task, index) => {
                      const found = labels.find(item => parseInt(item.id) === parseInt(Object.keys(task.label)[0])) || {}
                      const value = Object.values(task.label)[0]
                      return <Tag
                        key={index}
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