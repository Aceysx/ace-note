import React from "react";
import {Card, Divider, Empty, Icon, Tag} from "antd"
import File from "../../model/file";
import CardReview from "../../model/card-review";

const CardsReviewBottom = ({bottomVisible, cards, reviewCard, updateBottomVisible, current, tags}) => {
  return <div>
    <div className='cards-review-bottom-visible-icon cursor_pointer'
         onClick={updateBottomVisible}>
          <span style={{position: 'absolute', left: 0}}>
            <Icon type="question-circle"
                  style={{fontSize: 18, color: 'gray'}}/> <Divider type='vertical'/>

            <span> {CardReview.ICONS["not-review"]}not review </span> <Divider type='vertical'/>
            <span> {CardReview.ICONS["oblivious"]}oblivious </span> <Divider type='vertical'/>
            <span> {CardReview.ICONS["hard"]}hard </span> <Divider type='vertical'/>
            <span> {CardReview.ICONS["easy"]}easy </span>

          </span>
      <Icon style={{fontSize: 22}} type={
        bottomVisible
          ? 'vertical-align-bottom'
          : 'vertical-align-top'}/>
    </div>

    <div className='cards-review-bottom-item-box'>
      {
        cards.length
          ? cards.map((item, index) => {
            const itemTags = tags.find(tag => tag.path === item.path)
            return <Card
              key={index}
              className='cards-review-bottom-card-item'
              hoverable>
              <header>
              <span style={{borderBottom: '2px solid #f8f6f1', fontSize: 10, fontWeight: "lighter"}}>
                today status {CardReview.getStatusIcon(CardReview.status(item, current))}
              </span>
                <span onClick={() => reviewCard(item)}
                      style={{float: 'right', color: '#b7906b'}}>
                    let's review
              </span>
              </header>
              <div style={{
                fontSize: 14,
                fontWeight: 700,
                margin: '5px 0 '
              }}>
                {File.name(item.path)}
              </div>
              <div style={{margin: 6}}>
                {
                  itemTags
                    ? itemTags.tags.map(tag => {
                      return <Tag>{tag}</Tag>
                    })
                    : <Tag>there is no tag</Tag>
                }
              </div>
              <Divider orientation="left">history review</Divider>
              <div>{
                item.history.length
                  ? item.history.map(his => {
                    return CardReview.getStatusIcon(his.status)
                  })
                  : CardReview.getStatusIcon(CardReview.STATUS.NOT_REVIEW)

              }</div>
            </Card>
          })
          : <Empty description='there is no card need to review'/>
      }
    </div>
  </div>
}

export default CardsReviewBottom