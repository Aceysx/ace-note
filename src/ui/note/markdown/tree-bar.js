import React from "react"
import {Empty, Tooltip} from "antd";

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
    <span style={{
      fontSize: 12,
      display: 'block',
      marginBottom: 5,
      fontWeight: 'bold',
      fontStyle: 'italic',
      color: 'rgba(25, 23, 17, 0.8)'
    }}>outline</span>
    {tree.length
      ?
      tree.map(item => {
        return <Tooltip title={item.content} placement='rightTop'>
        <span className='markdown-outline-item'
              onClick={() => turnTo(item)}
              style={{
                paddingLeft: `${8 * (item.layer - 1)}px`,
                opacity: `${(1 - (2 + item.layer) / 10) < 0.5 ? 0.5 : (1 - (2 + item.layer) / 10)}`
              }}>{item.content.trim()}</span>
        </Tooltip>
      })
      : <Empty/>
    }
  </span>
}
export default TreeBar