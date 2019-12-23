import React from 'react'
import {Avatar, Button} from "antd";

const {ipcRenderer} = window.electron

export default class App extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      this.setState({data: arg})
    })
    ipcRenderer.send('asynchronous-message', 'to main')
  }

  render() {
    const data = this.state.data.map(item => <p>{item.path}</p>)
    console.log(data)
    return <div>test
      <Button type='primary'
              onClick={() => console.log(this.state.data)}>alert</Button>
      {data}
      <div>
        <Avatar size={64} icon="user" />
        <Avatar size="large" icon="user" />
        <Avatar icon="user" />
        <Avatar size="small" icon="user" />
      </div>
    </div>
  }
}
