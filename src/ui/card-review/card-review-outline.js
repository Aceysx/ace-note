import React from "react";
import {Divider, Empty, Icon, PageHeader} from "antd";
import File from '../../model/file'
import CardReview from "../../model/card-review";

const TITLE = [
  {layer: 1, start: '# '},
  {layer: 2, start: '## '},
  {layer: 3, start: '### '},
  {layer: 4, start: '#### '},
  {layer: 5, start: '##### '}
]
const CardReviewOutline = ({cardDetail, reviewCard, hideOutline}) => {
  const convert = content => {
    const result = []
    content.split('\n').forEach((origin) => {
      const found = TITLE.find(title => origin.startsWith(title.start))
      if (found) {
        const {layer, start} = found
        result.push({
          layer,
          origin,
          content: origin.replace(start, '')
        })
      }
    })
    return result
  }

  const tree = convert(cardDetail.content)
  return <div>
    <PageHeader
      title={File.name(cardDetail.path)}
      extra={[<a style={{color: '#b7906b', fontStyle: 'italic'}}
                 onClick={hideOutline}>start review <Icon type="arrow-right"/></a>]}
      subTitle={<div>
        <Divider type='vertical'/>
        <span style={{fontStyle: "italic", fontSize: 12}}> review history </span>
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
      {tree.length
        ?
        tree.map(item => {
          return <span className='review-outline-item cursor_pointer'
                       style={{
                         paddingLeft: `${10 * (item.layer - 1)}px`,
                         opacity: `${(1 - (2 + item.layer) / 10) < 0.5 ? 0.5 : (1 - (2 + item.layer) / 10)}`
                       }}>{item.content.trim()}</span>
        })
        : <Empty/>
      }
    </PageHeader>
  </div>
}

export default CardReviewOutline