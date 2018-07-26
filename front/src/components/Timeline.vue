<template>
  <div id="timeline">
    <ApolloQuery :query='require("../graphql/RecupereMessage.gql")'>
      <ApolloSubscribeToMore
        :document='require("../graphql/ArticleAjoute.gql")'
        :updateQuery='surArticleAjoute'/>
        <ApolloSubscribeToMore
      :document='require("../graphql/CommentaireAjoute.gql")'
      :updateQuery='surCommentaireAjoute'/>
 
      <template slot-scope='{result: {loading, error, data}}'>
        <div v-if='loading'> Loading...</div>
        <div v-else-if='error'>Une erreur</div>
        <div v-else-if='data'>

          <template v-for='(article, index) of data.tousLesArticles'>
            <Article :key="index" :article="article" :index="index"/>
           

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

  </div>
</template>

<script>
import Article from './Article.vue';
// import ArticleModifie from './ArticleModifie.vue';
// import AfficherCommentaires from './coms/AfficherCommentaires.vue';

export default {
  name: 'Timeline',
  components: {
    Article,
    // AfficherCommentaires,
  },

  data() {
    return {
      texte: '',
      canal: 'general',
      tousLesArticles: [],
      show: false,
    };
  },
  methods: {
    surArticleAjoute(previousResult, {
      subscriptionData,
     }) {
     const newResult = {
      tousLesArticles: [...previousResult.tousLesArticles],
      }
      // Add the question to the list
      console.log(newResult)
      console.log(subscriptionData.data.articleAjoute)
      newResult.tousLesArticles.unshift(subscriptionData.data.articleAjoute)
        console.log(newResult)
      return newResult

    },
    surCommentaireAjoute(previousResult, { subscriptionData }) {
      console.log(subscriptionData)
      const newResult = {
      tousLesArticles: [...previousResult.tousLesArticles],
      }
      console.log(newResult)
      let index = _.findIndex(newResult.tousLesArticles, {id: subscriptionData.data.commentaireAjoute.articleId });
      console.log(index)
      console.log(subscriptionData.data.commentaireAjoute)
      console.log(newResult.tousLesArticles[index].commentaires)
      newResult.tousLesArticles[index].commentaires = subscriptionData.data.commentaireAjoute;
      return newResult
    }
    //   return newResult
    // }
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
  .list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
