import Vue from 'vue';
import Router from 'vue-router';
import Maison from './views/Maison.vue';
import Accueil from './views/Accueil.vue';
import Moi from './views/Moi.vue';
import Utilisateur from './views/Utilisateur.vue';
import Membres from './views/Membres.vue';
import Mur from './views/Mur.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mur',
      name: 'mur',
      component: Mur,
      children: [{
        path: 'accueil',
        component: Maison,
        props: true,
      },
      {
        path: '/membre/:id',
        component: Utilisateur,
      },
      {
        path: '/membres',
        component: Membres,
      },
      {
        path: '/moi',
        name: 'moi',
        component: Moi,
      },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Accueil,
    },

  ],
});

// router.map({
//   // ...
//   '/auth/login': { name: 'login', component: LoginView },
//   '/auth/register':  { name: 'register', component: RegisterView },
//  // ...
// });

// <navigation v-if="['login', 'register'].indexOf($route.name) > -1"></navigation>
{ /* <body :class="{ 'auth': $route.path==='/auth/register' || $route.path==='/auth/login' }"> */ }
