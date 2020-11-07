import React from "react"
import {Icon, Input} from "antd";


const UrlHtmlRender = ({url}) => {
  const isUrl = url => {
    const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    return new RegExp(Expression).test(url);
  }

  return <div className="browser-template">
    <div className="browser-template__top-bar">
      <ul className="browser-template__buttons">
        <li className="browser-template__buttons_item"></li>
        <li className="browser-template__buttons_item"></li>
        <li className="browser-template__buttons_item"></li>
      </ul>
      <Input className='browser-template__address'
             style={{textAlign: 'center', width: '100%'}}
             value={url || 'input your address'}/>
      <Icon type="double-right" className='browser-template__controls cursor_pointer'/>
    </div>
    {
      isUrl(url)
        ? <iframe src='http://studio.bfw.wiki/Studio/Open/id/15832782884746150092.html' width="100%" height="100%"
                  frameBorder="0">
        </iframe>
        : ''
    }

  </div>
}
export default UrlHtmlRender