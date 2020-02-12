import React from 'react'

const HeaderMenu = ({title, menus}) => {
  return <span>
    <span style={{fontWeight: 'bold', paddingRight: 5}}>{title}</span>
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