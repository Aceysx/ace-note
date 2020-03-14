import React from "react"
import {Divider, Popover, Tag} from "antd"
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

  render() {
    const {tagsNotes} = this.props
    const {colorEdit, tagValueEdit} = this.state

    return <div>
      {/*<div style={{width: '100%', height: '100%', margin: '100px 0 0 50px'}}>*/}
      {/*<TagCloud tagName={Object.keys(tagsNotes)}*/}
      {/*          speed={1}/>*/}
      {/*</div>*/}
      {
        Object.keys(tagsNotes)
          .map((tag, index) => {

            const [color, content] = NoteTagModel.format(tag)
            return <Tag key={index}
                        color={color} closable>
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
                  }} className='cursor_pointer'>🎨</span>
              </Popover>
              {content} <Divider type={'vertical'}/>
              {tagsNotes[tag].length}
            </Tag>

          })
      }
    </div>
  }
}


export default TagDisplayBox