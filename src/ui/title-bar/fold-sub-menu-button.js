import React from 'react'
import {Icon} from 'antd'

const FoldSubMenuButton = ({changeSubMenuVisible}) => {

  return <span className='title-bar-menu-item'
               onClick={changeSubMenuVisible}>
          <Icon type="border-horizontal"/>
        </span>
}

export default FoldSubMenuButton