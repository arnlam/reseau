<template>
  <v-app>

    <v-toolbar
      app
      :clipped-left="clipped"
    >
     <router-link to="/" ><v-toolbar-title>CastorBook</v-toolbar-title></router-link>

      <v-spacer></v-spacer>
      <v-menu bottom left v-if="userId">
            <v-btn
              slot="activator"
              icon
            >
               <svg id="i-ellipsis-horizontal" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <circle cx="7" cy="16" r="2" />
                  <circle cx="16" cy="16" r="2" />
                  <circle cx="25" cy="16" r="2" />
                </svg>
            </v-btn>

            <v-list>
              <v-list-tile
                @click="logout()"
              >
                <v-list-tile-title>Se déconnecter</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
      
    </v-toolbar>
    <v-content>

      <router-view/>

    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
    methods: {
      logout () {
        localStorage.removeItem('user-id')
        localStorage.removeItem('auth-token')
        this.$root.$data.userId = localStorage.getItem('user-id')
        this.$router.replace('/login');
      }
    },
    computed: {
      userId () {
        return this.$root.$data.userId
      }
    }
}
</script>
