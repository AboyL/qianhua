// 快照沙箱
// 应用场景：比较老版本的浏览器，
export class SnapShotSandbox {
  constructor() {
    // 1. 代理对象
    this.proxy = window
    this.active()
  }
  // 沙箱激活
  active () {
    // 
    this.snapshot = new Map()
    for (let k in window) {
      this.snapshot[k] = window[k]
    }
  }
  // 沙箱销毁
  inactive () {
    // 假如不在 snapshot 上 就销毁
    for (let k in window) {
      if (window[k] !== this.snapshot[k]) {
        window[k] = this.snapshot[k]
      }
    }
  }
}
