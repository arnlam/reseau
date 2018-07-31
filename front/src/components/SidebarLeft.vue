<template>

 <v-navigation-drawer
    fixed
    app
    value="true"
  >

              <v-list>
                <v-list-tile @click="voirProfil()">


                <v-list-tile-avatar>
                  <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg" />
                </v-list-tile-avatar>
                  <v-list-tile-content>
                  <v-list-tile-title>
                  {{auteur.prenom}} {{auteur.nom}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>{{auteur.ville}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                </v-list-tile>
</v-list>
 <v-divider></v-divider>

 <v-list> 
   <!-- <v-list-group> -->
                  <v-list-tile >
                    <v-list-tile-content>
                      <v-list-tile-title>Ami</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
            <v-list-tile avatar v-for="(ami, index) in auteur.amis" :key="'ami'+index" @click="">
              <v-list-tile-action class="album-verwerkt" @click="profilAmi(ami.id)">
                <v-icon class="pink--text">person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ami.personne.prenom}} {{ami.personne.nom}}</v-list-tile-title>
       
              </v-list-tile-content>
     
              <v-list-tile-action>
                <v-btn v-if="isChat(ami.id)" icon @click="ouvreChat(chat)">
                  <v-icon class="grey--text text--lighten-1">chat_bubble</v-icon>
                </v-btn>
      
                 <ApolloMutation 
                  v-else
                  :mutation='require("../graphql/DemandeChat.gql")'
                  :variables='{id:userId, utilisateurId: ami.id}'
                  @done="ouvreChatCree"
  
                  >
                  <template slot-scope="{ mutate, loading, error }">
                  <v-btn icon @click="mutate()">
                    <v-icon class="grey--text text--lighten-1">chat_bubble</v-icon>
                 </v-btn>
                  </template>
                  </ApolloMutation>
              </v-list-tile-action>
            </v-list-tile>
   <!-- </v-list-group> -->
          </v-list>
          



                  <!--
                <v-list-group>
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title>Ami</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile v-for="(ami, index) in auteur.amis" :key="'ami'+index" @click="">
                    <v-list-tile-content>
                      <v-list-tile-title @click="ouvreChat()">  {{ami.personne.prenom}} {{ami.personne.nom}}</v-list-tile-title> -->
                      <!-- <router-link :to="{ path:`/membre/${ami.id}` }"></router-link></v-list-tile-title> -->
                    <!-- </v-list-tile-content>

                    <v-list-tile-action>

                      <v-icon>person</v-icon>
                    </v-list-tile-action>
                    
                     <v-list-tile-action>
                                          <v-icon>chat_bubble_outside</v-icon>
                    </v-list-tile-action>

                  </v-list-tile>
                </v-list-group>
              </v-list> -->

            <!-- </div>
            <div v-else>Aucun résultat</div>
          </template>
        </ApolloQuery> -->
 </v-navigation-drawer>

</template>
<script>
export default {
  name: 'SidebarLeft',
  props: {
    auteur: { type: Object },
  },
  data(){
    return {
      chat: false, 
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
      if (this.auteur.chat){
        if(_.find(this.auteur.chat, {id: idAmi})){
          let canal = _.find(this.auteur.chat, {id: idAmi})
          console.log(canal.canalId)
          return this.chat = canal.canalId
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    ouvreChat(canalId) {
      console.log('1')
    this.$root.$emit('chat', canalId)

    },
    ouvreChatCree(result) {
    this.chat = result.data.demandeChat.canalId;
    this.$root.$emit('chat', this.chat)
    },
  },
    computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
};
</script>
