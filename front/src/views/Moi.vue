<template>
  <div id="moi">
    <ApolloQuery :query='require("../graphql/RecupereProfil.gql")' :variables="{ id: userId }">
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data'>
          <AfficherProfil :dataA="data.auteur"/>
        </div>
        <div v-else>Aucun résultat</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
  import AfficherProfil from '@/components/AfficherProfil';
  export default {
    name: 'moi',
    components: {
      AfficherProfil
    },
    computed: {
      userId() {
        return this.$root.$data.userId
      }
    }

  }
</script>

<style>
</style>