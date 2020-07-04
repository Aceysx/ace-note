import React from "react";
import {Divider, Icon, PageHeader} from "antd"
import File from '../../model/file'
import CardReview from "../../model/card-review"
import MindMap from "../note/mindmap/mind-map"


const CardReviewOutline = ({cardDetail, reviewCard, hideOutline}) => {
  return <PageHeader
    style={{height: '100%'}}
    title={File.name(cardDetail.path)}
    extra={[<a style={{color: '#b7906b', fontStyle: 'italic'}}
               onClick={hideOutline}>start review <Icon type="arrow-right"/></a>]}
    subTitle={<div>
      <Divider type='vertical'/>
      <span style={{fontStyle: "italic", fontSize: 12}}>  history review </span>
      {reviewCard.history.length
        ? reviewCard.history.map(his => {
          return CardReview.getStatusIcon(his.status)
        })
        : CardReview.getStatusIcon(CardReview.STATUS.NOT_REVIEW)
      }
    </div>}
  >
      <span style={{
        fontSize: 14,
        display: 'block',
        marginBottom: 5,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'rgba(25, 23, 17, 0.8)'
      }}>outline</span>
    <Divider/><br/>
    <MindMap markdown={cardDetail.content}/>
  </PageHeader>
}

export default CardReviewOutline