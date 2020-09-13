import React from 'react'
import TitleBar from "../../title-bar/title-bar"
import {Divider, Icon, Statistic, Tag, Timeline} from "antd";
import Time from "../../../model/time"
import File from "../../../model/file"
import '../../../resources/css/note.css'
import NoteTagModel from "../../../model/note-tag";

const NoteStatisticBody = ({notesTags, leftMenuVisible, updateStatus, pushToRepo}) => {
  let notes = notesTags.reduce((rv, x) => {
    (rv[Time.formatMonth(x['mtime'])] = rv[Time.formatMonth(x['mtime'])] || []).push(x)
    return rv
  }, {});

  return <div>
    <TitleBar
      title={<span><img
        width={18}
        style={{
          verticalAlign: 'initial'
        }}
        src={require('../../../resources/images/notebook-statistic.png')}/> Timeline</span>}
      leftMenuVisible={leftMenuVisible}
      changeLeftMenuVisible={updateStatus}
      pushToRepo={pushToRepo}/>
    <div style={{height: 50}}></div>
    <div style={{width: '80%'}}>
      <Timeline mode='alternate' pending="Recording...">
        <Timeline.Item position='right'
                       dot={<Icon type="loading" style={{fontSize: 20}} spin/>}>
          {notesTags.length}
        </Timeline.Item>
        {
          Object.keys(notes).reverse().map((month, index) => {
            let monthNotes = notes[month].reverse()
            return [
              <Timeline.Item position='right'>
                <span>
                  <Statistic
                    title={`${month}`}
                    value={monthNotes.length}
                    valueStyle={{color: '#3f8600'}}
                    prefix={<Icon type="arrow-up"/>}
                  />
                </span>
              </Timeline.Item>,
              ...(monthNotes.map(note =>
                <Timeline.Item position='left'>
                  <div className='statistic-note-item'>
                    <span className='statistic-note-item-title'>{File.name(note.path)}</span>
                    <span className='statistic-note-item-time'>{Time.format(note.mtime)}</span>
                    <span className='statistic-note-item-tags'>
                      <Icon type="tags"/>
                      <Divider type='vertical'/>
                      {note.tags.map((tag, index) => {
                        const [color, content] = NoteTagModel.format(tag)
                        return <Tag color={color} key={index}>
                          {content}
                        </Tag>
                      })}
                    </span>
                  </div>
                </Timeline.Item>))
            ]
          })
        }
      </Timeline>
    </div>
  </div>;
}

export default NoteStatisticBody