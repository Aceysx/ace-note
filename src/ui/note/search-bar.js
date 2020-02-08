import React from 'react'
import '../../resources/css/search_bar.css'

export default class SearchBar extends React.Component {
  state = {
    content: ''
  }

  _onKeyUp = e => {
    if (e.keyCode === 13) {
      this.props.searchFiles(this.state.content)
    }
  }

  render() {
    return <div className="container">
      <input type="text"
             onKeyUp={this._onKeyUp}
             onChange={e => this.setState({content: e.target.value})}
             placeholder="Search by tag | file "/>
      <div className="search"></div>
    </div>
  }
}
