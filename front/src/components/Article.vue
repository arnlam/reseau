<template>
  <v-card class="pb-2 mb-2">
    <v-container fluid>
      <v-layout>

        <v-avatar :size="80">
          <img :src="article.auteur.avatar">
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
          
        <ApolloMutation :mutation='require("../graphql/Like.gql")' :variables='{ id:userId, articleId: article.id }'
          :key="'like'+index" @done="liking">
          <template slot-scope="{mutate, loading, error}">
            <v-btn  flat @click="mutate()">
            <v-icon :class="{ 'teal--text': isActive || isPresent }" class="mr-2">sentiment_very_satisfied</v-icon>
            <span> {{likes}}
              </span>
          </v-btn>
          </template>
        </ApolloMutation>
        </v-layout>
      </v-card-actions>

      <!-- <transition-group v-show="show" name="list" tag="div"> -->
        <v-flex xs12 d-flex v-if="article.commentaires.length && show" v-for="(com, index) of article.commentaires" :key="'com'+index">

          <v-card>
            <v-container fluid>
              <v-layout>
                <v-avatar :size="40">
                  <img :src="com.auteurCom.avatar">
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
        likes: this.article.like.length,
        show: false,
        texte: '',
        isActive: false
      };
    },
    methods: {
      comEnvoye() {
        this.texte = '';
      },
      liking(data) {
        if(!data.like){
          return;
        }
        this.likes++;
        this.isActive = true;
      }

    },
    computed: {
      userId() {
        return this.$root.$data.userId;
      },
      isPresent(){
        if (this.article.like){
        if(_.find(this.article.like, {id: this.userId})){
          return true
        } else {
          return false;
        }
      } else {
        return false;
      }
      }
    },
  };
</script>
<style>
.active{
  color: #00E676;
}
</style>