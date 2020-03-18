import React from "react"
import {Divider, Popover, Statistic, Tag} from "antd"
import ColorPicker from "./color-picker"
import NoteTagModel from "../../model/note-tag"

class TagDisplayBox extends React.Component {
  state = {
    colorEdit: '',
    tagValueEdit: ''
  }
  modify = old => {
    const {colorEdit, tagValueEdit} = this.state
    this.props.updateTag(old, [colorEdit, tagValueEdit].join('||'))
  }

  classifySort = tagsNotes => {
    const tags = Object.keys(tagsNotes).reduce((current, next) => {
      const [color] = NoteTagModel.format(next)
      if (!current[color]) {
        current[color] = []
      }
      current[color].push(next)
      return current
    }, {})
    return Object.values(tags).reduce((current, next) => {
      current.push(...next.sort())
      return current
    }, [])
  }

  render() {
    const {tagsNotes} = this.props
    const {colorEdit, tagValueEdit} = this.state
    const notesSet = new Set()
    Object.values(tagsNotes).forEach(tags => notesSet.add(...tags))
    const tags = this.classifySort(tagsNotes)


    return <div><Statistic
      value={Object.keys(tagsNotes).length}
      suffix={`/ ${notesSet.size}`}/>
      {
        tags.map((tag, index) => {
          const [color, content] = NoteTagModel.format(tag)
          return <Tag key={index}
                      className='tag'
                      color={color}>
            <Popover content={<ColorPicker
              color={colorEdit}
              tagValue={tagValueEdit}
              colorChange={colorEdit => this.setState({colorEdit})}
              tagValueChange={tagValueEdit => this.setState({tagValueEdit})}
              modify={() => this.modify(tag)}
            />}>
                <span
                  onMouseOver={() => {
                    this.setState({colorEdit: color, tagValueEdit: content})
                  }}
                  className='cursor_pointer'>🎨</span>
            </Popover>
            <span className='cursor_pointer'
                  onClick={() => this.props.clickTag(tag)}>
                {content}
                </span>
            <Divider type={'vertical'}/>
            <span style={{fontSize: '12px'}}> {tagsNotes[tag].length}</span>
          </Tag>
        })
      }
    </div>
  }
}


export default TagDisplayBox