import './css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Btn from './components/btn/btn.vue'
import Input from './components/input/input.vue'
import Select from './components/select/select.vue'
import Calendar from './components/calendar/calendar.vue'
import Icon from './components/icon/Icon.vue'
import ContentLayout from './layouts/ContentLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import QrCode from './components/qr/QRCode.vue'
import Params from './components/params/Params.vue'
import Modal from './components/modal/Modal.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('EBtn', Btn)
app.component('EInput', Input)
app.component('ESelect', Select)
app.component('ECalendar', Calendar)
app.component('EIcon', Icon)
app.component('EContentLayout', ContentLayout)
app.component('EMainLayout', MainLayout)
app.component('EQrCode', QrCode)
app.component('EParams', Params)
app.component('EModal', Modal)
app.mount('#app')
