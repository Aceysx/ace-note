import React from "react"
import TitleBar from "../title-bar/title-bar"
import TagDisplayBox from "./tag-display-box"

import '../../resources/css/tag.css'
import NoteList from "./note-list";
import {Divider} from "antd";

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
    const {notesTags} = this.props
    return notesTags.filter(noteTag => currentNotes.includes(noteTag.path))
  }

  render() {
    const {currentSelectTag} = this.state
    const {notesTags, leftMenuVisible} = this.props
    const tagsNotes = this.format(notesTags)

    return <div className='tag-body'>
      <TitleBar
        title=' 🏷️ Tags'
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
              selectTag={currentSelectTag}
              notes={this.mergeNotesWithTag(currentSelectTag, tagsNotes)}/>
          </div>
          : ''
      }

    </div>
  }
}

export default TagBody
