import { fetchResource } from "../utils/fetchResource"

export const loadHtml = async (app) => {
  const { entry, container } = app
  const html = await parseHtml(entry)
  const ct = document.querySelector(container)
  ct.innerHTML = html

  return app
}

export const parseHtml = async (entry) => {
  const html = await fetchResource(entry)
  return html
}