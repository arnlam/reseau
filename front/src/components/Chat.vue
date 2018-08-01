<template>
  <v-flex xs12 sm3 md3 offset-sm2>
    <div class="chatroom">
          <ApolloQuery :query='require("../graphql/MessagesPrives/RecupereMessagesChat.gql")'
          :variables="{ canalId: chatId }"
          fetch-policy="cache-and-network">
      <ApolloSubscribeToMore
        :document='require("../graphql/MessagesPrives/MessageChatAjoute.gql")'
        :updateQuery='surMessageAjoute'
        :variables="{ canalId: chatId}"/>
 
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data' id="chat" class="white elevation-2">

          <template v-for='(msg, index) of data.tousLesMessagesChat'>
            <v-flex xs12 :key="'msg'+index"  :class="{'text-xs-right': msg.userId === userId}">
          <v-chip >
            <v-avatar>
              <img :src="msg.auteur.avatar" >
            </v-avatar>
            {{msg.auteur.prenom}} {{msg.auteur.nom}}
          </v-chip>
            <p><span class="grey--text">{{msg.creationDate | moment('from') }} </span><br />{{msg.texte}}</p>
          </v-flex>
             </template>
        </div>
        <div v-else>Aucun résultat</div>
      </template>
    </ApolloQuery>
      <ApolloMutation 
      :mutation='require("../graphql/MessagesPrives/CreerMessage.gql")' 
      :variables='{ input: { userId: userId, texte: texte }, canalId: chatId }'
      @done="messageEnvoye"
      >
        <template slot-scope="{ mutate, loading, error }" >
          <v-text-field 
          @keyup.native.enter="mutate()"
          label="Message" 
          outline
          v-model="texte">
          </v-text-field>
          <v-btn @click="mutate" >Envoyer</v-btn>
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
      },
      messageEnvoye(){
        this.texte = '';
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
#chat{
  border-radius: 2px;
  max-height: 60vh;
  overflow: auto
}
</style>