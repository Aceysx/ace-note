import React from "react"
import CardReview from "../../model/card-review";
import {Icon, Popconfirm} from "antd";

const ReviewTool = ({submitReview, back, bottomVisible, reviewToolVisible}) => {
  return <div className='review-tool-box'
              style={{
                bottom: bottomVisible ? 190 : 10
              }}>
    {
      reviewToolVisible
        ? <div>
          <Popconfirm
            title="Are you sure review this card?"
            onConfirm={()=>submitReview(CardReview.STATUS.WELL)}
            okText="Yes"
            cancelText="No"
          >
            <p className='review-tool-icon'>💖</p>
          </Popconfirm>
          <Popconfirm
            title="Are you sure review this card?"
            onConfirm={()=>submitReview(CardReview.STATUS.JUST_SO_SO)}
            okText="Yes"
            cancelText="No"
          >
            <p className='review-tool-icon'>💘</p>
          </Popconfirm>
          <Popconfirm
            title="Are you sure review this card?"
            onConfirm={()=>submitReview(CardReview.STATUS.STRANGE)}
            okText="Yes"
            cancelText="No"
          >
            <p className='review-tool-icon'>💔</p>
          </Popconfirm>
        </div>
        : ''
    }

    <p onClick={back} className='review-tool-icon'>
      <Icon type="arrow-left"/>
    </p>
  </div>
}

export default ReviewTool