import React from "react"
import ReviewTool from "./review-tool";

const HyperMD = require('hypermd')
let md

class ReviewBody extends React.Component {
  state = {
    ref: React.createRef()
  }

  componentDidMount() {
    const node = this.state.ref.current
    const {cardDetail} = this.props
    md = HyperMD.fromTextArea(node, {readOnly: true, lineNumbers: false})
    this._updateMarkdownContent(cardDetail.content)
  }

  componentWillReceiveProps(nextProps) {
    const {cardDetail} = nextProps
    if (this.props.cardDetail.path !== cardDetail.path) {
      this._updateMarkdownContent(cardDetail.content)
    }
  }

  _updateMarkdownContent = data => {
    try {
      md.setValue(data)
    } catch (e) {
      md.setValue(data)
    }
  }

  render() {
    const {cardDetail, bottomVisible, reviewToolVisible} = this.props
    return <div style={{marginBottom: '30px'}}>
      <ReviewTool
        bottomVisible={bottomVisible}
        reviewToolVisible={reviewToolVisible}
        back={this.props.back}
        submitReview={status => this.props.submitReview(cardDetail.path, status)}
      />
      <div>
      <textarea
        ref={this.state.ref}/>
      </div>
    </div>
  }
}

export default ReviewBody