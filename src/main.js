import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import router from './router';


const app = createApp(undefined, undefined);
app.config.productionTip = false;

app.use(Antd);

createApp(App).use(router).mount('#app')
