import React from 'react'
import {Modal, Input, Icon} from 'antd'

import '../../resources/css/search_bar.css'

const SearchBar = ({isSearchModalVisible, searchFiles, closeSearchModal}) => {
  const validate = value => {
    if (value === '') {
      return
    }
    searchFiles(value)
    closeSearchModal()
  }

  return <Modal
    closable={false}
    destroyOnClose={true}
    footer={null}
    visible={isSearchModalVisible}
    onCancel={closeSearchModal}
    width='50%'
    style={{marginTop: '10%', height: 100}}
  >
    <Input
      placeholder="Search notebook"
      prefix={<Icon type='search'/>}
      size='large'
      autoFocus
      className='search-bar'
      onPressEnter={e => validate(e.target.value)}
    />
  </Modal>
}

export default SearchBar