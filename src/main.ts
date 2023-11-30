import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//引入路由设置
import router from './router'

//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import 'virtual:svg-icons-register'

//引入自定义svg组件
import svgIcon from './components/svgIcon/index.vue'
//引入ElementPlus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus).use(router).component('svg-icon', svgIcon).mount('#app')
