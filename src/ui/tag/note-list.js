import React from "react"
import {Col, Statistic} from "antd";

const NoteList = ({selectTag, notes}) => {
  console.log(notes)
  return <div>
    <Statistic
      value={notes.length}
      suffix={`/ ${selectTag}`}/>
    {
      notes.map((note, index) => {
        return <Col key={index} offset={1} span={11}>
          {note.path}
        </Col>
      })
    }
  </div>
}

export default NoteList
