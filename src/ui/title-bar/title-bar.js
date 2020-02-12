import React from 'react'
import UnFoldIcon from '../left-menu/unfold-icon';
import HeaderMenu from './header-menu';

class TitleBar extends React.Component {
  render() {
    const {leftMenuVisible,menus} = this.props
    return <div className='title-bar-box'
                style={{marginLeft: `${leftMenuVisible ? 0 : '70px'}`}}>
      {
        leftMenuVisible
          ? ''
          : <UnFoldIcon
            changeLeftMenuVisible={this.props.changeLeftMenuVisible}/>
      }

      <HeaderMenu
        title='NoteBook'
        menus={menus}
      />
    </div>
  }
}

export default TitleBar