<template>
  <div id="utilisateur">
    <ApolloQuery :query='require("../graphql/RecupereProfil.gql")' :variables="{ id: utilisateurId }"  fetch-policy="cache-and-network">
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data'>
          <AfficherMur :dataA="data.auteur"/>
        </div>
        <div v-else>Aucun résultat</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import AfficherMur from '@/components/AfficherMur';

export default {
  name: 'moi',
  components: {
    AfficherMur,
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
    utilisateurId() {
      return this.$route.params.id;
    },
  },

};
</script>

<style>

</style>
