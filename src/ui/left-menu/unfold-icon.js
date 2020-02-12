import React from 'react'
import {Icon} from 'antd'

import '../../resources/css/title-bar.css'

const UnFoldIcon = ({changeLeftMenuVisible}) => {
  return <span className='title-icon'
               onClick={() => changeLeftMenuVisible(true)}>
    <Icon type="double-right"/>
    </span>
}

export default UnFoldIcon