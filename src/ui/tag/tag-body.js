import React from "react"
import TitleBar from "../title-bar/title-bar"

class TagBody extends React.Component {

  render() {
    const {leftMenuVisible} = this.props
    return <div>
      <TitleBar
        title=' 🏷️ Tags'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>
    </div>
  }
}

export default TagBody
