import React from 'react'
import SubMenu from "./sub-menu/sub-menu";
import {Empty} from "antd/lib/index";
import Markdown from "../commons/markdown/markdown";

const Note = ({
                selectedDir, currentEditFile, selectedDirStack, updateCurrentEditFile,
                updateSelectedDir, modifyFileName, deleteFileOrDir,
                updateSelectedDirStack, modifyFileContent,
                notesTags, updateNotesTags
              }) => {

  return <div>
    <SubMenu
      notesTags={notesTags}
      updateNotesTags={updateNotesTags}
      selectedDir={selectedDir}
      currentEditFile={currentEditFile}
      updateCurrentEditFile={updateCurrentEditFile}
      updateSelectedDir={updateSelectedDir}
      modifyFileName={modifyFileName}
      deleteFileOrDir={deleteFileOrDir}
      selectedDirStack={selectedDirStack}
      updateSelectedDirStack={updateSelectedDirStack}
    />
    {
      currentEditFile.path
        ? <div className={`layout_right_content_layout_right_content_markdown `}>
          <Markdown file={currentEditFile}
                    notesTags={notesTags}
                    modifyFileContent={modifyFileContent}
                    modifyFileName={modifyFileName}
                    updateNotesTags={updateNotesTags}/>
        </div>
        : <div></div>
    }
  </div>
}
export default Note