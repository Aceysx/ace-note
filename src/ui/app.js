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
  UPDATE_PLAN_TEMPLATES,
  UPDATE_SELECTED_DIR,
  UPDATE_STATUS,
  UPDATE_TIMECARD_LABELS,
  UPDATE_TIMECARD_PLANS, UPDATE_TIMECARD_YEAR
} from '../redux/reducers/dispatch-command/commands'

import '../resources/css/app.css'
import TagBody from "./tag/tag-body";
import TimecardBody from "./timecard/timecard-body"
import NoteStatisticBody from "./note/statistic/note-statistic-body"
import {publish} from "../event/event-listener";
import {RESET_WORKSPACE_EVENT, TIMECARD_PLAN_STATUS_CHANGE, TIMECARD_YEAR_CHANGE} from "../event/event";

const {Sider, Content} = Layout

class App extends React.Component {

  registerShortcuts = () => {
    registerShortcuts.leftMenuVisible(() => this.updateStatus({leftMenuVisible: !this.props.status.leftMenuVisible}))
    registerShortcuts.subMenuVisible(() => this.updateStatus({subMenuVisible: !this.props.status.subMenuVisible}))
    registerShortcuts.searchModalVisible(() => this.updateStatus({searchModalVisible: !this.props.status.searchModalVisible}))
    registerShortcuts.recentlyFilesModalVisible(() => this.updateStatus({recentlyFilesModalVisible: !this.props.status.recentlyFilesModalVisible}))
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
    publish(RESET_WORKSPACE_EVENT, {props: this.props, workspace})
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
    publish(RESET_WORKSPACE_EVENT, {props: this.props, workspace})
    this.expiredCardsReaperAndUpdate()
  }

  initWorkspace = () => {
    const workspace = FileResource.openDir()
    window.localStorage.setItem('workspace', workspace)
    window.localStorage.removeItem('note')
    window.localStorage.setItem('version', process.env.REACT_APP_VERSION)

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
      return (File.name(file.path) || '').toLowerCase()
        .includes((content || '').toLowerCase())
    })
    const foundInTags = notesTags.filter(tagFile => tagFile.tags.join(',').includes(content))
    const inTagPath = allFiles.filter(file => foundInTags.find(tagFile => file.path.includes(tagFile.path)))
    inFilesPath.push(...inTagPath)
    return [...new Set(inFilesPath)]
  }

  _formatAllFiles = sub => {
    const files = []
    for (let item of sub) {
      if (item.type === 'dir') {
        files.push(...this._formatAllFiles(item.sub))
        continue
      }
      files.push(item)

    }
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
  updateTimecardYear = year =>{
    publish(TIMECARD_YEAR_CHANGE, {props: this.props,year})
    this.props.updateTimecardYear(year)
  }

  render() {
    const {
      leftMenu, selectedDir, notesTags, status, cardsReview, timecardPlans, timecardLabels,
      timecardPlanTemplates,timecardYear
    } = this.props
    const {current, leftMenuVisible, searchModalVisible} = status
    console.log(timecardYear)
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
            current === MENU.NOTE_STATISTIC
              ? <NoteStatisticBody
                notesTags={notesTags}
                pushToRepo={this.pushToRepo}
                leftMenuVisible={leftMenuVisible}
                updateStatus={this.updateStatus}
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
          }
          {
            current === MENU.TIMECARD
              ? <TimecardBody
                    timecardYear={timecardYear}
                timecardLabels={timecardLabels}
                timecardPlans={timecardPlans}
                timecardPlanTemplates={timecardPlanTemplates}
                pushToRepo={this.pushToRepo}
                leftMenuVisible={leftMenuVisible}
                updateStatus={this.updateStatus}
                    updateTimecardYear={this.updateTimecardYear}
                updateTimecardlabels={this.props.updateTimecardlabels}
                updatePlanTemplates={this.props.updatePlanTemplates}
                updateTimecardPlans={this.props.updateTimecardPlans}
              />
              : ''
          }

          {
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
              ? <div style={{margin: '27%'}}>
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
  updateTimecardPlans: plans => dispatch(UPDATE_TIMECARD_PLANS(plans)),
  updateDirs: dirs => dispatch(UPDATE_FILES(dirs)),
  updateNotesTags: noteTags => dispatch(UPDATE_NOTES_TAGS(noteTags)),
  updateSelectedDir: dir => dispatch(UPDATE_SELECTED_DIR(dir)),
  updateCardsReview: cardsReview => dispatch(UPDATE_CARDS_REVIEW(cardsReview)),
  updateTimecardlabels: (labels) => dispatch(UPDATE_TIMECARD_LABELS(labels)),
  updatePlanTemplates: (templates) => dispatch(UPDATE_PLAN_TEMPLATES(templates)),
  updateStatus: status => dispatch(UPDATE_STATUS(status)),
  updateTimecardYear: year => dispatch(UPDATE_TIMECARD_YEAR(year)),
})

const mapStateToProps = ({
                           leftMenu,
                           selectedDir,
                           notesTags,
                           status,
                           cardsReview,
                           timecardPlans,
                           timecardLabels,
                           timecardPlanTemplates,
                           timecardYear
                         }) => ({
  leftMenu,
  selectedDir,
  notesTags,
  cardsReview,
  timecardPlans,
  timecardLabels,
  timecardPlanTemplates,
  status,
  timecardYear
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
