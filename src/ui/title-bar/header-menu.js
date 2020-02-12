import React from 'react'
import File from '../../model/file';

const HeaderMenu = ({title, menus, operateComponents = [], onClickMenuItem}) => {
  const getAbsolutePath = item => {
    return window.getNoteWorkspacePath() + '/' + File.join(menus.slice(0, menus.indexOf(item) + 1))
  }

  return <span>
    {
      operateComponents
    }
    <span>
      <span style={{fontWeight: '600'}}
            className='title-bar-menu-item'
            onClick={() => onClickMenuItem(window.getNoteWorkspacePath())}>
        {title}
      </span>
       /
    </span>

    {
      menus.map((item, index) => {
        return <span>

          {
            index === menus.length - 1
              ? <span> {item} </span>
              : <span>
                <span className='title-bar-menu-item'
                      onClick={() => onClickMenuItem(getAbsolutePath(item))}>
                  {item}
                </span>
               /
              </span>
          }
        </span>
      })
    }
  </span>
}
export default HeaderMenu