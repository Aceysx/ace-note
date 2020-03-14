import React from "react"
import TitleBar from "../title-bar/title-bar"
import TagDisplayBox from "./tag-display-box"

import '../../resources/css/tag.css'

class TagBody extends React.Component {

  format = notesTags => {
    const result = {}
    console.log(notesTags)
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

  render() {
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
        updateTag={this.updateTag}
        tagsNotes={tagsNotes}
      />
    </div>
  }
}

export default TagBody
