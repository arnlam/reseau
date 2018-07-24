import Vue from 'vue';
import Router from 'vue-router';
import Maison from './views/Maison.vue';
import Accueil from './views/Accueil.vue';
import Moi from './views/Moi.vue';
import Utilisateur from './views/Utilisateur.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'maison',
      component: Maison,
    },
    {
      path: '/login',
      name: 'login',
      component: Accueil,
    },
    {
      path: '/moi',
      name: 'moi',
      component: Moi,
    },
    {
      path: '/membre/:id', 
      component: Utilisateur
    }
  ],
});

// router.map({
//   // ...
//   '/auth/login': { name: 'login', component: LoginView },
//   '/auth/register':  { name: 'register', component: RegisterView },
//  // ...
// });

// <navigation v-if="['login', 'register'].indexOf($route.name) > -1"></navigation>
{/* <body :class="{ 'auth': $route.path==='/auth/register' || $route.path==='/auth/login' }"> */}