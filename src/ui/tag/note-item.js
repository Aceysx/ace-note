import React from "react"
import File from "../../model/file";
import {Icon, Row} from "antd";
import Time from "../../model/time";
import NoteTag from "../note/markdown/note-tag";
import NoteTagModel from "../../model/note-tag";

const NoteItem = ({note, notesTags, updateNoteTags}) => {
  const findCurrentNoteTags = (note, notesTags) => {
    return NoteTagModel.findNoteTagsByPath(notesTags, note.path);
  }

  return <div className='tag-note-item cursor_pointer'>
    <Row>
      <span className='tag-note-item-title'>{File.name(note.path)}</span>
      <span className='tag-note-item-path'>
        <Icon type='folder'/> {File.dir(note.path).substr(1)}
      </span>
    </Row>
    <Row>
    <span>
      <span className='tag-note-item-time'><Icon type="clock-circle"/> {Time.format(note.createTime)}</span>
    </span>
      <span style={{float: 'right'}}>
        <NoteTag
          currentNoteTags={findCurrentNoteTags(note, notesTags)}
          updateNoteTags={tags => updateNoteTags(tags, note)}
          notesTags={NoteTagModel.findAllTags(notesTags)}/>
      </span>
    </Row>
  </div>
}
export default NoteItem