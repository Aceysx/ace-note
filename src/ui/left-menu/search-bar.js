import React from 'react'
import '../../resources/css/search_bar.css'

const SearchBar = ({}) => {
  return <div className="container">
    <input type="text" placeholder="Search...from tag | file "/>
    <div className="search"></div>
  </div>
}

export default SearchBar