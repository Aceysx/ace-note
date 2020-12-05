import React from 'react'
import {Divider, Tree} from 'antd'
import File from '../../model/file'
import SideBarHeader from './sidebar-header'
import MENU from '../note/menu-item'
import SEARCH_ICON from '../../resources/images/search.png'
import SETTINGS_ICON from '../../resources/images/settings.png'
import CARD_REVIEW_ICON from '../../resources/images/card-review.png'
import TAG_ICON from '../../resources/images/tag.png'
import TIMECARD_ICON from '../../resources/images/timecard.png'
import NOTE_BOOK_ICON from '../../resources/images/note-book.png'
import '../../resources/css/overwrite-react-contextmenu-style.css'
import NOTEBOOK_STATISTIC_ICON from '../../resources/images/notebook-statistic.png'

const {TreeNode, DirectoryTree} = Tree

export default class LeftMenu extends React.Component {
  onSelect = keys => {
    this.props.updateMenu(keys[0])
  }

  listTree = dirs => {
    return dirs.filter(item => item.type === 'dir')
      .map(dir => {
        const subDirs = dir.sub.filter(item => item.type === 'dir')
        return <TreeNode
          title={<span className='cursor_pointer'>{File.name(dir.path)}</span>}
          key={dir.path}>
          {this.listTree(subDirs)}
        </TreeNode>
      })
  }

  buildTopItem = (icon, title) => {
    return <span style={{
      display: 'block',
      margin: '5px 0 5px 10px',
    }}>
      <img src={icon} width={18}/>
      <Divider type='vertical'/>
      <span className='cursor_pointer' style={{fontWeight: 700, fontSize: 15, color: 'rgba(25, 23, 17, 0.5)'}}>
       {title}
    </span></span>
  }

  render() {
    const {leftMenu} = this.props

    return <div>
      <div style={{height: 100}}>
        <SideBarHeader/>
      </div>
      <span
        onClick={() => this.props.switchToMenu(MENU.SEARCH)}>
        {this.buildTopItem(SEARCH_ICON, MENU.SEARCH)}
      </span>
      <span
        onClick={() => this.props.switchToMenu(MENU.SETTING)}>
        {this.buildTopItem(SETTINGS_ICON, MENU.SETTING)}
      </span>
      <span
        onClick={() => this.props.switchToMenu(MENU.CARDS_REVIEW)}>
        {this.buildTopItem(CARD_REVIEW_ICON, MENU.CARDS_REVIEW)}
      </span>
      <span
        onClick={() => this.props.switchToMenu(MENU.TIMECARD)}>
        {this.buildTopItem(TIMECARD_ICON, MENU.TIMECARD)}
      </span>
      <span
        onClick={() => this.props.switchToMenu(MENU.TAG)}>
        {this.buildTopItem(TAG_ICON, MENU.TAG)}
      </span>
      {
        leftMenu.path
          ?
          <div>
            <span
              onClick={() => {
                this.props.switchToMenu(MENU.note)
                this.props.updateMenu(leftMenu.path)
              }}
            >{this.buildTopItem(NOTE_BOOK_ICON, MENU.NOTE)}
            </span>
            {/*<img src={NOTEBOOK_STATISTIC_ICON}*/}
            {/*     width={20}*/}
            {/*     className='cursor_pointer'*/}
            {/*     onClick={() => this.props.switchToMenu(MENU.NOTE_STATISTIC)}*/}
            {/*     style={{*/}
            {/*       float: 'right',*/}
            {/*       margin: '-30px 5px'*/}
            {/*     }}/>*/}

            <DirectoryTree
              defaultExpandedKeys={[leftMenu.path]}
              onSelect={this.onSelect}>
              {this.listTree(leftMenu.sub)}
            </DirectoryTree>
          </div>
          : ''
      }
    </div>
  }
}