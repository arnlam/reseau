<template>

 <v-navigation-drawer
    fixed
    app
    value="true"
  >

              <v-list>
                <v-list-tile @click="voirProfil()">


                <v-list-tile-avatar>
                  <img :src="auteur.avatar" />
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
                      <v-list-tile-title>Tous les membres</v-list-tile-title>
                    </v-list-tile-content>
                     <v-list-tile-action>
                <v-btn icon :to="{path: '/membres'}">
                  <v-icon class="grey--text text--lighten-1">keyboard_arrow_right</v-icon>
                </v-btn>
                     </v-list-tile-action>
                  </v-list-tile>
                  <v-list-tile >
                    <v-list-tile-content>
                      <v-list-tile-title>Contacts</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
          
              <!-- CHAT  -->
            <template v-for="(ami, index) in auteur.amis">
              <TileChat :chat="auteur.chat" :ami="ami" :index="index"  :key="'ami'+index"/>
            </template>

 
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
import TileChat from '@/components/TileChat.vue';

export default {
  name: 'SidebarLeft',
  components: {
    TileChat
  },
  props: {
    auteur: { type: Object },
  },
  data(){
    return {
    }
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
  },
};
</script>
