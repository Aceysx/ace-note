import React from "react"
import {Modal} from "antd"

class RecentlyModel extends React.Component {
  state = {
    focusIndex: 0
  }

  _nextAndSet = next => {
    let focusIndex = next
    const {recentlyFiles} = this.props
    if (next < 0) {
      focusIndex = recentlyFiles.length - 1
    }
    if (next > recentlyFiles.length - 1) {
      focusIndex = 0
    }
    this.setState({focusIndex})
  }

  onKeyDown = e => {
    e.preventDefault()
    const code = e.keyCode
    const {focusIndex} = this.state
    const {recentlyFiles} = this.props
    if (recentlyFiles.length === 0) {
      return
    }

    if (code === 13) {
      this.props.updateCurrentEditFile(recentlyFiles[focusIndex]);
      return;
    }
    if (code === 38) {
      this._nextAndSet(focusIndex - 1)
    }
    if (code === 40) {
      this._nextAndSet(focusIndex + 1)
    }
  }

  render() {
    const {recentlyModalVisible, recentlyFiles, handleCancel, updateCurrentEditFile} = this.props
    const {focusIndex} = this.state
    return <div onKeyDown={this.onKeyDown}>
      <Modal
        width={500}
        bodyStyle={{
          minHeight: 400,
          maxHeight: 1000,
          overflowY: 'scroll'
        }}
        closeIcon
        visible={recentlyModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {
          recentlyFiles.map((_path, index) => {
            return <span key={index}
                         className={`cursor_pointer note_recently_item 
                         ${index === focusIndex ? 'note_recently_item_bg' : ''}`}
                         onClick={() => updateCurrentEditFile(_path)}>{_path}</span>
          })
        }

      </Modal>
    </div>
  }
}

export default RecentlyModel