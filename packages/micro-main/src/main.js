import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { registerMicroApps, start } from '@lixingzhi/trunk'

registerMicroApps([
  {
    name: 'react16',// 唯一
    entry: '//localhost:9002/',
    container: '#micro-container',
    activeRule: '/react16',
  },
  {
    name: 'vue3',
    entry: '//localhost:9003/',
    container: '#micro-container',
    activeRule: '/vue3',
  }
])
start()

createApp(App).use(router()).mount('#micro_web_main_app')
