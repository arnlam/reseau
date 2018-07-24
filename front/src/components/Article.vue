<template>
  <v-card>
    <v-container fluid>
      <v-layout>

        <v-avatar :size="80">
          <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg">
        </v-avatar>


        <v-card-text>
          Publié par
          <strong>{{article.auteur.prenom}}</strong>
          <br/> {{article.creationDate | moment('from') }}
        </v-card-text>

      </v-layout>

      <v-card-text>

        {{ article.texte }}
      </v-card-text>

      <v-card-actions>
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

      <transition-group v-show="show" v-if="article.commentaires.length" name="list" tag="div">
        <v-flex xs12 d-flex v-for="(com, index) of article.commentaires" :key="'com'+index">

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

              <ApolloMutation :mutation='require("../graphql/PosterCommentaire.gql")' :variables='{input:{ texte:texte, articleId:article.id, auteurId:userId } }'
                :key="'textarea'+index" @done="comEnvoye">
                <template slot-scope="{mutate, loading, error}">
                  <v-textarea v-model="texte" color="orange lighten-1" box auto-grow placeholder="mon commentaire" />
                  <p v-if="error">An error occured: {{ error }}</p>
                  <button class="bouton" @click="mutate()">Modifier</button>
                </template>
              </ApolloMutation>

      </transition-group>


      <v-divider></v-divider>

    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    data() {
      return {
        show: false,
        texte: ''
      }
    },
    methods: {
      comEnvoye() {
        this.texte = ''
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