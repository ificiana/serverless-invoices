import { createApp } from 'vue';
import Notifications from '@kyvg/vue3-notification';
import '@/config/local-storage.config';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import i18n, { i18next, initialized } from '@/config/i18n.config';
import ui from '@/components/ui';
import { formatCurrency } from '@/filters/currency.filter';
import { formatDate } from '@/filters/date.filter';
import './registerServiceWorker';

const app = createApp(App);

app.config.globalProperties.$currency = formatCurrency;
app.config.globalProperties.$date = formatDate;

app.use(router).use(store).use(i18n).use(Notifications)
  .use(ui)
  .mount('#app');

initialized.then(() => store.dispatch('language/initLanguage', i18next.language));

export default app;
