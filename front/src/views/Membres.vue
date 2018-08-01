<template>

  <v-container fluid grid-list-lg>
    <v-flex xs12>
      <ApolloQuery :query='require("../graphql/TousLesMembres.gql")'>
        <template slot-scope='{result: {loading, error, data}}'>
          <div v-if='loading'> Loading...</div>
          <div v-else-if='error'>Une erreur</div>
          <div v-else-if='data'>
            <v-layout row wrap>
              <template v-for="(membre, index) of data.tousLesAuteurs">
                <v-flex sm4 xl3 :key="'membre'+index">
                  <v-card color="blue-grey darken-2" class="white--text" :to="{path: `/membre/${membre.id}`}">

                    <v-container fluid>
                      <v-card-title primary-title> 

                      <v-avatar :size="40" class="mr-4">
                        <img :src="membre.avatar">
                      </v-avatar>
                        <div>{{membre.prenom}} {{membre.nom}}
                     
                          <span class="grey--text">{{membre.ville}}</span>
                          </div>
                        
                      </v-card-title>
     

                    </v-container>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </div>
          <div v-else>Aucun résultat</div>
      </template>
      </ApolloQuery>
    </v-flex>
  </v-container>

  </template>

  <script>
    export default {

    };
  </script>

  <style>
  </style>