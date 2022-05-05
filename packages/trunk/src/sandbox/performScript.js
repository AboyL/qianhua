
export const performScriptForEval = (script, appName) => {
  // library window.appName
  console.log('appName',appName)
  const scriptText = `
    (() => {
      ${script}
      return window['${appName}'] 
    })()
  `
  return eval(scriptText)// app module mount
}
