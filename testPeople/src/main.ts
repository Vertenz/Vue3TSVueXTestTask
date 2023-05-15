import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TheButton from './components/common/UI/TheButton.vue'
import store from './store/store'

const app = createApp(App)

app.use(router)

app.use(store)

app.component('TheButton', TheButton)

app.mount('#app')
