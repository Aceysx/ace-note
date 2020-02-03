import React from 'react'
import {Col, Divider, Icon, Input, notification, Row} from 'antd'
import '../../../resources/css/overwrite-hyperMD-style.css'
import '../../../resources/css/markdown.css'
import Files from '../../../utils/files'
import NoteTag from './note-tag'
import {NoteTagModel} from '../../../model/note-tag'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/nginx/nginx'
import 'codemirror/mode/clike/clike'

const HyperMD = require('hypermd')
const NOTE_WORKSPACE_PATH = () => window.localStorage.getItem('workspace')
const NOTES_TAGS_FILE = () => window.localStorage.getItem('workspace') + '/__tags'
let md
export default class Markdown extends React.Component {
  state = {
    mdRef: React.createRef(),
    changedPath: '',
    isContentChanged: false
  }

  componentDidMount() {
    const node = this.state.mdRef.current
    const {file} = this.props
    this.setState({
      changedPath: Files.nameByPath(file.path)
    }, () => {
      md = HyperMD.fromTextArea(node, {
        extraKeys: {
          'Cmd-S': this.modifyFileContent,
          'Ctrl-S': this.modifyFileContent
        }
      })
      md.on('change', (instance, target) => {
        const {file} = this.props
        if (target.origin !== 'setValue') {
          const isContentChanged = instance.getValue() !== file.content;
          this.setState({isContentChanged})
        }
      })
      md.on('blur', () => {
        this.modifyFileContent()
      })

      this._updateMarkdownContent(file.content)
    })
  }

  componentWillReceiveProps(nextProps) {
    const {file} = nextProps
    if (this.props.file.path !== file.path) {
      this.setState({changedPath: Files.nameByPath(file.path)})
      if (this.props.file.content !== file.content) {
        this._updateMarkdownContent(file.content)
      }
    }

    this.setState({isContentChanged: false})
  }

  _updateMarkdownContent = data => {
    try {
      md.setValue(data)
    } catch (e) {
      md.setValue(data)
    }
  }

  modifyFileName = () => {
    const {file, notesTags} = this.props
    const {changedPath} = this.state
    this.props.modifyFileName(file.path, changedPath)

    const _path = file.path.split(NOTE_WORKSPACE_PATH())[1]

    if (NoteTagModel.exist(_path, notesTags)) {
      this.props.updateNotesTags(
        NOTES_TAGS_FILE(),
        NoteTagModel.updateNoteTagPath(_path, changedPath, notesTags))
    }
  }

  modifyFileContent = () => {
    const {file} = this.props
    const currentContent = md.getValue()
    if (file.content !== currentContent) {
      this.props.modifyFileContent(file.path, currentContent)
      notification.success({message: '更新成功'})
    }
  }

  findCurrentNoteTags = (file, notesTags) => {
    const path = file.path.split(NOTE_WORKSPACE_PATH())[1]
    return NoteTagModel.findNoteTagsByPath(notesTags, path)
  }

  findAllTags = notesTags => {
    return NoteTagModel.findAllTags(notesTags)
  }

  updateNoteTags = tags => {
    const {file, notesTags} = this.props
    const path = file.path.split(NOTE_WORKSPACE_PATH())[1]
    this.props.updateNotesTags(NOTES_TAGS_FILE(), NoteTagModel.updateNoteTags(path, notesTags, tags))
  }

  render() {
    const {mdRef, changedPath} = this.state
    const {notesTags, isSubMenuFold, file} = this.props
    return <div className='layout_right_content_layout_markdown_scroll'>
      <div className='markdown_box_header'>
        <Row>
          <Col span={20}>
            <Input className='markdown_box_title'
                   onPressEnter={this.modifyFileName}
                   onChange={e => this.setState({changedPath: e.target.value})}
                   onBlur={this.modifyFileName}
                   size="large" value={changedPath || ''}/>
          </Col>
        </Row>
        <Divider style={{display: 'inline-block', margin: ' -2px 0 0 10px '}}/>
        <div className='markdown_box_bar'>
          <div className='markdown_box_fold'
               onClick={this.props.changeSubMenuFold}
          >
            {
              isSubMenuFold
                ? <Icon type="menu-unfold"/>
                : <Icon type="menu-fold"/>
            }
          </div>
          <div className='markdown_box_tag'>
            <Icon type="tags" style={{
              display: 'inline-block',
              fontSize: 18,
              margin: '0 10px',
              color: '#b7906b'
            }}/>
            <NoteTag
              currentNoteTags={this.findCurrentNoteTags(file, notesTags)}
              updateNoteTags={this.updateNoteTags}
              notesTags={this.findAllTags(notesTags)}/>
          </div>
        </div>
      </div>
      <div style={{height: 110}}></div>
      <textarea
        style={{minHeight: 4000}}
        ref={mdRef}/>
    </div>
  }
}