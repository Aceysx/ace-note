import React from "react"
import {Icon, Input, message} from "antd"


const UrlHtmlRender = ({url, updateUrl, changeUrlContent}) => {
  const isUrl = url => {
    const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    return new RegExp(Expression).test(url);
  }
  const checkAndUpdateUrl = () => {
    if (!isUrl(url)) {
      message.warning('url is invalid, please re-enter')
      return
    }
    updateUrl(url);
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
             value={url || 'input your address'}
             onChange={event => changeUrlContent(event.target.value)}/>
      <Icon type="double-right" className='browser-template__controls cursor_pointer'
            onClick={checkAndUpdateUrl}/>
    </div>
    {
      isUrl(url)
        ? <iframe src={url} width="100%" height="100%"
                  frameBorder="0">
        </iframe>
        : ''
    }

  </div>
}
export default UrlHtmlRender