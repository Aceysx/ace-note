import React from "react"
import {loadPlugins, Markmap} from 'markmap-lib/dist/view'
import {transform} from 'markmap-lib/dist/transform'
import Empty from "antd/es/empty"

export default class MindMap extends React.Component {
  componentDidMount() {
    const {markdown} = this.props
    if (this.isRenderMindMap(markdown)) {
      this.renderMindMap(markdown);
    }
  }

  isRenderMindMap = (markdown = '') => {
    return markdown.split('\n').some(line => {
      let trimLine = line.trimLeft();
      return trimLine.startsWith('#')
    })
  }

  format = markdown => {
    return markdown.split('\n').filter(line => {
      let trimLine = line.trimLeft();
      trimLine = trimLine.substr(0, 4)
      return trimLine.startsWith('#')
        || trimLine.startsWith('##')
        || trimLine.startsWith('###')
        || trimLine.startsWith('####')
    }).join('\n')
  }

  renderMindMap = markdown => {
    const data = transform(this.format(markdown))
    let e = document.querySelector("#markmap");
    e.innerHTML = "";
    loadPlugins([
      'mathJax',
      'prism',
    ]).then(() => {
      Markmap.create('#markmap', null, data)
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {markdown} = nextProps
    if (this.props.markdown !== markdown && this.isRenderMindMap(markdown)) {
      this.renderMindMap(markdown)
    }
  }

  render() {
    const {markdown} = this.props
    return <div>
      {
        this.isRenderMindMap(markdown)
          ? <svg id="markmap" width={'100%'} height={700}/>
          : <Empty/>
      }
    </div>
  }
}
