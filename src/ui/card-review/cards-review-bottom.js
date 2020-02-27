import React from "react";
import {Card, Divider, Icon, Tag} from "antd"
import File from "../../model/file";
import CardReview from "../../model/card-review";

const CardsReviewBottom = ({bottomVisible, cards, reviewCard, updateBottomVisible}) => {
  return <div>
    <div className='cards-review-bottom-visible-icon cursor_pointer'
         onClick={updateBottomVisible}>
          <span style={{float: 'left'}}>
            <Icon type="question-circle"
                  style={{fontSize: 18, color: 'gray'}}/><Divider type='vertical'/>

            <span>{CardReview.ICONS["not-review"]}not review</span> <Divider type='vertical'/>
            <span>{CardReview.ICONS["oblivious"]}oblivious</span> <Divider type='vertical'/>
            <span>{CardReview.ICONS["hard"]}hard</span> <Divider type='vertical'/>
            <span>{CardReview.ICONS["easy"]}easy</span>

          </span>
      <Icon style={{fontSize: 22}} type={
        bottomVisible
          ? 'vertical-align-bottom'
          : 'vertical-align-top'}/>
    </div>

    <div className='cards-review-bottom-item-box'>
      {
        cards.map((item, index) => {
          return <Card
            key={index}
            className='cards-review-bottom-card-item'
            hoverable>
            <header>
              <span style={{borderBottom: '2px solid #f8f6f1'}}>last status</span> 💖
              <span
                onClick={() => reviewCard(item)}
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
              <Tag> 语法</Tag>
              <Tag> 英语</Tag>
            </div>
            <Divider orientation="left">history review</Divider>
            <div>💔 ❣️ 💘 💖 🕳 🕳 🕳 🕳</div>
          </Card>
        })
      }
    </div>
  </div>
}

export default CardsReviewBottom