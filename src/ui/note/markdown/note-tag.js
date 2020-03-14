import React from 'react'
import {Select} from "antd"
import NoteTagModel from "../../../model/note-tag"

const {Option} = Select

const NoteTag = ({notesTags = [], currentNoteTags = [], updateNoteTags}) => {
  return <Select mode="tags"
                 placeholder='点击输入tag'
                 style={{
                   minWidth: 300,
                   maxWidth: 500,
                   display: 'inline-block'
                 }}
                 value={currentNoteTags}
                 onChange={tags => updateNoteTags(tags)}
                 tokenSeparators={[',']}>
    {notesTags.map(tag => {
      return <Option key={tag}>{NoteTagModel.format(tag)[1]}
      </Option>
    })}
  </Select>
}

export default NoteTag