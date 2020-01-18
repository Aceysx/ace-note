import React from 'react'
import {Input, Row, Tabs, Upload} from 'antd'
import '../../css/setting.css'

const {TabPane} = Tabs

const Setting = ({}) => {
  const callback = (key) => {
    console.log(key);
  }

  const beforeUpload = (file,fileList)=>{
    return false
  }
  return <div className='setting_container'>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="setting" key="1">
        <Row>
          <span>我的文件夹 </span>
          <span style={{display: 'inline-block', width: 300, marginLeft: 10}}>
            <Upload action='null' beforeUpload={beforeUpload} directory>
            <Input/>
            </Upload>
          </span>
        </Row>
      </TabPane>
    </Tabs>
  </div>
}

export default Setting