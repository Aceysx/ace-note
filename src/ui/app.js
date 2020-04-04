import * as React from 'react'
import {Empty, Layout} from 'antd'
import {connect} from 'react-redux'
import FileResource from '../infrastructure/file-resource'
import Note from './note/note'
import Setting from './setting/setting'
import GitResource from '../infrastructure/git-resource'
import LeftMenu from './left-menu/left-menu'
import SearchBar from './search-bar/search-bar'
import MENU from './note/menu-item'
import File from '../model/file'
import Timer from '../model/timer'
import CardsReviewBody from "./card-review/cards-review-body"
import CardReview from "../model/card-review"
import registerShortcuts from '../infrastructure/shortcut-resource'

import {
  UPDATE_CARDS_REVIEW,
  UPDATE_FILES,
  UPDATE_NOTES_TAGS,
  UPDATE_SELECTED_DIR,
  UPDATE_STATUS
} from '../redux/reducers/dispatch-command/commands'

import '../resources/css/app.css'
import TagBody from "./tag/tag-body";

const {Sider, Content} = Layout

class App extends React.Component {
  registerShortcuts = () => {
    registerShortcuts.leftMenuVisible(() => this.updateStatus({leftMenuVisible: !this.props.status.leftMenuVisible}))
    registerShortcuts.subMenuVisible(() => this.updateStatus({subMenuVisible: !this.props.status.subMenuVisible}))
    registerShortcuts.searchModalVisible(() => this.updateStatus({searchModalVisible: !this.props.status.searchModalVisible}))
  }

  schedule = () => {
    Timer.expiredCardsReaperAndUpdate(this.expiredCardsReaperAndUpdate)
  }

  expiredCardsReaperAndUpdate = () => {
    let cards = CardReview.expireCardsReaper(FileResource.getCardsReview(window.getCardsPath()));
    this.updateCardsReview(cards)
  }

  componentDidMount() {
    this.registerShortcuts()
    let workspace = window.getNoteWorkspacePath()
    if (!workspace) {
      workspace = this.initWorkspace()
    }
    this.props.updateDirs(FileResource.initNoteBook(workspace))
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
    this.expiredCardsReaperAndUpdate()
    this.schedule()
  }

  updateNotesTags = (path, notesTags) => {
    FileResource.modifyFileContent({path, content: JSON.stringify(notesTags)})
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
  }

  isEmpty = (current, selectedDir) => {
    return current === MENU.NOTE && selectedDir.sub === undefined
  }

  updateSelectedDir = (selectedDir) => {
    this.switchToMenu(MENU.NOTE)
    this.props.updateSelectedDir(FileResource.findSubFiles(selectedDir))
  }

  switchToMenu = current => {
    if (current === MENU.SEARCH) {
      this.updateStatus({searchModalVisible: true})
      return
    }

    this.updateStatus({current})
  }

  pushToRepo = (workspace) => {
    GitResource.pushToRepo(workspace)
  }

  resetWorkspace = () => {
    const workspace = this.initWorkspace()
    this.props.updateDirs(FileResource.initNoteBook(workspace))
    this.props.updateNotesTags(FileResource.getNotesTags(window.getNoteTagsPath()))
    this.expiredCardsReaperAndUpdate()
  }

  initWorkspace = () => {
    const workspace = FileResource.openDir()
    window.localStorage.setItem('workspace', workspace)
    window.localStorage.removeItem('note')
    return workspace
  }

  searchFiles = content => {
    const selectedDir = {
      path: MENU.SEARCH_RESULT,
      sub: this._searchByTitleOrTag(content)
    }
    this.props.updateSelectedDir(selectedDir)

  }

  _searchByTitleOrTag = content => {
    const {leftMenu, notesTags} = this.props
    const allFiles = this._formatAllFiles(leftMenu.sub)
    const inFilesPath = allFiles.filter(file => {
      return File.name(file.path).includes(content)
    })
    const foundInTags = notesTags.filter(tagFile => tagFile.tags.join(',').includes(content))
    const inTagPath = allFiles.filter(file => foundInTags.find(tagFile => file.path.includes(tagFile.path)))
    inFilesPath.push(...inTagPath)
    return [...new Set(inFilesPath)]
  }

  _formatAllFiles = sub => {
    const files = []
    sub.forEach(item => {
      if (item.type === 'dir') {
        files.push(...this._formatAllFiles(item.sub))
      }
      if (item.type === 'file') {
        files.push(item)
      }
    })
    return files
  }

  updateStatus = data => {
    const {status} = this.props
    this.props.updateStatus({...status, ...data})
  }


  updateCardsReview = (cardsReview) => {
    const updateCardsReview = FileResource.modifyFileContent(
      {
        path: window.getCardsPath(),
        content: JSON.stringify(cardsReview)
      }
    ).content
    this.props.updateCardsReview(JSON.parse(updateCardsReview))
  }

  render() {
    const {leftMenu, selectedDir, notesTags, status, cardsReview} = this.props
    const {current, leftMenuVisible, searchModalVisible} = status

    return <Layout className='layout'>
      <Sider
        className={`layout_left_sider ${leftMenuVisible ? 'layout_left_sider_display' : 'layout_left_sider_hide'}`}
        theme='light'
      >
        <LeftMenu
          switchToMenu={this.switchToMenu}
          leftMenu={leftMenu}
          updateMenu={this.updateSelectedDir}
        />
      </Sider>
      <Layout className='layout_right_content_layout'>
        <Content>
          {
            current === MENU.NOTE && selectedDir.sub !== undefined
              ? <Note
                cardsReview={cardsReview}
                leftMenuVisible={leftMenuVisible}
                status={status}
                leftMenu={leftMenu}
                notesTags={notesTags}
                selectedDir={selectedDir}
                pushToRepo={this.pushToRepo}
                updateStatus={this.updateStatus}
                updateNotesTags={this.updateNotesTags}
                updateDirs={this.props.updateDirs}
                updateSelectedDir={this.updateSelectedDir}
                updateCardsReview={this.updateCardsReview}
              />
              : ''
          }
          {
            current === MENU.SETTING
              ? <Setting
                resetWorkspace={this.resetWorkspace}
                workspace={leftMenu.path}
              />
              : ''
          }
          {
            current === MENU.CARDS_REVIEW
              ? <CardsReviewBody
                notesTags={notesTags}
                updateCardsReview={this.updateCardsReview}
                cardsReview={cardsReview}
                pushToRepo={this.pushToRepo}
                leftMenuVisible={leftMenuVisible}
                updateStatus={this.updateStatus}
              />
              : ''
          }{
          current === MENU.TAG
            ? <TagBody
              notesTags={notesTags}
              updateNotesTags={this.updateNotesTags}
              pushToRepo={this.pushToRepo}
              leftMenuVisible={leftMenuVisible}
              updateStatus={this.updateStatus}
            />
            : ''
        }
          {
            this.isEmpty(current, selectedDir)
              ? <div style={{margin: '50%'}}>
                <Empty description={false}/>
              </div>
              : ''
          }
        </Content>
      </Layout>
      <SearchBar
        searchModalVisible={searchModalVisible}
        searchFiles={this.searchFiles}
        closeSearchModal={() => this.updateStatus({
          current: MENU.NOTE,
          subMenuVisible: true,
          searchModalVisible: false
        })}
      />
    </Layout>
  }
}

const mapDispatchToProps = dispatch => ({
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateNotesTags: noteTags => dispatch(UPDATE_NOTES_TAGS(noteTags)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir)),
  updateCardsReview: cardsReview => dispatch(UPDATE_CARDS_REVIEW(cardsReview)),
  updateStatus: status => dispatch(UPDATE_STATUS(status)),
})

const mapStateToProps = ({
                           leftMenu,
                           selectedDir,
                           notesTags,
                           status,
                           cardsReview
                         }) => ({
  leftMenu,
  selectedDir,
  notesTags,
  cardsReview,
  status
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
