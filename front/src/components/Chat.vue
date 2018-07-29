<template>
  <v-flex xs12 sm3 md3 offset-sm2>
    <div class="chatroom">
      <h1>Chat</h1>
      <ApolloMutation 
      :mutation='require("../graphql/MessagesPrives/CreerMessage.gql")' 
      :variables='{ input: { id:userId, texte: texte }, canalId: chatId }'
      >
        <template slot-scope="{ mutate, loading, error }">
          <v-text-field 
          label="Message" 
          outline
          v-model="texte">
          </v-text-field>
          <v-button @click="mutate">Envoyer</v-button>
        </template>
      </ApolloMutation>
    </div>
  </v-flex>
</template>

<script>
  export default {
    props: {
      chatId: {
        type: String
      },
    },
    data(){
      return{
        texte: '',
      }
    },
    computed: {
      userId() {
        return this.$root.$data.userId;
      },
    },
  }
</script>

<style>
</style>