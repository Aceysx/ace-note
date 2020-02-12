import React from 'react'
import {Icon} from 'antd'

const FoldSubMenuButton = ({changeSubMenuFold}) => {

  return <span className='title-bar-menu-item'
               onClick={changeSubMenuFold}>
          <Icon type="border-horizontal"/>
        </span>
}

export default FoldSubMenuButton