import { lifecycle } from "../lifeCycle"
import { isTurnChild } from "../utils"

export const turnApp = async () => {
  if (!isTurnChild()) {
    return
  }
  await lifecycle()
  console.log('路由切换了')
}
