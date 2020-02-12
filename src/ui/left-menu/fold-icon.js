import React from 'react'
import {Icon} from 'antd'

import '../../resources/css/title-bar.css'

const FoldIcon = ({changeLeftMenuVisible}) => {
  return <span className='title-icon fold-left-menu-icon'
               onClick={() => changeLeftMenuVisible(false)}>
    <Icon type="double-left"/>
    </span>
}

export default FoldIcon