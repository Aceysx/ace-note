import React from "react"
import CardReview from "../../model/card-review";
import {Icon} from "antd";

const ReviewTool = ({submitReview, back, bottomVisible}) => {
  return <div className='review-tool-box'
              style={{
                bottom: bottomVisible ? 190 : 10
              }}>
    <p className='review-tool-icon'
       onClick={() => submitReview(CardReview.STATUS.WELL)}>💖</p>
    <p className='review-tool-icon'
       onClick={() => submitReview(CardReview.STATUS.JUST_SO_SO)}>💘</p>
    <p className='review-tool-icon'
       onClick={() => submitReview(CardReview.STATUS.STRANGE)}>💔</p>
    <p onClick={back} className='review-tool-icon'>
      <Icon type="arrow-left"/>
    </p>
  </div>
}

export default ReviewTool