<template>

      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap >
          <ApolloQuery :query='require("../graphql/TousLesMembres.gql")'>
          <template slot-scope='{result: {loading, error, data}}'>
            <div v-if='loading'> Loading...</div>
            <div v-else-if='error'>Une erreur</div>
            <div v-else-if='data' >
              <template v-for="(membre, index) of data.tousLesAuteurs">
          <v-flex xs12 :key="'membre'+index" >
            <v-card color="blue-grey darken-2" class="white--text" :to="{path: `/membre/${membre.id}`}">
                
                <v-container fluid>
          
               <v-avatar :size="40">
                  <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg">
                </v-avatar>
              <v-card-title primary-title>       {{membre.prenom}}
                    {{membre.nom}}
              </v-card-title>
  
                </v-container>
            </v-card>
          </v-flex>
              </template>
                     </div>
            <div v-else>Aucun résultat</div>
          </template>
        </ApolloQuery>
        </v-layout>
      </v-container>

</template>

<script>
export default {

};
</script>

<style>

</style>
