<template>
   <v-container fluid grid-list-xl >
    <v-layout row>
      <v-flex xs4>
        <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
              <ApolloQuery :query='require("../graphql/TousLesMembres.gql")' :variables="{ id: utilisateurId }"  fetch-policy="cache-and-network">
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data'>

          <v-list-tile
            v-for="(membre,index) in data.tousLesAuteurs"
            :key="`membre${index}`"
            avatar
            @click=""
          >
            <v-list-tile-action>
              <v-icon color="pink">star</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="membre.nom"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <img :src="'https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg'">
            </v-list-tile-avatar>
          </v-list-tile>
          </div>
        <div v-else>Aucun résultat</div>
      </template>
    </ApolloQuery>
        </v-list>
      </v-card>
      </v-flex>
    </v-layout>
   </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
