import React from "react"
import CardReview from "../../model/card-review";

const ReviewTool = ({submitReview}) => {
  return <div style={{
    marginBottom:100
  }}>
    <p onClick={() => submitReview(CardReview.STATUS.STRANGE)}>cess 上</p>
    <p onClick={() => submitReview(CardReview.STATUS.JUST_SO_SO)}>💘</p>
    <p onClick={() => submitReview(CardReview.STATUS.WELL)}> 💖</p>
  </div>
}

export default ReviewTool