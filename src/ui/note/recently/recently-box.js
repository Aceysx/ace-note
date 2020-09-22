import React from "react"
import {Modal} from "antd"

const RecentlyModel = ({recentlyModalVisible, recentlyFiles, handleCancel, updateCurrentEditFile}) => {
  recentlyFiles = [...recentlyFiles, ...recentlyFiles, ...recentlyFiles, ...recentlyFiles]
  return <Modal
    width={500}
    bodyStyle={{
      minHeight: 400,
      maxHeight: 600,
      overflowY: 'scroll'
    }}
    closeIcon
    visible={recentlyModalVisible}
    footer={null}
    onCancel={handleCancel}
  >
    {
      recentlyFiles.map(_path => {
        return <span className='cursor_pointer note_recently_item'
                     onClick={() => updateCurrentEditFile(_path)}>{_path}</span>
      })
    }

  </Modal>
}
export default RecentlyModel