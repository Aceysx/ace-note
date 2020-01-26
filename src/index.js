import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import './css/overwrite-antd-style.css'
import updateStoreToLocalStorageMiddleware from './components/middleware/update-store-to-local-storage-middleware';

const initStore = () => {
  let store = window.localStorage.getItem('store')
  return store ? JSON.parse(store) : {}
}

const store = createStore(reducer, initStore(), applyMiddleware(thunkMiddleware, updateStoreToLocalStorageMiddleware))


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
)
