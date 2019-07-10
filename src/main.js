import Vue from 'vue'
import VueRouter from 'vue-router'

import MainLayout from './MainLayout'
import ContractsPage from './ContactsPage'
import TransactionPage from './TransactionPage'
import TransactionsPage from './TransactionsPage'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import icons from './icons';

Vue.component('font-awesome-icon', icons)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: { TransactionsPage } },
  { path: '/transactions', component: { TransactionsPage } },
  { path: '/contacts', component: { ContractsPage } },
  { path: '/transactions/:id', component: { TransactionPage } }
];

routes.forEach(r => r.component = ({
  template: `<MainLayout><${ Object.keys(r.component)[0] }/></MainLayout>`,
  components: { ...r.component, MainLayout }
}));

new Vue({
  el: '#vue-transactions',
  router: new VueRouter({ routes }),
  render: h => h({ template: `<router-view/>` })
})