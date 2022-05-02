import { performScriptForEval } from "../sandbox"
import { fetchResource } from "../utils/fetchResource"

export const loadHtml = async (app) => {
  const { entry, container } = app
  const [dom, scripts] = await parseHtml(entry)
  const ct = document.querySelector(container)
  ct.innerHTML = dom
  // 执行所有的 js 内容
  scripts.forEach(script => {
    performScriptForEval(script)
  })

  return app
}

export const parseHtml = async (entry) => {
  const html = await fetchResource(entry)

  const div = document.createElement('div')
  div.innerHTML = html

  const { dom, scriptUrl, script } = await getResources(div, entry)

  let scripts = [].concat(script)
  // 根据 scriptUrl 获取到所有的 script 代码并且执行
  const outScripts = await Promise.all(
    scriptUrl.map(async (sc) => await fetchResource(sc))
  )
  scripts = scripts.concat(outScripts)

  return [dom, scripts]
}

export const getResources = async (root, entry) => {
  const scriptUrl = [] // js 链接  src  href
  const script = [] // 写在script中的js脚本内容
  const dom = root.outerHTML

  // 注意保持代码的执行顺序!
  // 这里其实还需要考虑一下 懒加载之类的内容 但是先不考虑了
  function deepParse (element) {
    if (!element) {
      return
    }
    const { children = [], parent } = element

    if (element.nodeName.toLowerCase() === 'script') {
      let src = element.getAttribute('src')

      if (src) {
        // 此时是一个远程的资源 需要加载到远程资源里面去
        if (src.startsWith('http')) {
          scriptUrl.push(src)
        } else {
          // 此时是相对路径 需要获取到 对应的值
          // 这里应该对各种情况进行一些处理
          scriptUrl.push(`http:${entry}/${src}`)
        }
      } else {
        script.push(element.innerHTML)
      }

      if (parent) {
        parent.replaceChild(document.createComment('此 js 文件已经被微前端替换'), element)
      }
    }

    // 处理 link 
    if (element.nodeName.toLowerCase() === 'link') {
      let href = element.getAttribute('href')

      if (href) {
        // 此时是一个远程的资源 需要加载到远程资源里面去
        if (href.endsWith('.js')) {
          if (href.startsWith('http')) {
            scriptUrl.push(href)
          } else {
            scriptUrl.push(`http:${entry}/${href}`)
          }
        }
      }
    }

    // 递归处理
    for (let c of children) {
      deepParse(c)
    }
  }

  deepParse(root)

  return {
    dom,
    scriptUrl,
    script
  }
}