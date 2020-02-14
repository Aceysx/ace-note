import React from "react"
import {Empty} from "antd";

const TITLE = [
  {layer: 1, start: '# '},
  {layer: 2, start: '## '},
  {layer: 3, start: '### '},
  {layer: 4, start: '#### '},
  {layer: 5, start: '##### '}
]

const TreeBar = ({content, turnTo}) => {
  const convert = content => {
    const result = []
    content.split('\n').forEach((origin) => {
      const found = TITLE.find(title => origin.startsWith(title.start))
      if (found) {
        const {layer, start} = found
        result.push({
          layer,
          origin,
          content: origin.replace(start, '')
        })
      }
    })
    return result
  }

  const tree = convert(content)
  return <span className='markdown-tree-bar'>
    {tree.length
      ?
      tree.map(item => {
        return <span className='markdown-outline-item'
                     onClick={() => turnTo(item)}
                     style={{
                       paddingLeft: `${5 * item.layer}px`
                     }}>{item.content}</span>
      })
      : <Empty/>
    }
  </span>
}
export default TreeBar