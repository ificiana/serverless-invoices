import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/store';
import { i18next, initialized } from '@/config/i18n.config';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    redirect: '/invoices',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'),
    beforeEnter: async () => {
      await store.dispatch('teams/init');
    },
    children: [
      {
        path: '/invoices',
        name: 'invoices',
        component: () => import(/* webpackChunkName: "invoices" */ '@/views/dashboard/Invoices.vue'),
      },
      {
        path: '/invoice/:id',
        name: 'invoice',
        component: () => import(/* webpackChunkName: "invoice" */ '@/views/dashboard/Invoice.vue'),
      },
    ],
  },
  {
    path: '/invoices/:id/print',
    name: 'invoice-print',
    component: () => import(/* webpackChunkName: "invoice" */ '@/views/InvoicePrint.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!Object.prototype.hasOwnProperty.call(to.query, 'lang')) {
    await initialized;
    return { ...to, query: { ...to.query, lang: i18next.language } };
  }
});

export default router;
