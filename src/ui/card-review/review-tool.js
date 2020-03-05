import React from "react"
import CardReview from "../../model/card-review"
import {Icon, Popconfirm} from "antd"

const ReviewTool = ({submitReview, back, bottomVisible, outlineVisible, reviewToolVisible, changeOutlineVisible}) => {
  return <div className='review-tool-box'
              style={{
                bottom: bottomVisible ? 190 : 10
              }}>
    <p className='review-tool-icon '>
      <Icon className='cursor_pointer' type={outlineVisible ? 'eye-invisible' : 'eye'}
            onClick={() => changeOutlineVisible(!outlineVisible)}/>
    </p>
    {
      reviewToolVisible
        ? <div>
          <Popconfirm
            placement='right'
            title="Are you sure review this card?"
            onConfirm={() => submitReview(CardReview.STATUS.EASY)}
            okText="Yes"
            cancelText="No"
          >
            <p className='review-tool-icon'>💖</p>
          </Popconfirm>
          <Popconfirm
            title="Are you sure review this card?"
            onConfirm={() => submitReview(CardReview.STATUS.HARD)}
            okText="Yes"
            cancelText="No"
          >
            <p className='review-tool-icon'>💘</p>
          </Popconfirm>
          <Popconfirm
            title="Are you sure review this card?"
            onConfirm={() => submitReview(CardReview.STATUS.OBLIVIOUS)}
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