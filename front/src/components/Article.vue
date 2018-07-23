<template>
  <div id="article">
    <!-- <v-card>
        <v-toolbar color="orange lighten-1" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Message Board</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
         <v-list dense three-line > -->
    <ApolloQuery :query='require("../graphql/RecupereMessage.gql")'>
      <!-- <ApolloSubscribeToMore
        :document='require("../graphql/ArticleAjoute.gql")'
        :updateQuery='surArticleAjoute'
        /> -->
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data'>
          <template v-for='(article, index) of data.tousLesArticles.slice().reverse()'>
            <!-- <v-subheader
             :key="index">
              Aujourd'hui
            </v-subheader> -->
            <v-card :key="index">
              <v-container fluid>
                <v-layout>

                  <v-avatar :size="80">
                    <img src="https://pbs.twimg.com/profile_images/546546706004082688/TvhLk_H2_400x400.jpeg">
                  </v-avatar>


                  <v-card-text>
                    Publié par
                    <strong>{{article.auteur.prenom}}</strong>
                  </v-card-text>

                </v-layout>

                <v-card-text>

                  {{ article.texte }}
                </v-card-text>

                <v-card-actions>
                  <v-layout justify-space-around>
                  <v-btn flat
                  @click="show = !show">
                    <v-icon class="mr-2">chat</v-icon>
                    <span> {{article.commentaires.length}}
                      </span>

                  </v-btn>
                  <v-btn flat
                  @click="show = !show">
                    <v-icon class="mr-2">child_care</v-icon>
                    </v-btn>
                    </v-layout> 
                </v-card-actions>
                <transition-group name="slide-x-transition" v-if="article.commentaires.length">
                 <v-flex d-flex>
                  <v-layout v-for="(com, index) of article.commentaires" :key="'com'+index">
                    <v-card>

                    <v-flex xs12 offset-sm1>
                  <v-card-text v-show="show" >
                    <span class="grey--text">Publié par</span><br/>
                    {{ com.texte}}
                  </v-card-text>

                    </v-flex>
                    </v-card>
                  </v-layout>
                  </v-flex>
               </transition-group>


                <v-divider></v-divider>

              </v-container>
            </v-card>
            <!-- <v-list-tile >
           <v-list-tile-content>
                <v-list-tile-sub-title class="text--primary">{{ article.texte }}</v-list-tile-sub-title>
              </v-list-tile-content>
               <v-list-tile-action>
                <v-list-tile-action-text>15mn</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>
              </v-list-tile-action> -->

            <!-- </v-list-tile>
           <v-divider            
              inset
              :key="index"
            ></v-divider>
  
               <v-list-tile-sub-title  :key="index" >
            <v-icon>add_comment</v-icon> Ajouter un commentaire

               </v-list-tile-sub-title>

 
               <v-divider            
              inset
              :key="index"
            ></v-divider> -->


            <!-- <ArticleModifie
            :variables='{id: article.id, texte: article.texte}'
            /> -->
            <!-- <ApolloSubscribeToMore
          :document='require("../graphql/CommentaireAjoute.gql")'
          :updateQuery='surCommentaireAjoute'
          :variables='{ canal }' /> -->
            <!-- <AfficherCommentaires
            :commentaires="article.commentaires"
            :articleId="article.id"/> -->

          </template>
        </div>
        <div v-else>Aucun résultat</div>
        <button class="bouton">Voir plus</button>
      </template>
    </ApolloQuery>
    </v-list>
    </v-card>
  </div>
</template>

<script>
  import ArticleModifie from './ArticleModifie.vue';
  // import AfficherCommentaires from './coms/AfficherCommentaires.vue';

  export default {
    components: {
      ArticleModifie,
      // AfficherCommentaires,
    },

    data() {
      return {
        texte: '',
        canal: 'general',
        tousLesArticles: [],
        show: false
      };
    },
    methods: {
      surArticleAjoute(previousResult, {
        subscriptionData
      }) {
        const nouvelArticle = subscriptionData.tousLesArticles.articleAjoute;
        nouvelArticle.commentaires = [];
        return {
          tousLesArticles: [
            ...previousResult.tousLesArticles,
            subscriptionData.tousLesArticles.articleAjoute,
          ],
        };
      },
      // surCommentaireAjoute(previousResult, { subscriptionData }) {
      //   const articleCommente = previousResult.tousLesArticles.filter()
      //   return {
      //     tousLesArticles: [
      //       ...previousResult.tousLesArticles,
      //       subscriptionData.data.articleAjoute,
      //     ],
      //   };
      // },
    },
  };
</script>


<style scoped>
  .article {
    background: #ffff00;
    position: relative;
    width: 300px;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 6px 6px 0 0 grey;
    --borderWidth: 6px;
    border-radius: var(--borderWidth);
  }

  .article:hover {
    box-shadow: unset;
  }

  .article:hover:after {
    content: '';

    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient( 60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82);
    border-radius: var(--borderWidth);
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }

  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  input {
    border-radius: 5px;
  }
</style>