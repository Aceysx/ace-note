import React from 'react'
import {Select} from "antd"

const {Option} = Select

const NoteTag = ({notesTags=[],currentNoteTags=[],updateNoteTags}) => {
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
     return <Option key={tag}>{tag}</Option>
    })}
  </Select>
}

export default NoteTag