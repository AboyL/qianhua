import { getMainLifecycle } from "../const/mainLifeCycle"
import { loadHtml } from "../loader"
import { findAppByRoute } from "../utils"

export const lifecycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__)

  // 获取到要跳转到的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)

  if (!nextApp) {
    return
  }

  // 如果存在上一个子应用 那么先执行上一个子应用的 unmount 方法
  // 再执行全局的 destoryed 方法
  if (prevApp) {
    if(prevApp.proxy){
      prevApp.proxy.inactive()
    }
    destoryed(prevApp)
  }

  // 执行主应用的 beforeLoad方法 渲染子应用
  const app = await beforeLoad(nextApp)

  // 执行真正的渲染的逻辑

  await mounted(app)
}


export const destoryed = async (app) => {
  app && app.unmount && app.unmount()
  // 对应的执行以下主应用的生命周期
  await runMainLifeCycle('destoryed')
}

export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad')
  app && app.beforeLoad && app.beforeLoad()

  // 预留出来渲染的内容
  const subApp = await loadHtml(app)
  subApp && subApp.beforeLoad && subApp.beforeLoad()

  return subApp

}


export const mounted = async (app) => {
  app && app.mount && app.mount()
  // 对应的执行以下主应用的生命周期
  await runMainLifeCycle('mounted')
}



export const runMainLifeCycle = async (type) => {
  const mainLifeCycle = getMainLifecycle()

  return await Promise.all(mainLifeCycle[type].map(async (item) => item()))
}