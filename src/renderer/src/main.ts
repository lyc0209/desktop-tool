import { createApp } from "vue"
import App from "./App.vue"
import "virtual:uno.css"
import "@unocss/reset/normalize.css"
import "./assets/css/index.scss"
import router from "@renderer/router"

const app = createApp(App)
app.use(router)

app.mount("#app")
