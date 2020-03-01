import React from "react"
import ReviewTool from "./review-tool"

const HyperMD = require('hypermd')
let md

class CardReviewBox extends React.Component {
  state = {
    ref: React.createRef(),
    outlineVisible: true
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
    const {outlineVisible} = this.state

    return <div style={{marginBottom: '30px'}}>
      <ReviewTool
        bottomVisible={bottomVisible}
        reviewToolVisible={reviewToolVisible}
        back={this.props.back}
        hideOutline={() => this.setState({outlineVisible: !outlineVisible})}
        submitReview={status => this.props.submitReview(cardDetail.path, status)}
      />
      <div className='card-review-box-content'>
        <div className='card-review-box-outline'
             style={{marginTop: outlineVisible ? '0px' : '-100%'}}>
          outline
        </div>
        <textarea
          ref={this.state.ref}/>
      </div>
    </div>
  }
}

export default CardReviewBox