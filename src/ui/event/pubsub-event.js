import mitt from 'mitt'
import FileResource from "../../infrastructure/file-resource";
import CardReview from "../../model/card-review";
import File from "../../model/file";
import {FILE_NAME_CHANGE_EVENT} from "./event";

const emitter = mitt()

emitter.on(FILE_NAME_CHANGE_EVENT, ({props = {}, oldPath = "", newFileName = "", cardsReview = []}) => {
  props.updateDirs(FileResource.initNoteBook(window.getNoteWorkspacePath()))
  props.updateCardsReview(
    CardReview.updateCardFilePath(
      File.relativePath(oldPath), newFileName, cardsReview
    )
  )
})


export const publish = (type, data) => {
  emitter.emit(type, data)
}



