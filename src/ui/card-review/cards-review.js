import React from "react"
import TitleBar from "../title-bar/title-bar"
import moment from "moment"
import {Calendar, Card, Divider, Icon, Tag} from "antd"
import CardReview from "../../model/card-review"
import File from '../../model/file'
import FileResource from "../../infrastructure/file-resource"
import ReviewBody from "./review-body"

import '../../resources/css/cards-review.css'

const EMPTY_ITEM = undefined

class CardsReview extends React.Component {
  state = {
    bottomVisible: true,
    reviewItem: EMPTY_ITEM,
    current: moment(new Date().getTime())
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

  getParseRenderData = current => {
    const {cardsReview} = this.props
    const result = cardsReview.filter(card => {
      return CardReview.isTodayInReviewRange(card, current)
    })
    return result
  }

  dateCellRender = current => {
    const renderData = this.getParseRenderData(current)

    return (
      <ul className="events">
        {renderData.map(item => (
          <li key={item.path}>
            {File.name(item.path)}
          </li>
        ))}
      </ul>
    );
  }

  getNeedReviewCards = () => {
    const {cardsReview} = this.props
    const {current} = this.state
    return cardsReview.filter(item => CardReview.isTodayInReviewRange(item, current))
  }

  getCardDetail = (reviewItem) => {
    return FileResource.findFile(window.getNoteWorkspacePath() + reviewItem.path)
  }

  submitReview = (_path, status) => {
    const {cardsReview} = this.props
    let reviewCard = CardReview.reviewCard(cardsReview, File.relativePath(_path), status);
    this.props.updateCardsReview(reviewCard)
  }

  render() {
    const {leftMenuVisible} = this.props
    const {current, bottomVisible, reviewItem} = this.state

    return <div>
      <TitleBar
        title=' 📑️ Cards Review'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>

      <div className='cards-review-body'>
        {
          reviewItem
            ? <ReviewBody
              bottomVisible={bottomVisible}
              back={() => this.setState({reviewItem: EMPTY_ITEM})}
              submitReview={this.submitReview}
              cardDetail={this.getCardDetail(reviewItem)}
            />
            : <Calendar
              className='cards-review-calendar-box'
              value={current}
              dateCellRender={this.dateCellRender}
              onSelect={this.onSelect}
              onPanelChange={this.onPanelChange}/>
        }
      </div>

      <div className='cards-review-bottom'
           style={{
             height: `${bottomVisible ? 200 : 20}px`,
             paddingRight: `${leftMenuVisible ? 215 : 0}px`
           }}>
        <div className='cards-review-bottom-visible-icon cursor_pointer'
             onClick={() => this.setState({bottomVisible: !bottomVisible})}>
          <span style={{float: 'left'}}>
          💔 ❣️ 💘 💖 🕳
            </span>
          <Icon type={
            bottomVisible
              ? 'vertical-align-bottom'
              : 'vertical-align-top'}/>
        </div>

        <div className='cards-review-bottom-item-box'>
          {
            this.getNeedReviewCards().map((item, index) => {
              return <Card
                key={index}
                className='cards-review-bottom-card-item'
                hoverable>
                <header>
                  <span style={{borderBottom: '2px solid #f8f6f1'}}>last status</span> 💖
                  <span
                    onClick={() => this.setState({reviewItem: item, bottomVisible: false})}
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
    </div>
  }
}

export default CardsReview