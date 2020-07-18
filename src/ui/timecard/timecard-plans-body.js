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
const TimecardPlansBody = ({}) => {
  return <Row type='flex' justify='center'>
    <Col span={20}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<p>
                <span>{item.title}
                </span>
                <span style={{float: 'right'}}>is summary</span>
              </p>
              }
              description={
                <span>
                  <Tag
                       className='tag'
                       color={'red'}>
                    <span className='cursor_pointer'>
                睡觉
                </span>
                    <Divider type={'vertical'}/>
                    <span style={{fontSize: '12px'}}> 1</span>
                  </Tag><Tag
                       className='tag'
                       color={'green'}>
                    <span className='cursor_pointer'>
                 学习
                </span>
                    <Divider type={'vertical'}/>
                    <span style={{fontSize: '12px'}}> 1 🍉</span>
                  </Tag>
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