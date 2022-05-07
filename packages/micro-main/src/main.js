import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { registerMicroApps, start } from '@lixingzhi/trunk'

import { loading } from './store'

registerMicroApps([
  {
    name: 'react16',// 唯一
    entry: '//localhost:9003/',
    container: '#micro-container',
    activeRule: '/react16',
    appInfo:{
      loading
    }
  },
  {
    name: 'reactOther',
    entry: '//localhost:9002/',
    container: '#micro-container',
    activeRule: '/react-other',
  }
], {
  beforeLoad: [
    () => {
      loading.changeLoading(true)
      console.log('开始加载')
    }
  ],
  mounted: [
    () => {
      loading.changeLoading(false)
      console.log('渲染完成')
    }
  ],
  destoryed: [
    () => {
      console.log('卸载完成')
    }
  ]
})

start()

createApp(App).use(router()).mount('#micro_web_main_app')
