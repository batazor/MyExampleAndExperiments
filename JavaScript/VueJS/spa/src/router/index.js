import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello';
import About from '../components/About';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Hello,
  },
  {
    path: '/about',
    component: About,
  },
];

export default new Router({
  routes,
  mode: 'history',
});
