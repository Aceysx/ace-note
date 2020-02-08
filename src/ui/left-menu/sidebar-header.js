import React from 'react'
import {Divider} from 'antd'
import Logo from '../../resources/images/logo.png'

const SideBarHeader = () => {
  return <div style={{position: 'fixed', zIndex: 100, width: 200, background: '#f8f6f1'}}>
    <div style={{height: 70, overflowY: 'hidden'}}>
      <img src={Logo}
           width={200}
           style={{marginTop: '-65px'}}/>
    </div>
    <Divider/>
  </div>
}
export default SideBarHeader