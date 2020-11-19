import React from 'react'
import {Input, Row, Tabs} from 'antd'

import '../../resources/css/setting.css'

const {TabPane} = Tabs

const Setting = ({workspace, resetWorkspace}) => {
  const callback = (key) => {
    console.log(key);
  }
  return <div className='setting_container'>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="setting" key="1">
        <Row>
          <span>Workspace</span>
          <span style={{
            display: 'inline-block',
            width: 500,
            marginLeft: 10
          }}>
            <Input value={workspace}
                   onClick={resetWorkspace}/>
          </span>
        </Row>
      </TabPane>
    </Tabs>
  </div>
}

export default Setting
