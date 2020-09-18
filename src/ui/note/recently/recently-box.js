import React from "react"
import {Modal} from "antd"

const RecentlyModel = ({recentlyModalVisible, recentlyFiles, handleCancel}) => {
  console.log(recentlyModalVisible)
  console.log(recentlyFiles)
  recentlyFiles = [...recentlyFiles, ...recentlyFiles, ...recentlyFiles, ...recentlyFiles]
  return <Modal
    width={500}
    bodyStyle={{
      minHeight: 400,
      maxHeight: 1000
    }}
    closeIcon
    visible={recentlyModalVisible}
    footer={null}
    onCancel={handleCancel}
  >
    {
      recentlyFiles.map(_path => {
        return <span className='cursor_pointer note_recently_item'>{_path}</span>
      })
    }

  </Modal>
}
export default RecentlyModel