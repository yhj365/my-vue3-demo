import {
  createApp
} from 'vue'
import App from './App.vue'
import Card from './components/Card/index.vue'
import Tree from './components/Tree/index.vue'

const app = createApp(App)

app.component('Card', Card)
app.component('Tree', Tree)

app.mount('#app')