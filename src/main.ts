import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import BRow from '@/BRow.vue'
import BCol from '@/BCol.vue'

const app = createApp(App)

// components
app.component('b-row', BRow)
app.component('b-col', BCol)

app.mount('#app')
