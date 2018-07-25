<template>
  <v-app>


      <router-view/>


    <v-footer :fixed="fixed" app   dark
    height="auto">
       <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          class="mx-3 white--text"
          icon
        >
           <a href="https://github.com/arnlam"><svg id="i-github" viewBox="0 0 64 64" width="32" height="32">
    <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" />
        </svg></a>
          </v-btn>
      </v-card-text>

       </v-card>

    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('user-id');
      localStorage.removeItem('auth-token');
      this.$root.$data.userId = localStorage.getItem('user-id');
      this.$router.replace('/login');
    },
    parametres() {
      this.$router.replace('/moi');
    },
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
};
</script>
