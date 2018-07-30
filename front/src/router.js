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
  routes:
  [
    {
      path: '/mur',
      name: 'mur',
      component: Mur,
      children:
      [
        {
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
