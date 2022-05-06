
export const performScriptForEval = (script, appName,app) => {
  // library window.appName
  window.proxy=app.proxy.proxy
  const scriptText = `
    ((window) => {
      ${script}
      return window['${appName}'] 
    })(window.proxy)
  `
  return eval(scriptText)// app module mount
}
