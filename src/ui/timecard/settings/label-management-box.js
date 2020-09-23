import React from "react";
import {Icon, Popover, Tag} from "antd";
import ColorPicker from "../../tag/color-picker";

class LabelManagementBox extends React.Component {
  state = {
    colorEdit: '',
    labelValueEdit: ''
  }
  modify = label => {
    const {colorEdit, labelValueEdit} = this.state
    this.props.updateLabel({
      ...label,
      color: colorEdit,
      title: labelValueEdit
    })
  }

  render() {
    const {colorEdit, labelValueEdit} = this.state
    const {labels = []} = this.props

    return <div>
      {labels.map((label, index) => {
        const {color, id, title} = label
        return <Tag key={id}
                    className='tag'
                    color={color}>
          <Popover content={<ColorPicker
            color={colorEdit}
            tagValue={labelValueEdit}
            colorChange={colorEdit => this.setState({colorEdit})}
            tagValueChange={labelValueEdit => this.setState({labelValueEdit})}
            modify={() => this.modify(label)}
          />}>
    <span
      onMouseOver={() => {
        this.setState({colorEdit: color, labelValueEdit: title})
      }}
      className='cursor_pointer'>🎨</span>
          </Popover>
          <span className='cursor_pointer'>
    {title}
    </span>
        </Tag>
      })
      }
      <Tag onClick={this.props.createLabel}
           className='tag cursor_pointer'
           style={{background: '#fff', borderStyle: 'dashed'}}>
        <Icon type="plus"/> New Label
      </Tag>
    </div>
  }
}

export default LabelManagementBox