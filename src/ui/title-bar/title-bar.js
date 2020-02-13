import React from 'react'
import HeaderMenu from './header-menu'
import {Badge, Divider, Icon} from 'antd'
import GitPusher from './git-pusher'
import '../../resources/css/title-bar.css'

class TitleBar extends React.Component {
  render() {
    const {leftMenuVisible, menus, title, operateComponents} = this.props
    return <div className='title-bar-box'
                style={{paddingLeft: `${leftMenuVisible ? 0 : '70px'}`}}>
          <span className='title-icon'
                onClick={() => this.props.changeLeftMenuVisible(!leftMenuVisible)}>
            {
              leftMenuVisible
                ? <span><Icon type="double-left"/></span>
                : <span><Icon type="double-right"/></span>
            }
          </span>
      <Divider type='vertical'/>

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