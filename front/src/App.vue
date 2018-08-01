<template>
  <v-app>


      <router-view/>
 
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
