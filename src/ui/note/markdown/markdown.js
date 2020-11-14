import React from 'react'
import {Col, Divider, Icon, Input, notification, Popconfirm, Row} from 'antd'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/nginx/nginx'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/css/css'
import 'codemirror/mode/clike/clike'
import 'mermaid'
import File from '../../../model/file'
import NoteTag from './note-tag'
import NoteTagModel from '../../../model/note-tag'
import TreeBar from "./tree-bar"
import {startSpellCheck, typoLoaded} from "./spell-check"

import '../../../resources/css/overwrite-hyperMD-style.css'
import '../../../resources/css/markdown.css'
import '../../../resources/css/markdown-iframe.css'
import MindMap from "../mindmap/mind-map"
import * as HyperMD from "hypermd"
import "hypermd-mermaid"
import {UPDATE_SUCCESS} from "../../../model/message"
import UrlHtmlRender from "./url-html-render";

let md

export default class Markdown extends React.Component {
  state = {
    mdRef: React.createRef(),
    changedPath: '',
    isContentChanged: false,
    content: '',
    outlineVisible: false,
    mindMapVisible: false
  }

  componentDidMount() {
    const node = this.state.mdRef.current
    const {file} = this.props
    this.setState({
      changedPath: File.name(file.path)
    }, () => {
      md = HyperMD.fromTextArea(node, {
        hmdModeLoader: false,
        extraKeys: {
          'Cmd-S': this.modifyFileContent,
          'Ctrl-S': this.modifyFileContent,
          'Cmd-3': cm => cm.replaceSelection('### '),
          'Cmd-4': cm => cm.replaceSelection('#### '),
          'Cmd-5': cm => cm.replaceSelection('##### '),
          "Cmd-'": cm => cm.replaceSelection('`'),
          'Cmd-M': this._switchMindMapVisible,
        }
      })
      md.on('change', (instance, target) => {
        const {file} = this.props
        this.setState({content: md.getValue()})
        if (target.origin !== 'setValue') {
          const isContentChanged = instance.getValue() !== file.content;
          this.setState({isContentChanged})
        }
      })
      md.on('blur', () => {
        this.modifyFileContent()
      })
      this._updateMarkdownContent(file.content)
      md.hmd.Fold._enabled.html = true;
    })
  }

  componentWillReceiveProps(nextProps) {
    const {file} = nextProps
    if (this.props.file.path !== file.path) {
      this.setState({changedPath: File.name(file.path), mindMapVisible: false})
      if (this.props.file.content !== file.content) {
        this._updateMarkdownContent(file.content)
      }
    }

    this.setState({isContentChanged: false})
  }

  _switchMindMapVisible = () => {
    const {mindMapVisible} = this.state
    this.setState({mindMapVisible: !mindMapVisible})
  }
  _updateMarkdownContent = data => {
    typoLoaded.then(typo => startSpellCheck(md, typo));

    this.setState({content: data})
    try {
      md.setValue(data)
    } catch (e) {
      md.setValue(data)
    }
  }

  modifyFileName = () => {
    const {file} = this.props
    const {changedPath} = this.state
    this.props.modifyFileName(file.path, changedPath)
  }

  modifyFileContent = () => {
    const {file} = this.props
    const currentContent = md.getValue()
    if (file.content !== currentContent) {
      this.props.modifyFileContent(file.path, currentContent)
      notification.success({message: UPDATE_SUCCESS, duration: 2})
    }
  }
  updateUrl = () => {
    const {file} = this.props
    const {content} = this.state
    this.props.modifyFileContent(file.path, content)
    notification.success({message: UPDATE_SUCCESS, duration: 2})
  }

  changeUrlContent = content => {
    this.setState({content})
  }

  findCurrentNoteTags = (file, notesTags) => {
    const path = File.relativePath(file.path)
    return NoteTagModel.findNoteTagsByPath(notesTags, path)
  }

  findAllTags = notesTags => {
    return NoteTagModel.findAllTags(notesTags)
  }

  updateNoteTags = tags => {
    const {file, notesTags} = this.props
    const path = File.relativePath(file.path)
    this.props.updateNotesTags(window.getNoteTagsPath(), NoteTagModel.updateNoteTags(path, notesTags, tags))
  }

  calculate = () => {
    const {status: {leftMenuVisible, subMenuVisible}} = this.props
    const {outlineVisible} = this.state

    return (leftMenuVisible ? 200 : 0) +
      (subMenuVisible ? 230 : 0) +
      (outlineVisible ? 200 : 0)
  }

  render() {
    const {mdRef, changedPath, content, outlineVisible, mindMapVisible} = this.state
    const {notesTags, file, isInReviewed} = this.props
    return <div className='layout_right_content_layout_markdown_scroll'>
      <div className='markdown_box_header'>
        <Row>
          <Col span={20}>
            <Input className='markdown_box_title'
                   onPressEnter={this.modifyFileName}
                   onChange={e => this.setState({changedPath: e.target.value})}
                   onBlur={this.modifyFileName}
                   value={changedPath || ''}/>
          </Col>
        </Row>
        <Divider style={{display: 'inline-block', margin: ' -2px 0 0 10px '}}/>

        <div className='markdown_box_bar'>
          <div className='markdown_box_tag'>
            <Icon type='ordered-list'
                  className='markdown_box_tag_item bg-color-hover cursor_pointer'
                  onClick={() => this.setState({outlineVisible: !outlineVisible})}/>
            <Popconfirm
              title={`${isInReviewed ? 'remove from' : 'add to'} Cards Review?`}
              onConfirm={() => this.props.updateToCardsReview(file.path)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type={isInReviewed ? 'carry-out' : 'calendar'}
                    className='markdown_box_tag_item cursor_pointer bg-color-hover'/>
            </Popconfirm>
            <Icon type="heat-map"
                  onClick={() => this.setState({mindMapVisible: !mindMapVisible})}
                  className='markdown_box_tag_item bg-color-hover cursor_pointer'/>

            <Divider type='vertical'/>
            <Icon type="tags" className='markdown_box_tag_item'/>
            <NoteTag
              currentNoteTags={this.findCurrentNoteTags(file, notesTags)}
              updateNoteTags={this.updateNoteTags}
              notesTags={this.findAllTags(notesTags)}/>
          </div>
          <span style={{position: 'fixed', right: 30}}>
          {
            md
              ? <span>
                <span className='markdown_bottom_tool_record'>
                  Words {md.getValue()
                  ? (md.getValue().match(/[\u4E00-\u9FA5]/g) || '').length
                  : ''}
                </span>
                <span className='markdown_bottom_tool_record'>
                  Line {md.lineCount()}
                </span>
          </span>
              : ''
          }
            <span>
          </span>
        </span>
        </div>
      </div>

      {
        outlineVisible
          ? <div style={{
            width: 200,
            shapeOutside: 'none',
            float: 'left',
            marginTop: 80,
            height: '100%'
          }}>
            <TreeBar content={content}
                     turnTo={line => {
                       const {layer, origin} = line
                       const doms = window.document.querySelectorAll(`.HyperMD-header-${layer}`)
                       for (const dom of doms) {
                         if (dom.textContent === origin) {
                           dom.scrollIntoView()
                         }
                       }
                     }}/>
          </div>
          : ''
      }


      <div className='markdown_box_content'
           style={{
             marginLeft: `${
               outlineVisible
                 ? 200
                 : 0}px`,
             paddingRight: `${
               this.calculate()
             }px`
           }}>
        {
          content && mindMapVisible
            ? <MindMap markdown={content}/>
            : ''
        }
        {
          File.isHtml(file.type)
            ? <UrlHtmlRender url={content}
                             updateUrl={this.updateUrl}
                             changeUrlContent={this.changeUrlContent}/>
            : ''
        }
        <textarea
          ref={mdRef}/>
      </div>


    </div>
  }
}