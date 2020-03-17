import React from "react"
import {Col, Statistic} from "antd";
import NoteItem from "./note-item";
import NoteTagModel from "../../model/note-tag";

const NoteList = ({selectTag, notes, notesTags, updateNoteTags}) => {
  return <div>
    <Statistic
      value={notes.length}
      suffix={`/ ${NoteTagModel.format(selectTag)[1]}`}/>
    {
      notes.map((note, index) => {
        return <Col key={index} offset={1} span={11}>
          <NoteItem
            updateNoteTags={updateNoteTags}
            notesTags={notesTags}
            note={note}/>
        </Col>
      })
    }
  </div>
}

export default NoteList
