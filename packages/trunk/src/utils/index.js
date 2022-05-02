import { getList } from "../const/subApps"

// 给当前的路由跳转打补丁
export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName)
    globalEvent.apply(this, arguments)
    window.dispatchEvent(e)
  }
}


export const matchPath = (path, pathname) => {
  if (!path || !pathname) {
    return false
  }
  let mPath = path[path.length - 1] === '/' ? path : path + '/'
  let mPathname = pathname[pathname.length - 1] === '/' ? pathname : pathname + '/'

  return mPathname.startsWith(mPath)
}

export const getCurrentApp = () => {
  // 通过当前的 activeRule 来获取到对应的 app
  const currentApp = getList().filter(item => matchPath(item['activeRule'], window.location.pathname))
  return currentApp && currentApp.length ? currentApp[0] : {}
}

export const findAppByRoute = (path) => {
  const currentApp = getList().filter(item => matchPath(item['activeRule'], path))
  return currentApp && currentApp.length ? currentApp[0] : {}
}


let isFirst = false
export const isTurnChild = () => {
  const change = matchPath(window.__CURRENT_SUB_APP__, window.location.pathname)
  if (change && !isFirst) {
    // 路由无变化
    return false
  }
  isFirst = false
  // 子应用存在切换，这个时候应该把上一次的路径进行保存，然后根据上一次的路径获取到对应子模块进行卸载操作
  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__;
  const app = getCurrentApp()
  window.__CURRENT_SUB_APP__ = app.activeRule
  return true;

}