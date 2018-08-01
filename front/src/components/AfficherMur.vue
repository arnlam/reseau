<template>

  <div id="profil">
    <v-jumbotron :gradient="gradient" dark src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <v-avatar :size="140">
              <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg">
            </v-avatar>
            <h3 class="display-3">{{auteur.prenom}} {{auteur.nom}}</h3>
            <v-icon>location_city</v-icon>
            <p>{{auteur.ville}}</p>

            <v-tooltip left v-if="demandeAmi === 'encours'">
              <v-btn slot="activator" color="pink" dark fab>
                <v-icon>hourglass_empty</v-icon>
              </v-btn>
              <span>Demande en cours</span>
            </v-tooltip>

            <ApolloMutation v-else-if="demandeAmi === '' && userId !== dataA.id" 
            :mutation='require("../graphql/demandeAmi.gql")'
            :variables='{id:userId, utilisateurId: dataA.id}'
            @done="amitieDemandee">
            <template slot-scope="{ mutate, loading, error }">
            <v-tooltip left >
              <v-btn @click="mutate()"
              slot="activator" color="pink" dark fab>
                <v-icon>person_add</v-icon>
              </v-btn>
              <span>Tooltip</span>
            </v-tooltip>
            </template>
            </ApolloMutation>

            <v-dialog v-if="demandeAmi==='ami'" v-model="dialog" persistent max-width="290">
              <v-btn slot="activator" color="primary" dark fab><v-icon>person</v-icon></v-btn>
              <v-card>
                <v-card-title class="headline">Vraiment ?</v-card-title>
                <v-card-text>Ne plus être ami ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click.native="dialog = false">Non</v-btn>
                  <v-btn color="green darken-1" flat @click.native="dialog = false">Oui</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm6>
          <ApolloQuery :query='require("../graphql/articleUnUtilisateur.gql")' :variables='{userId: dataA.id}'>
            <template slot-scope='{result: {loading, error, data}}'>
              <div v-if='loading'> Loading...</div>
              <div v-else-if='error'>Une erreur</div>
              <div v-else-if='data'>
                <template v-for='(article, index) of data.articleUnUtilisateur'>
                  <Article :key="index" :article="article" :index="index" />
                </template>
              </div>
              <div v-else>Aucun résultat</div>
              <button class="bouton">Voir plus</button>
            </template>
          </ApolloQuery>
        </v-flex>
      </v-layout>
    </v-container>


  </div>


</template>

<script>
import Article from './Article.vue';

export default {
  name: 'fil',
  components: {
    Article,
  },
  props: {
    dataA: {
      type: Object,
    },
  },
  data() {
    return {
      auteur: {
        nom: this.dataA.nom,
        prenom: this.dataA.prenom,
        email: this.dataA.email,
        ville: this.dataA.ville,
        amis: this.dataA.amis,
        demandesEnAttente: this.dataA.demandesEnAttente,
        demandesEnvoyees: this.dataA.demandesEnvoyees,
      },
      ami: '',
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
    };
  },
  methods: {
    amitieDemandee() {},
  },
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
    demandeAmi() {
      if (_.find(this.auteur.demandesEnAttente, {
        id: this.userId,
      })) {
        return 'encours';
      } else if (_.find(this.auteur.demandesEnvoyees, {
        id: this.userId,
      })) {
        return 'encours';
      } else if (_.find(this.auteur.amis, {
        id: this.userId
      })) {
        return 'ami'
      }

      return '';
    },
  },
};
</script>

<style>
</style>
