import React from 'react'
import {Col, Collapse, Divider, Icon, List, Popconfirm, Row, Tabs, Tag} from "antd"
import moment from 'moment'
import TimecardMonthEditor from "./timecard-month-editor"
import SUN from '../../resources/images/week/week-0.png'
import MON from '../../resources/images/week/week-1.png'
import TUE from '../../resources/images/week/week-2.png'
import WED from '../../resources/images/week/week-3.png'
import THU from '../../resources/images/week/week-4.png'
import FRI from '../../resources/images/week/week-5.png'
import SAT from '../../resources/images/week/week-6.png'
import SUMMARY_ICON from '../../resources/images/summary.png'

const {Panel} = Collapse
const {TabPane} = Tabs
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKLY_ICONS = [
  SUN, MON, TUE, WED, THU, FRI, SAT
]
const TimecardPlansBody = ({plans, labels, edit, del, create}) => {
  const filterPlansByMonth = month => {
    let filter = plans.filter(plan =>
      moment(plan.date).month() === parseInt(month)
      && (plan.type === 'day' || !plan.type)
    )

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
            let dataSource = filterPlansByMonth(index);
            return <TabPane
              tab={<span className='cursor_pointer'>{month}{dataSource.length ? `|${dataSource.length}` : ''}</span>}
              key={month}>
              <Collapse>
                <Panel header={`${MONTHS[index]} Flags`} key="1">
                  <TimecardMonthEditor
                    plan={plans.find(plan =>
                      plan.type === 'month'
                      && moment(plan.date).month() === index)}
                    updateMonthPlan={create}
                  />
                </Panel>
              </Collapse>
              <List
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={<p>
                <span>
                  <img width={35}
                       src={WEEKLY_ICONS[moment(item.date).weekday()]}/>
                  {item.date + '  ' + item.title}
                </span>
                        <span style={{float: 'right'}}>
                          {
                            item.summary
                              ? <span>
                                <img
                                  className='cursor_pointer'
                                  src={SUMMARY_ICON} width={20} style={{marginTop: -2}}/>
                                  <Divider type={'vertical'}/>
                                </span>
                              : ''
                          }

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
                </span>}/>
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