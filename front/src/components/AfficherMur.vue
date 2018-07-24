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
              <v-btn
              v-if="ami === 'encours' || ami === ''"
              color="pink"
              dark
              absolute
              center
              right
              fab
              @click="ajouteAmi"
            > 
            <v-icon v-if="ami === 'encours'">hourglass_empty</v-icon>
            <v-icon v-else>person_add</v-icon>
            </v-btn>
            <v-dialog v-else v-model="dialog" persistent max-width="290">
              <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
              <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
                  <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
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
          <ApolloQuery :query='require("../graphql/RecupereMessage.gql")'>
            <template slot-scope='{result: {loading, error, data}}'>
              <div v-if='loading'> Loading...</div>
              <div v-else-if='error'>Une erreur</div>
              <div v-else-if='data'>
                <template v-for='(article, index) of data.tousLesArticles'>
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
  import Article from './Article.vue'
  export default {
    name: 'profil',
    components:{
      Article
    },
    props: {
      dataA: {
        type: Object
      }
    },
    data() {
      return {
        auteur: {
          nom: this.dataA.nom,
          prenom: this.dataA.prenom,
          email: this.dataA.email,
          ville: this.dataA.ville
        },
        ami: '',
        gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
      }
    },
    methods: {
      ajouteAmi() {
      (this.ami === '') ? (this.ami = 'encours') : (this.ami = ''); 
      }

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