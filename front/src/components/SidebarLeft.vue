<template>

    <v-flex xs12 sm4 hidden-md-and-down>
      <v-card>


        <v-list>
              <ApolloQuery :query='require("../graphql/RecupereProfil.gql")' :variables="{ id: userId }">
                <template slot-scope='{result: {loading, error, data}}'>
                  <div v-if='loading'> Loading...</div>
                  <div v-else-if='error'>Une erreur</div>
                  <div v-else-if='data'>
                  <v-avatar
                      :size="80"
                      color="grey lighten-4"
                    >
                    <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg" alt="avatar">

                  </v-avatar>
                  {{data.auteur.prenom}} {{data.auteur.nom}}
                  </div>
                
                    <div v-else>Aucun résultat</div>
                  </template>
              </ApolloQuery>
          <!-- <v-list-group
            v-for="item in items"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group> -->
        </v-list>
      </v-card>
    </v-flex>

  </template>
<script>
  export default {
    name: 'SidebarLeft',
      computed: {
      userId() {
        return this.$root.$data.userId
      }
  },
    data () {
      return {
        items: [
          {
            action: 'local_activity',
            title: 'Attractions',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'restaurant',
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' }
            ]
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' }
            ]
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' }
            ]
          }
        ]
      }
    }
  }
</script>