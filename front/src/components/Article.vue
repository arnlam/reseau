<template>
  <v-card class="pb-2 mb-2">
    <v-container fluid>
      <v-layout>

        <v-avatar :size="80">
          <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg">
        </v-avatar>


        <v-card-text>

          Publié par
          <router-link :to="'/membre/' + article.auteur.id">
            <strong>{{article.auteur.prenom}}</strong>
          </router-link>
          <br/> {{article.creationDate | moment('from') }}
        </v-card-text>

      </v-layout>
 
      <v-layout>
        <v-flex xs12>
          <v-card>
       <v-card-media v-if="article.uri" height="200px" :src="article.uri"></v-card-media>

          </v-card>
        </v-flex>
      </v-layout>
      <v-card-text>

        {{ article.texte }}
      </v-card-text>


      
       <!-- <v-speed-dial :transition="'scale-transition'" :direction="'bottom'" :right="true" :top="true">
        <v-btn slot="activator" color="blue darken-2" dark fab>
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn fab dark small color="green">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-speed-dial>  -->
      <!-- <v-btn color="orange" fab dark small absolute top right>
        <v-icon>add</v-icon>
      </v-btn> -->
      <v-card-actions class="mb-2">
        <v-layout justify-space-around>
          <v-btn flat @click="show = !show">
            <v-icon class="mr-2">chat</v-icon>
            <span> {{article.commentaires.length}}
            </span>

          </v-btn>
          <v-btn flat @click="show = !show">
            <v-icon class="mr-2">child_care</v-icon>
          </v-btn>
        </v-layout>
      </v-card-actions>

      <!-- <transition-group v-show="show" name="list" tag="div"> -->
        <v-flex xs12 d-flex v-if="article.commentaires.length && show" v-for="(com, index) of article.commentaires" :key="'com'+index">

          <v-card>
            <v-container fluid>
              <v-layout>
                <v-avatar :size="40">
                  <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg">
                </v-avatar>

                <v-card-text>
                  <span class="grey--text"> {{com.auteurCom.prenom}} {{com.auteurCom.nom}} {{com.creationDate | moment('from')}}</span>
                  <br/> {{ com.texte}}
                </v-card-text>

              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <ApolloMutation v-if="show" :mutation='require("../graphql/PosterCommentaire.gql")' :variables='{input:{ texte:texte, articleId:article.id, auteurId:userId } }'
          :key="'textarea'+index" @done="comEnvoye">
          <template slot-scope="{mutate, loading, error}">
            <v-textarea v-model="texte" color="orange lighten-1" box auto-grow placeholder="mon commentaire" />
            <p v-if="error">An error occured: {{ error }}</p>
            <v-btn :disabled="loading || !texte" outline @click="mutate()">Envoyer</v-btn>
          </template>
        </ApolloMutation>

      <!-- </transition-group> -->


    </v-container>
    
  </v-card>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    data() {
      return {
        show: false,
        texte: '',
      };
    },
    methods: {
      comEnvoye() {
        this.texte = '';
      },
    },
    computed: {
      userId() {
        return this.$root.$data.userId;
      },
    },
  };
</script>

<style>
</style>