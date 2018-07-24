<template>
  <v-app>

    <v-toolbar app :clipped-left="clipped">
      <router-link to="/">
        <v-toolbar-title>CastorBook</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>
       
        <ApolloQuery v-if="userId" :query='require("./graphql/getDemandesEnvoyees.gql")' :variables="{ id: userId }">
          <template slot-scope='{result: {loading, error, data}}'>
            <div v-if='loading'> Loading...</div>
            <div v-else-if='error'>Une erreur</div>
            <div v-else-if='data'>
           <v-menu bottom right>

              <v-btn slot="activator" icon>
                <v-icon>notifications_active</v-icon>
              </v-btn>

              <v-list>
                <v-list-tile v-if="!data.auteur.demandesEnvoyees.length" avatar>
                  <v-list-tile-avatar>
                    <v-icon>not_interested</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>Aucune demande d'ami</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-else v-for="(demande, index) of data.auteur.demandesEnvoyees" 
                :key="'demande'+index">
                  <v-list-tile-avatar>
                    <v-icon>person_pin</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-title>{{demande.personne.prenom}} {{demande.personne.nom}}</v-list-tile-title>
                   <v-list-tile-sub-title>demande de contact</v-list-tile-sub-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            </div>
            <div v-else>Aucun résultat</div>
          </template>
        </ApolloQuery>
         <v-spacer></v-spacer>
      <v-menu v-if="userId" left bottom>
        <v-btn slot="activator" icon>
          <svg id="i-ellipsis-horizontal" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="2">
            <circle cx="7" cy="16" r="2" />
            <circle cx="16" cy="16" r="2" />
            <circle cx="25" cy="16" r="2" />
          </svg>
        </v-btn>

        <v-list>
          <v-list-tile @click="logout()" avatar>
            <v-list-tile-avatar>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>Se déconnecter</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="parametres">
            <v-list-tile-avatar>
              <v-icon>settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>Mes infos</v-list-tile-title>
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
    data() {
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
      logout() {
        localStorage.removeItem('user-id')
        localStorage.removeItem('auth-token')
        this.$root.$data.userId = localStorage.getItem('user-id')
        this.$router.replace('/login');
      },
      parametres() {
        this.$router.replace('/moi')
      }
    },
    computed: {
      userId() {
        return this.$root.$data.userId
      }
    }
  }
</script>