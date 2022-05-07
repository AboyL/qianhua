import React from 'react'
import "./index.scss"
import ReactDOM from 'react-dom'
import BasicMap from './src/router';

const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
  console.log('__MICRO_WEB__')
  render()
}

export const bootstrap = () => {
  console.log('bootstrap')
}

export const mount = ({ appInfo }) => {
  console.log('mount')
  console.log('appInfo', appInfo)
  // 测试沙箱
  window.a = '1'
  render()
}

export const unmount = () => {
  console.log('卸载')
}
