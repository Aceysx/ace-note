import React from 'react'

const HeaderMenu = ({title, menus, operateComponents = []}) => {
  return <span>
    {
      operateComponents
    }
    <span style={{fontWeight: '600'}}>{title} / </span>
    {
      menus.map((item, index) => {
        return <span>
          <span className='title-bar-menu-item'>{item}</span>
          {
            index === menus.length - 1
              ? ''
              : ' / '
          }
        </span>
      })
    }
  </span>
}
export default HeaderMenu