import React from "react"
import TitleBar from "../title-bar/title-bar"
import moment from "moment"
import {Calendar, Drawer, Icon} from "antd";

import '../../resources/css/cards-review.css'

const INTERVAL = [0, 1, 2, 4, 7, 15, 30, 60]
const data = [
  {
    path: 'a/b/c.txt',
    startReviewTime: new Date().getTime(),
    nextReviewTime: moment('2020-02-22').valueOf(),
    type: 'review',
    isFinish: false,
    history: []
  }, {
    path: 'a/b/d.txt',
    startReviewTime: new Date().getTime(),
    nextReviewTime: moment('2020-02-23').valueOf(),
    type: 'review',
    isFinish: false,
    history: []
  },
]

class CardsReview extends React.Component {
  state = {
    bottomVisible: false,
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

  dateCellRender = (value) => {
    const renderData = data.filter(item => {
      return moment(item.nextReviewTime).isSame(value, 'day')
    })

    return (
      <ul className="events">
        {renderData.map(item => (
          <li key={item.path}>
            {item.path}
          </li>
        ))}
      </ul>
    );
  }

  getNeedReviewCards = () => {
    const {current} = this.state
    return data.filter(item => moment(item.nextReviewTime).isSame(current, 'day'))
  }

  render() {
    const {leftMenuVisible} = this.props
    const {current, bottomVisible} = this.state
    return <div>
      <TitleBar
        title=' 📑️ Cards Review'
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}></div>

      <div className='cards-review-body'>
        <Calendar
          className='cards-review-calendar-box'
          value={current}
          dateCellRender={this.dateCellRender}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}/>
      </div>
      <div className='cards-review-bottom'
           style={{height: `${bottomVisible ? 200 : 20}px`}}>
        <div className='cards-review-bottom-visible-icon cursor_pointer'
             onClick={() => this.setState({bottomVisible: !bottomVisible})}>
          <Icon type={
            bottomVisible
              ? 'vertical-align-bottom'
              : 'vertical-align-top'}/>
        </div>

        <div>
          {
            this.getNeedReviewCards().map(item => {
              return <span>{item.path}</span>
            })
          }
        </div>
      </div>
    </div>
  }
}

export default CardsReview