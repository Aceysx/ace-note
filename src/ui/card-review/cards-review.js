import React from "react"
import TitleBar from "../title-bar/title-bar";


class CardsReview extends React.Component {

  render() {
    const {leftMenuVisible} = this.props
    return <div>
      <TitleBar
        title=' 📑️ Cards Review'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
    </div>
  }
}

export default CardsReview