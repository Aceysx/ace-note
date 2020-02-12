import React from 'react'
import UnFoldIcon from '../left-menu/unfold-icon'
import HeaderMenu from './header-menu'
import {Badge, Divider, Icon, Tooltip} from 'antd'
import GitPusher from './git-pusher';

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
        onClickMenuItem={this.props.onClickMenuItem}
      />

      <GitPusher
        pushToRepo={this.props.pushToRepo}/>

      <span style={{position: 'fixed', right: 10}}>
        <Badge status="processing" text="v1.0.0"/>
      </span>
    </div>
  }
}

export default TitleBar