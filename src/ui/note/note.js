import React from 'react'
import SubMenu from './sub-menu/sub-menu';
import Markdown from './markdown/markdown';

export default class Note extends React.Component {
  state = {
    isSubMenuFold: false
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.selectedDir === nextProps.selectedDir) {
      return false
    }
    this.setState({isSubMenuFold: false})
  }

  render() {
    const {
      selectedDir, currentEditFile, selectedDirStack, updateCurrentEditFile,
      updateSelectedDir, modifyFileName, deleteFileOrDir,
      updateSelectedDirStack, modifyFileContent,
      notesTags, updateNotesTags
    } = this.props
    const {isSubMenuFold} = this.state
    return <div>
      {
        isSubMenuFold
          ? ''
          : <SubMenu
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
      }
      {
        currentEditFile.path
          ? <div className={`layout_right_content_layout_right_content_markdown `}>
            <Markdown file={currentEditFile}
                      notesTags={notesTags}
                      modifyFileContent={modifyFileContent}
                      modifyFileName={modifyFileName}
                      updateNotesTags={updateNotesTags}
                      isSubMenuFold={isSubMenuFold}
                      changeSubMenuFold={() => this.setState({isSubMenuFold: !isSubMenuFold})}
            />
          </div>
          : <div></div>
      }
    </div>
  }
}