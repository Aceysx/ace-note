import React from 'react'
import {Col, Divider, Icon, List, Popconfirm, Row, Tabs, Tag} from "antd"
import moment from 'moment'

const {TabPane} = Tabs
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const TimecardPlansBody = ({plans, labels, edit, del}) => {
  const filterPlansByMonth = month => {
    let filter = plans.filter(plan => moment(plan.date).month() === parseInt(month));
    console.log(filter)
    return filter
  }
  const calculateTagStatus = (tasks, labels) => {
    const result = []
    tasks.forEach(task => {
      const foundTask = labels.find(item => parseInt(item.id) === parseInt(Object.keys(task.label)[0])) || {}
      const value = Object.values(task.label)[0]
      const foundLabel = result.find(item => parseInt(item.id) === parseInt(foundTask.id))
      if (foundLabel) {
        foundLabel.value += value
      } else {
        result.push({
          ...foundTask,
          value
        })
      }
    })
    return result
  }
  return <Row type='flex' justify='center'>

    <Col span={20}>
      <Tabs tabPosition={'left'} defaultActiveKey={MONTHS[moment().month()]}>
        {
          MONTHS.map((month, index) => {
            return <TabPane tab={month} key={month}>
              <List
                itemLayout="horizontal"
                dataSource={filterPlansByMonth(index)}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<p>
                <span>{item.date + '  ' + item.title}
                </span>
                        <span style={{float: 'right'}}>
                  <Icon className='cursor_pointer'
                        style={{fontSize: 16, color: '#2e99ff'}}
                        type="form"
                        onClick={() => edit(item)}/>
                  <Divider type='vertical'/>
                   <Popconfirm title="Are you sure to delete ？"
                               okText="Yes"
                               onConfirm={() => del(item)}
                               cancelText="No">
                    <Icon className='cursor_pointer'
                          style={{fontSize: 16, color: '#b7906b'}}
                          type="delete"/>
                   </Popconfirm>
                   </span>
                      </p>
                      }
                      description={
                        <span>
                  {
                    calculateTagStatus(item.tasks, labels)
                      .map((item, index) => {
                        const {title, color, value} = item
                        return <Tag
                          key={index}
                          className='plan_tag'
                          color={color}>
                    <span className='cursor_pointer'>
                      {title}
                    </span>
                          <Divider type={'vertical'}/>
                          <span style={{fontSize: '12px'}}>{value}</span>
                        </Tag>
                      })
                  }
                </span>
                      }/>
                  </List.Item>
                )}
              />
            </TabPane>
          })
        }
      </Tabs>
    </Col>
  </Row>
}
export default TimecardPlansBody