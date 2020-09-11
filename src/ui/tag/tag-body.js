import React from "react"
import {Divider} from "antd";
import TitleBar from "../title-bar/title-bar"
import TagDisplayBox from "./tag-display-box"
import NoteList from "./note-list"
import NoteTagModel from "../../model/note-tag"

import '../../resources/css/tag.css'

class TagBody extends React.Component {
  state = {
    currentSelectTag: ''
  }

  format = notesTags => {
    const result = {}
    notesTags.forEach(notesTag => {
      notesTag.tags.forEach(tag => {
        if (!result[tag]) {
          result[tag] = []
        }
        result[tag].push(notesTag.path)
      })
    })
    return result
  }

  updateTag = (old, newer) => {
    const {notesTags} = this.props

    this.props.updateNotesTags(window.getNoteTagsPath(),
      notesTags.map(notesTag => {
        notesTag.tags = notesTag.tags.map(tag => {
          return tag === old ? newer : tag
        })
        return notesTag
      }))
  }

  mergeNotesWithTag = (selectTag, tagsNotes) => {
    const currentNotes = tagsNotes[selectTag]
    if (currentNotes) {
      const {notesTags} = this.props;
      return notesTags.filter(noteTag => currentNotes.includes(noteTag.path))
    }
    // 移除 note 的 tag 后（当前 tag 只有一个 note 标注），所以移除后，把 state 晴空
    this.setState({currentSelectTag: ''})
    return []
  }

  updateNoteTags = (tags, note) => {
    const {notesTags} = this.props
    this.props.updateNotesTags(window.getNoteTagsPath(), NoteTagModel.updateNoteTags(note.path, notesTags, tags))
  }

  render() {
    const {currentSelectTag} = this.state
    const {notesTags, leftMenuVisible} = this.props
    const tagsNotes = this.format(notesTags)

    return <div className='tag-body'>
      <TitleBar
        title={<span><img src={require('../../resources/images/tag.png')}/>Tags</span>}
        leftMenuVisible={leftMenuVisible}
        changeLeftMenuVisible={this.props.updateStatus}
        pushToRepo={this.props.pushToRepo}/>
      <div style={{height: 35}}/>
      <TagDisplayBox
        clickTag={currentSelectTag => this.setState({currentSelectTag})}
        updateTag={this.updateTag}
        tagsNotes={tagsNotes}
      />

      {
        currentSelectTag
          ? <div>
            <Divider/>
            <NoteList
              updateNoteTags={this.updateNoteTags}
              selectTag={currentSelectTag}
              notesTags={notesTags}
              notes={this.mergeNotesWithTag(currentSelectTag, tagsNotes)}/>
          </div>
          : ''
      }

    </div>
  }
}

export default TagBody
