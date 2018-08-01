<template>
  <v-list-tile avatar>
  <v-list-tile-action class="album-verwerkt" @click="profilAmi(ami.id)">
    <v-icon class="pink--text">person</v-icon>
  </v-list-tile-action>
  <v-list-tile-content>
    <v-list-tile-title>{{ami.personne.prenom}} {{ami.personne.nom}}</v-list-tile-title>

  </v-list-tile-content>

  <v-list-tile-action>
    <v-btn v-if="isChat(ami.id)" icon @click="ouvreChat()">
      <v-icon class="grey--text text--lighten-1">chat_bubble</v-icon>
    </v-btn>

    <ApolloMutation v-else :mutation='require("../graphql/DemandeChat.gql")' :variables='{id:userId, utilisateurId: ami.id}'
      @done="ouvreChatCree">
      <template slot-scope="{ mutate, loading, error }">
        <v-btn icon @click="mutate()">
          <v-icon class="grey--text text--lighten-1">chat_bubble</v-icon>
        </v-btn>
      </template>
    </ApolloMutation>
  </v-list-tile-action>
              </v-list-tile>
</template>

<script>
export default {
  name: 'TileChat',
  props: {
    ami: { type: Object},
    index: { type: Number},
    chat: { type: Array }
  },
  data(){
    return{
      openChat: ''
    }
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
  methods: {
    voirProfil() {
      this.$router.replace(`/membre/${this.userId}`);
    },
    profilAmi(idAmi) {
     this.$router.replace(`/membre/${idAmi}`);
    },
    isChat(idAmi){
      if (this.chat){
        console.log(this.chat)
        if(_.find(this.chat, {id: idAmi})){
          let canal = _.find(this.chat, {id: idAmi})
          console.log('canal'+canal.canalId)
           this.openChat = canal.canalId
          return canal.canalId
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    ouvreChat() {
      console.log('1'+ this.openChat)
    this.$root.$emit('chat', this.openChat)

    },
    ouvreChatCree(result) {
    this.openChat = result.data.demandeChat.canalId;
    console.log('5'+this.openChat)
    this.$root.$emit('chat', this.openChat)
    },
  },
}
</script>
