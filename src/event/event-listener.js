import mitt from 'mitt'
import FileResource from "../infrastructure/file-resource"
import CardReview from "../model/card-review"
import File from "../model/file"
import {
  CREATE_DIR_EVENT,
  CREATE_FILE_EVENT,
  DELETE_DIR_EVENT,
  DELETE_FILE_EVENT,
  DIR_NAME_CHANGE_EVENT,
  FILE_CONTENT_CHANGE_EVENT,
  FILE_NAME_CHANGE_EVENT,
  OPEN_FILE_EVENT,
  TIMECARD_PLAN_STATUS_CHANGE
} from "./event"
import NoteTagModel from "../model/note-tag"
import TimecardModel from "../model/timecard"
import RecentlyFile from "../model/recently-file";

const emitter = mitt()
emitter.on(FILE_NAME_CHANGE_EVENT, ({props = {}, oldPath = "", newFileName = ""}) => {
  const {notesTags, cardsReview} = props
  props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
  props.updateCardsReview(
    CardReview.updateCardFilePath(
      File.relativePath(oldPath), newFileName, cardsReview
    )
  )

  const _path = File.relativePath(oldPath)
  if (NoteTagModel.exist(_path, notesTags)) {
    props.updateNotesTags(
      window.getNoteTagsPath(),
      NoteTagModel.updateNoteTagPath(_path, newFileName, notesTags))
  }
  props.updateRecentlyFiles(
    RecentlyFile.parseFileNameChange(props.recentlyFiles, oldPath, newFileName)
  )
})

emitter.on(CREATE_DIR_EVENT, ({props = {}}) => {
  console.log('CREATE_DIR_EVENT')
  props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
})

emitter.on(DELETE_FILE_EVENT, ({props = {}, _path, notesTags}) => {
  console.log('DELETE_FILE_EVENT')
  props.updateNotesTags(window.getNoteTagsPath(),
    NoteTagModel.delete(_path, notesTags))
  props.updateRecentlyFiles(
    RecentlyFile.parseFileDelete(props.recentlyFiles, _path)
  )
})

emitter.on(DELETE_DIR_EVENT, ({props = {}}) => {
  console.log('DELETE_DIR_EVENT')
  props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
})

emitter.on(TIMECARD_PLAN_STATUS_CHANGE, ({props = {}}) => {
  console.log('TIMECARD_PLAN_STATUS_CHANGE')
  props.updateTimecardPlans(
    TimecardModel.getPlansByYear('2020')
  )
})

emitter.on(OPEN_FILE_EVENT, ({props = {}, _path}) => {
  console.log('OPEN_FILE_EVENT')
  props.updateRecentlyFiles(
    RecentlyFile.parseFileNameOpen(props.recentlyFiles, _path)
  )
})
emitter.on(FILE_CONTENT_CHANGE_EVENT, ({props = {}, _path}) => {
  console.log('FILE_CONTENT_CHANGE_EVENT')
  props.updateRecentlyFiles(
    RecentlyFile.parseFileContentChange(props.recentlyFiles, _path)
  )
})
emitter.on(DIR_NAME_CHANGE_EVENT, ({props = {}, parentPath, newPath}) => {
  console.log('DIR_NAME_CHANGE_EVENT')
  props.updateRecentlyFiles(
    RecentlyFile.parseDirNameChange(props.recentlyFiles, parentPath,newPath)
  )
})


export const publish = (type, data) => {
  emitter.emit(type, data)
}



