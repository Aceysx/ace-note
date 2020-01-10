import React from 'react'
import SubMenu from "./sub-menu/sub-menu";
import {Empty} from "antd/lib/index";
import Markdown from "../commons/markdown/markdown";

const Note = ({selectedDir,currentEditFile,selectedDirStack,updateCurrentEditFile,
                updateSelectedDir,modifyFileName,deleteFileOrDir,
                updateSelectedDirStack,modifyFileContent}) => {

  return <div>
    <SubMenu
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
                    modifyFileContent={modifyFileContent}
                    modifyFileName={modifyFileName}/>
        </div>
        : <Empty
          style={{marginTop: '20%'}}
          description={false}
          image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
  </div>
}
export default Note