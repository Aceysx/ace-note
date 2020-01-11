import React from 'react'
import {Tabs} from 'antd'
import '../../css/setting.css'
const {TabPane} = Tabs

const Setting = ({}) => {
  const callback = (key) => {
    console.log(key);
  }
  return <div className='setting_container'>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="setting" key="1">
        Content of Tab Pane 1
      </TabPane>
    </Tabs>
  </div>
}

export default Setting