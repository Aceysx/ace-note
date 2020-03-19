import React from 'react'
import {Icon, notification, Tooltip} from 'antd'
import {PUSH_TO_REPO_FINISHED} from '../../model/listener-event'

const NOTIFICATION_KEY = 'notification_key'
const NOTIFICATION_ARGS = {
  key: NOTIFICATION_KEY, message: 'pushing......', duration: 0
}

class GitPusher extends React.Component {

  componentDidMount() {
    window.electron.ipcRenderer.on(PUSH_TO_REPO_FINISHED, (e, result) => {
      const {isSuccess, message} = result
      notification.close(NOTIFICATION_KEY)
      if (isSuccess) {
        notification.success({message, duration: 2})
        return
      }
      notification.error({message, duration: 2})
    })
  }

  pushToRepo = () => {
    this.setState({isPushing: true})
    notification.info(NOTIFICATION_ARGS)
    this.props.pushToRepo(window.getNoteWorkspacePath())
  }

  render() {
    return <span style={{position: 'fixed', right: 100}}>
        <Tooltip title="push to remote repo"
                 placement='bottom'>
          <Icon type="github"
                onClick={this.pushToRepo}
                style={{fontSize: 18}}/>
        </Tooltip>
      </span>
  }
}

export default GitPusher