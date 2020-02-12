import React from 'react'
import UnFoldIcon from '../left-menu/unfold-icon'
import HeaderMenu from './header-menu'
import {Divider} from 'antd'

class TitleBar extends React.Component {
  render() {
    const {leftMenuVisible, menus, title, operateComponents} = this.props
    return <div className='title-bar-box'
                style={{marginLeft: `${leftMenuVisible ? 0 : '70px'}`}}>
      {
        leftMenuVisible
          ? ''
          : <span>
          <UnFoldIcon
            changeLeftMenuVisible={this.props.changeLeftMenuVisible}/>
          <Divider type='vertical'/>
        </span>
      }

      <HeaderMenu
        operateComponents={operateComponents}
        title={title}
        menus={menus}
      />
    </div>
  }
}

export default TitleBar