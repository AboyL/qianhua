import { getList } from "../const/subApps"

// 给当前的路由跳转打补丁
export const patchRouter = (globalEvent, eventName) => {
  return function () {
    const e = new Event(eventName)
    globalEvent.apply(this, arguments)
    window.dispatchEvent(e)
  }
}


export const matchPath = (path) => {
  const { pathname } = window.location
  let mPath = path[path.length - 1] === '/' ? path : path + '/'
  let mPathname = pathname[pathname.length - 1] === '/' ? pathname : pathname + '/'

  return mPathname.startsWith(mPath)
}

export const getCurrentApp = () => {
  // 通过当前的 activeRule 来获取到对应的 app
  const currentApp = getList().filter(item => matchPath(item['activeRule']))
  return currentApp && currentApp.length ? currentApp[0] : {}
}

export const isTurnChild = () => {
  return matchPath(window.__CURRENT_SUB_APP__)
}