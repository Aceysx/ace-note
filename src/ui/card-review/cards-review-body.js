import React from "react"
import TitleBar from "../title-bar/title-bar"
import moment from "moment"
import {Calendar, Statistic, Tooltip} from "antd"
import CardReview from "../../model/card-review"
import File from '../../model/file'
import FileResource from "../../infrastructure/file-resource"
import CardReviewBox from "./card-review-box"
import CardsReviewBottom from "./cards-review-bottom"
import Time from "../../model/time"

import '../../resources/css/cards-review.css'

const EMPTY_ITEM = undefined

class CardsReviewBody extends React.Component {
  state = {
    bottomVisible: true,
    reviewCard: EMPTY_ITEM,
    current: moment(Time.today())
  }

  onSelect = current => {
    this.setState({
      current,
      bottomVisible: true
    });
  };

  onPanelChange = current => {
    this.setState({current});
  }

  getParseRenderData = (current, cardsReview) => {
    return cardsReview.filter(card => {
      return CardReview.isTodayInReviewRange(card, current)
    })
  }

  dateCellRender = (current, cardsReview) => {
    const renderData = this.getParseRenderData(current, cardsReview)
    return (
      <div className='card-cell-item cursor_pointer'>
        {renderData.map(card => (
          <span className='card-cell-content cursor_pointer' key={card.path}>
            {CardReview.getStatusIcon(CardReview.status(card, current))}
            {File.name(card.path)}
          </span>
        ))}
      </div>
    )
  }

  monthCellRender = (current, cardsReview) => {
    let cardsCount = 0
    let totalReviewHistory = 0
    cardsReview.forEach(card => {
      const count = card.history.filter(his => Time.isSameMonth(current, his.reviewTime)
        && his.status !== CardReview.STATUS.NOT_REVIEW).length
      totalReviewHistory += count
      cardsCount += count > 0 ? 1 : 0
    })
    return <div style={{textAlign: 'center'}}>
      <Tooltip title='total cards / review history'>
        {
          Time.interval(Time.formatMonthTimestamp(current), Time.formatMonthTimestamp(Time.today())) >= 0
            ? <Statistic title='cards / history' value={cardsCount} suffix={' / ' + totalReviewHistory}/>
            : <span/>
        }
      </Tooltip>
    </div>
  }
  getNeedReviewCards = cardsReview => {
    const {current} = this.state
    return cardsReview.filter(item => CardReview.isTodayInReviewRange(item, current))
  }

  getCardDetail = (reviewCard) => {
    return FileResource.findFile(window.getNoteWorkspacePath() + reviewCard.path)
  }

  submitReview = (_path, status, cardsReview) => {
    let reviewCard = CardReview.reviewCard(cardsReview, File.relativePath(_path), status);
    this.props.updateCardsReview(reviewCard)
  }

  render() {
    const {notesTags, leftMenuVisible, cardsReview} = this.props
    const {current, bottomVisible, reviewCard} = this.state

    return <div>
      <TitleBar
        title={<span><img src={require('../../resources/images/card-review.png')}/>Cardreview</span>}
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>

      <div className='cards-review-body'>
        {
          reviewCard
            ? <CardReviewBox
              reviewCard={reviewCard}
              reviewToolVisible={CardReview.isTodayReviewed(
                cardsReview.find(item => item.path === reviewCard.path),
                current)}
              bottomVisible={bottomVisible}
              back={() => this.setState({reviewCard: EMPTY_ITEM})}
              submitReview={(_path, status) => this.submitReview(_path, status, cardsReview)}
              cardDetail={this.getCardDetail(reviewCard)}
            />
            : <Calendar
              className='cards-review-calendar-box'
              value={current}
              dateCellRender={current => this.dateCellRender(current, cardsReview)}
              monthCellRender={current => this.monthCellRender(current, cardsReview)}
              onSelect={this.onSelect}
              onPanelChange={this.onPanelChange}/>
        }
      </div>

      <div className='cards-review-bottom'
           style={{
             height: `${bottomVisible ? 200 : 30}px`,
             paddingRight: `${leftMenuVisible ? 215 : 0}px`
           }}>
        <CardsReviewBottom
          current={current}
          tags={notesTags}
          cards={this.getNeedReviewCards(cardsReview)}
          bottomVisible={bottomVisible}
          reviewCard={reviewCard => this.setState({reviewCard, bottomVisible: false})}
          updateBottomVisible={() => this.setState({bottomVisible: !bottomVisible})}
        />
      </div>
    </div>
  }
}

export default CardsReviewBody