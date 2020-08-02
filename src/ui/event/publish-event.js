import mitt from 'mitt'
import FileResource from "../../infrastructure/file-resource"
import CardReview from "../../model/card-review"
import File from "../../model/file"
import {
  CREATE_DIR_OR_FILE_EVENT,
  TIMECARD_PLAN_STATUS_CHANGE,
  DELETE_DIR_EVENT,
  DELETE_FILE_EVENT,
  FILE_NAME_CHANGE_EVENT
} from "./event"
import NoteTagModel from "../../model/note-tag"
import TimecardModel from "../../model/timecard";

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
})

emitter.on(CREATE_DIR_OR_FILE_EVENT, ({props = {}}) => {
  props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
})

emitter.on(DELETE_FILE_EVENT, ({props = {}, _path, notesTags}) => {
  props.updateNotesTags(window.getNoteTagsPath(),
    NoteTagModel.delete(_path, notesTags))
})

emitter.on(DELETE_DIR_EVENT, ({props = {}}) => {
  props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
})

emitter.on(TIMECARD_PLAN_STATUS_CHANGE, ({props = {}}) => {
  props.updateTimecardPlans(
    TimecardModel.getPlansByYear('2020')
  )
})


export const publish = (type, data) => {
  emitter.emit(type, data)
}



