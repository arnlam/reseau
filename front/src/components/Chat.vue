<template>
  <v-flex xs12 sm3 md3 offset-sm2>
    <div class="chatroom">
      <h1>Chat</h1>
          <ApolloQuery :query='require("../graphql/MessagesPrives/RecupereMessagesChat.gql")'
          :variables="{ canalId: chatId }">
      <ApolloSubscribeToMore
        :document='require("../graphql/MessagesPrives/MessageChatAjoute.gql")'
        :updateQuery='surMessageAjoute'
        :variables="{ canalId: chatId}"/>
 
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data'>

          <template v-for='(msg, index) of data.tousLesMessagesChat'>
            <p :key="'msg'+index"><span>{{msg.creationDate | moment('from') }} : </span>{{msg.texte}}</p>
             </template>

        </div>
        <div v-else>Aucun résultat</div>
      </template>
    </ApolloQuery>
      <ApolloMutation 
      :mutation='require("../graphql/MessagesPrives/CreerMessage.gql")' 
      :variables='{ input: { userId: userId, texte: texte }, canalId: chatId }'
      >
        <template slot-scope="{ mutate, loading, error }">
          <v-text-field 
          label="Message" 
          outline
          v-model="texte">
          </v-text-field>
          <v-btn @click="mutate">Envoyer</v-btn>
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
    methods:{
      surMessageAjoute(previousResult, {
        subscriptionData,
      }) {
      const newResult = {
        tousLesMessagesChat: [...previousResult.tousLesMessagesChat],
        }
        // Add the question to the list
        console.log(newResult)
        console.log(subscriptionData.data.messageChatAjoute)
        newResult.tousLesMessagesChat.push(subscriptionData.data.messageChatAjoute)
          console.log(newResult)
        return newResult
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