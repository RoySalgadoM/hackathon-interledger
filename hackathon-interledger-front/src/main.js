import './css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Btn from './components/btn/btn.vue'
import Input from './components/input/input.vue'
import Select from './components/select/select.vue'
import Calendar from './components/calendar/calendar.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('EBtn', Btn)
app.component('EInput', Input)
app.component('ESelect', Select)
app.component('ECalendar', Calendar)

app.mount('#app')
