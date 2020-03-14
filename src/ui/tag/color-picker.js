import React from "react";
import {CompactPicker} from "react-color";
import {Button, Divider, Input} from "antd"

const ColorPicker = ({color, tagValue, colorChange, tagValueChange, modify}) => {
  return <div>
    <CompactPicker
      color={color}
      onChangeComplete={e => colorChange(e.hex)}/>
    <Divider/>
    <Input size={'small'}
           value={tagValue}
           onChange={e => tagValueChange(e.target.value)}/>
    <Divider/>
    <Button
      size='small'
      className='cursor_pointer'
      onClick={modify}
      style={{fontSize: 12, fontWeight: 'bold'}}>
      Modify</Button>
  </div>
}

export default ColorPicker