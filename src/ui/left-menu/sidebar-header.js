import React from 'react'
import Logo from '../../resources/images/logo.png'

const SideBarHeader = () => {
  return <div style={{position: 'fixed', zIndex: 100, width: 200, background: '#f8f6f1'}}>
    <div style={{height: 70, overflowY: 'hidden'}}>
      <img src={Logo}
           width={200}
           style={{margin: '-60px 0 0 -25px'}}/>
    </div>
  </div>
}
export default SideBarHeader