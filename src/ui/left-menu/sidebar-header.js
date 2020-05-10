import React from 'react'
import Logo from '../../resources/images/logo.png'

const SideBarHeader = () => {
  return <div style={{zIndex: 100, width: '100%', background: '#f8f6f1'}}>
    <div style={{height: 90, overflow: 'hidden'}}>
      <img src={Logo}
           width='100%'
           style={{margin: '-40px 0 0 -10px'}}/>
    </div>
  </div>
}
export default SideBarHeader