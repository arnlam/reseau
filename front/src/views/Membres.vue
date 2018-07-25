<template>
          <ApolloQuery :query='require("../graphql/TousLesMembres.gql")'>
          <template slot-scope='{result: {loading, error, data}}'>
            <div v-if='loading'> Loading...</div>
            <div v-else-if='error'>Une erreur</div>
            <div v-else-if='data' >
              <template v-for="(membre, index) of data.tousLesAuteurs">
            <v-container :key="'membre'+index">
              <v-layout>
                <v-flex xs6>
                  <v-card >
                    {{membre.prenom}}
                    {{membre.nom}}
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
              </template>
                     </div>
            <div v-else>Aucun résultat</div>
          </template>
        </ApolloQuery>
</template>

<script>
export default {

};
</script>

<style>

</style>
