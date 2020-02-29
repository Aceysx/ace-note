import React from "react"
import ReviewTool from "./review-tool"
import {Col, Row} from "antd"
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/github.css'

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: (code, language) => {
    return hljs.highlightAuto(code, [language]).value
  }
})

class CardReviewBox extends React.Component {

  render() {
    const {cardDetail, bottomVisible, reviewToolVisible} = this.props
    return <div style={{marginBottom: '30px'}}>
      <ReviewTool
        bottomVisible={bottomVisible}
        reviewToolVisible={reviewToolVisible}
        back={this.props.back}
        submitReview={status => this.props.submitReview(cardDetail.path, status)}
      />

      <Row className='card-review-box'>
        <Col span={4}>
          <div className='card-review-box-left-pane'>
            left
          </div>
        </Col>
        <Col span={16} offset={1}>
          <div className='card-review-box-content-render markdown-init'
               dangerouslySetInnerHTML={{__html: marked(cardDetail.content)}}/>
        </Col>
      </Row>
    </div>
  }
}

export default CardReviewBox