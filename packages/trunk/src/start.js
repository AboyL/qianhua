import { getList, setList } from './const/subApps'
import { rewriteRouter } from './router/rewriteRouter'
import { getCurrentApp } from './utils'

rewriteRouter()

export const registerMicroApps = (appList) => {
  setList(appList)
}

export const start = () => {
  const appList = getList()
  if (appList.length === 0) {
    throw Error('子应用列表为空')
  }

  const app = getCurrentApp()
  console.log(app)

  // 将对应的app 的 activeRule 绑定到全局变量上去 后续可以用来进行缓存等作用
  window.__CURRENT_SUB_APP__ = app.activeRule

}